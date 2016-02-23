package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// serve files from the directory
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/form", handleFormPost)
	log.Println("Server is starting on port 8080.")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleFormPost(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		log.Printf("Requested resource is not found: %s", r.RequestURI)
		http.NotFound(w, r)
		return
	}

	r.ParseForm()
	for k, v := range r.Form {
		// echo back all parameters
		fmt.Fprintf(w, "%s=%s\n", k, v)
	}
}
