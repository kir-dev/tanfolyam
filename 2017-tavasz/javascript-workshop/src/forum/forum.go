package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/pat"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"strconv"
	"sync"
	"time"
)

type Topic struct {
	Id           int       `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	LastPostDate time.Time `json:"last_post_date"`
	posts        []*Post
}

type Post struct {
	Id        int       `json:"id"`
	Timestamp time.Time `json:"timestamp"`
	Author    string    `json:"author"`
	Content   string    `json:"content"`
	ReplyTo   int       `json:"reply_to"`
}

type ErrorMessage struct {
	Message    string `json:"message"`
	StatusCode int    `json:"status_code"`
}

const (
	PageSize = 20
)

var (
	topicId      = 0
	topicIdMutex = &sync.Mutex{}
	postId       = 0
	postIdMutex  = &sync.Mutex{}
	topics       []*Topic
)

func main() {
	// init
	topics = make([]*Topic, 0)
	initTestData()

	// api routes
	r := pat.New()
	r.Get("/topics/{topicId}/posts/{id}", handleGetPost)
	r.Get("/topics/{id}", handleGetTopic)
	r.Get("/topics", handleListTopics)
	r.Post("/topics/{id}/posts/new", handleNewPost)
	r.Post("/topics/new", handleNewTopic)

	// serve files from directory
	http.Handle("/", http.FileServer(http.Dir(".")))
	// serve api from /api path
	http.Handle("/api/", http.StripPrefix("/api", r))

	log.Println("Started forum. Listening on localhost:8089...")
	log.Fatal(http.ListenAndServe(":8089", nil))
}

func initTestData() {

	topic := Topic{Title: "Teszt téma", Description: "Ide lehet posztolni akármit"}
	topic.Id = getNextTopicId()
	topic.posts = make([]*Post, 0)
	topics = append(topics, &topic)

	post := Post{Author: "Geri", Content: "Teszt poszt, működik a blog :)"}
	post.Timestamp = time.Now()
	post.Id = getNextPostId()
	topic.posts = append(topic.posts, &post)

	post2 := Post{Author: "Pék Sanyi", Content: "Nagyon király, csak így tovább! Jól haladtok de van még hátra egy pár feladat!", ReplyTo: post.Id}
	post2.Timestamp = time.Now()
	post2.Id = getNextPostId()
	topic.posts = append(topic.posts, &post2)
	topic.LastPostDate = post2.Timestamp

	topic2 := Topic{Title: "Javascript téma", Description: "Minden ami javascript"}
	topic2.Id = getNextTopicId()
	topic2.posts = make([]*Post, 0)
	topics = append(topics, &topic2)

	post3 := Post{Author: "Robert Nyman", Content: testScopePost()}
	post3.Timestamp = time.Now()
	post3.Id = getNextPostId()
	topic2.posts = append(topic2.posts, &post3)
	topic2.LastPostDate = post3.Timestamp
}

func handleGetPost(w http.ResponseWriter, req *http.Request) {
	topicId, ok := getIdFromUrl("topicId", w, req)
	if !ok {
		return
	}

	postId, ok := getIdFromUrl("id", w, req)
	if !ok {
		return
	}

	topic := findTopic(topicId)
	if topic == nil {
		sendError(w, ErrorMessage{"Topic not found", http.StatusNotFound})
		return
	}

	for _, post := range topic.posts {
		if post.Id == postId {
			payload := map[string]interface{}{
				"status_code": http.StatusOK,
				"post":        post,
			}
			sendPayload(w, payload)
			return
		}
	}

	sendError(w, ErrorMessage{"Post not found", http.StatusNotFound})
}

func handleListTopics(w http.ResponseWriter, req *http.Request) {
	from, to := paginate(req, len(topics))
	payload := map[string]interface{}{
		"topics":      topics[from:to],
		"status_code": http.StatusOK,
	}
	sendPayload(w, payload)
}

func handleGetTopic(w http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(req.URL.Query().Get(":id"))
	if err != nil {
		sendError(w, ErrorMessage{"Invalid topic id", http.StatusBadRequest})
		return
	}

	if topic := findTopic(id); topic != nil {
		from, to := paginate(req, len(topic.posts))

		payload := map[string]interface{}{
			"topic":       topic,
			"posts":       topic.posts[from:to],
			"status_code": http.StatusOK,
		}
		sendPayload(w, payload)
	} else {
		sendError(w, ErrorMessage{"Topic not found", http.StatusNotFound})
	}
}

func handleNewTopic(w http.ResponseWriter, req *http.Request) {
	topic := Topic{}
	if !unmarshalBody(w, req, &topic) {
		return
	}

	topic.Id = getNextTopicId()
	topic.posts = make([]*Post, 0)
	topics = append(topics, &topic)

	log.Printf("Created topic with title: '%s'", topic.Title)
	sendError(w, ErrorMessage{"Topic created", http.StatusCreated})
}

func handleNewPost(w http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(req.URL.Query().Get(":id"))
	if err != nil {
		sendError(w, ErrorMessage{"Invalid topic id", http.StatusBadRequest})
		return
	}

	topic := findTopic(id)
	if topic == nil {
		sendError(w, ErrorMessage{"Topic not found", http.StatusNotFound})
		return
	}

	post := Post{}
	if !unmarshalBody(w, req, &post) {
		return
	}

	post.Timestamp = time.Now()
	post.Id = getNextPostId()

	topic.posts = append(topic.posts, &post)
	topic.LastPostDate = post.Timestamp
	log.Printf("Added post to topic (id: %d)", id)

	sendError(w, ErrorMessage{"Post created", http.StatusCreated})
}

func unmarshalBody(w http.ResponseWriter, req *http.Request, entity interface{}) bool {
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		sendError(w, ErrorMessage{"Request body cannot be read.", http.StatusInternalServerError})
		return false
	}

	err = json.Unmarshal(data, entity)
	if err != nil {
		sendError(w, ErrorMessage{"Wrong format.", http.StatusBadRequest})
		return false
	}

	return true
}

func sendPayload(w http.ResponseWriter, payload map[string]interface{}) bool {
	m, err := json.Marshal(payload)
	if err != nil {
		sendError(w, ErrorMessage{"Internal error", http.StatusInternalServerError})
		return false
	}

	fmt.Fprint(w, string(m))
	return true
}

func sendError(w http.ResponseWriter, message ErrorMessage) {
	m, err := json.Marshal(message)
	if err != nil {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}

	http.Error(w, string(m), message.StatusCode)
}

func getNextPostId() int {
	postIdMutex.Lock()
	defer postIdMutex.Unlock()

	postId++
	return postId
}

func getNextTopicId() int {
	topicIdMutex.Lock()
	defer topicIdMutex.Unlock()

	topicId++
	return topicId
}

func findTopic(id int) *Topic {
	for _, topic := range topics {
		if topic.Id == id {
			return topic
		}
	}

	return nil
}

func paginate(req *http.Request, length int) (int, int) {
	p := req.URL.Query().Get("page")
	if p == "" {
		return 0, length
	}

	page, err := strconv.Atoi(p)
	if err != nil {
		return 0, length
	}

	// when page is out of range
	if float64(page) > math.Ceil(float64(length)/float64(PageSize)) || page <= 0 {
		return 0, 0
	}

	to := page * PageSize
	if to > length {
		to = length
	}

	return (page - 1) * PageSize, to
}

func getIdFromUrl(name string, w http.ResponseWriter, req *http.Request) (int, bool) {
	id, err := strconv.Atoi(req.URL.Query().Get(":" + name))
	if err != nil {
		sendError(w, ErrorMessage{"Invalid id", http.StatusBadRequest})
		return -1, false
	}

	return id, true
}

func testScopePost() string {
	return `Scope

Scope refers to where variables and functions are accessible, and in what context it is being executed. Basically, a variable or function can be defined in a global or local scope. Variables have so-called function scope, and functions have the same scope as variables.


Global scope

When something is global means that it is accessible from anywhere in your code. Take this for example:

var monkey = "Gorilla"; 
function greetVisitor () {
	return alert("Hello dear blog reader!");
}

If that code was being run in a web browser, the function scope would be window, thus making it available to everything running in that web browser window.


Local scope

As opposed to the global scope, the local scope is when something is just defined and accessible in a certain part of the code, like a function. For instance;

function talkDirty () {
	var saying = "Oh, you little VB lover, you";
	return alert(saying);
}
alert(saying); // Throws an error

If you take a look at the code above, the variable saying is only available within the talkDirty function. Outside of it it isn’t defined at all. Note of caution: if you were to declare saying without the var keyword preceding it, it would automatically become a global variable.

What this also means is that if you have nested functions, the inner function will have access to the containing functions variables and functions:

function saveName (firstName) {
	function capitalizeName () {
		return firstName.toUpperCase();
	}
	var capitalized = capitalizeName();
	return capitalized;
}
alert(saveName("Robert")); // Returns "ROBERT"`
}