package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/pat"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"
)

type Topic struct {
	Id          int     `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Posts       []*Post `json:"posts"`
}

type Post struct {
	Id        int       `json:"id"`
	Timestamp time.Time `json:"timestamp"`
	Author    string    `json:"author"`
	Content   string    `json:"content"`
}

type ErrorMessage struct {
	Message    string `json:"message"`
	StatusCode int    `json:"status_code"`
}

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
	r.Get("/topics", handleListTopics)
	r.Get("/topics/{id}", handleGetTopic)
	r.Post("/topics/{id}/posts/new", handleNewPost)
	r.Post("/topics/new", handleNewTopic)

	http.Handle("/", r)

	log.Println("Started forum. Listening on localhost:8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleListTopics(w http.ResponseWriter, req *http.Request) {
	payload := map[string]interface{}{
		"topics":      topics,
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
		payload := map[string]interface{}{
			"topic":       topic,
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
	topic.Posts = make([]*Post, 0)
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

	topic.Posts = append(topic.Posts, &post)
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
