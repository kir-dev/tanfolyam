package main

import (
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/form", handleFormPost)
	http.ListenAndServe(":8080", nil)
}

func handleFormPost(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.NotFound(w, r)
		return
	}

	// TODO: send form data back
}
