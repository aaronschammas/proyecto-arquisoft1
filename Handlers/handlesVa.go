package handlers

import (
	modelos "Api_rest/models"
	"log"
	"text/template"

	"github.com/golang-jwt/jwt/v4"
)

var templates *template.Template

var jwtKey = []byte("my_secret_key")

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func init() {
	var err error
	templates, err = template.ParseFiles("tmp/Login.html", "tmp/Registro.html", "tmp/Pagina.html", "tmp/Admin.html")
	if err != nil {
		log.Fatal(err)
	}
}

type PageData struct {
	Persona   *modelos.Persona
	Cursos    []modelos.Curso
	MisCursos []modelos.Curso
}
