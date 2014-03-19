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
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	posts       []*Post
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

	// routes
	r := pat.New()
	r.Get("/topics/{topicId}/posts/{id}", handleGetPost)
	r.Get("/topics/{id}", handleGetTopic)
	r.Get("/topics", handleListTopics)
	r.Post("/topics/{id}/posts/new", handleNewPost)
	r.Post("/topics/new", handleNewTopic)

	http.Handle("/", r)

	log.Println("Started forum. Listening on localhost:8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
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
