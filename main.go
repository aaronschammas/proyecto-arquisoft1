package main

import (
	db "Api_rest/DB"
	mapeo "Api_rest/map"
)

func main() {
	db.Connect()
	defer db.Close()
	mapeo.StartApplication()
}
