package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("Could not start tcp server: %s", err)
	}
	log.Println("Started server on port 8080.")
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("Could not accept connection: %s\n", err)
			continue
		}
		log.Printf("Connection accepted from %s\n", conn.RemoteAddr())
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()
	content := "Hello world!"
	contentLength := len(content)
	fmt.Fprintf(
		conn,
		"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: %d\r\n\r\n%s",
		contentLength,
		content)
}
