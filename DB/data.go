package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	url = "root:@tcp(localhost:3306)/tp_facu"
)

var db *sql.DB

func Connect() {
	connection, err := sql.Open("mysql", url)
	if err != nil {
		panic(err)
	}
	fmt.Println("Conexion exitosa")
	db = connection
}

func Close() {
	db.Close()
}

func Ping() {
	if err := db.Ping(); err != nil {
		panic(err)
	}
}

func Verificar(tableName string) bool {
	sql := fmt.Sprintf("SHOW TABLES LIKE '%s'", tableName)
	rows, err := Query(sql)

	if err != nil {
		fmt.Println(err)
	}
	return rows.Next()
}

func TruncTable(tableName string) {
	sql := fmt.Sprintf("TRUNCATE %s", tableName)
	Exec(sql)
}

func Exec(query string, args ...interface{}) (sql.Result, error) {
	result, err := db.Exec(query, args...)
	if err != nil {
		fmt.Println(err)
	}
	return result, err
}

func Query(query string, args ...interface{}) (*sql.Rows, error) {
	rows, err := db.Query(query, args...)
	if err != nil {
		fmt.Println(err)
	}
	return rows, err
}

func QueryRow(query string, args ...interface{}) *sql.Row {
	return db.QueryRow(query, args...)
}
