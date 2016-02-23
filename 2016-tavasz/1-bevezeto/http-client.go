package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
)

func main() {
	var address string
	if len(os.Args) == 1 {
		log.Println("No address present. Fallback to 'localhost:8080'.")
		address = "localhost:8080"
	} else {
		address = os.Args[1]
	}

	conn, err := net.Dial("tcp", address)
	if err != nil {
		log.Fatalf("Could not open connection to %s: %s", address, err)
	}
	defer conn.Close()

	// request page
	fmt.Fprintf(conn, "GET / HTTP/1.1\r\nHost: %s\r\nConnection: close\r\n\r\n", address)

	// print response
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}
