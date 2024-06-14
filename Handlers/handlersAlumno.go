package handlers

import (
	db "Api_rest/DB"
	"Api_rest/endpoint"
	modelos "Api_rest/models"
	"net/http"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func Login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		templates.ExecuteTemplate(w, "Login.html", nil)

	case http.MethodPost:
		username := r.FormValue("mail")
		password := r.FormValue("password")

		if checkCredentials(username, password) {
			expirationTime := time.Now().Add(5 * time.Minute)
			claims := &Claims{
				Username: username,
				RegisteredClaims: jwt.RegisteredClaims{
					ExpiresAt: jwt.NewNumericDate(expirationTime),
				},
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				http.Error(w, "Error interno del servidor", http.StatusInternalServerError)
				return
			}

			http.SetCookie(w, &http.Cookie{
				Name:    "token",
				Value:   tokenString,
				Expires: expirationTime,
			})

			endpoint.Tipo(username, w, r)
		} else {
			http.Error(w, "Credenciales incorrectas", http.StatusUnauthorized)
		}

	default:
		http.Error(w, "Método HTTP no soportado", http.StatusMethodNotAllowed)
	}
}

func checkCredentials(username, password string) bool {
	var storedPassword string
	query := "SELECT contraseña FROM persona WHERE mail = ?"

	row := db.QueryRow(query, username)
	err := row.Scan(&storedPassword)
	if err != nil {
		return false
	}

	return storedPassword == password
}

func Menu(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		Mail := r.URL.Query().Get("mail")
		persona, err := modelos.ObtenerPersonaPorEmail(Mail)
		if err != nil {
			http.Error(w, "Error al obtener la persona: "+err.Error(), http.StatusInternalServerError)
			return
		}

		cursos, err := modelos.ObtenerTodosLosCursos()
		if err != nil {
			http.Error(w, "Error al obtener los cursos: "+err.Error(), http.StatusInternalServerError)
			return
		}

		misCursos, err := modelos.ObtenerCursosDePersona(persona.ID)
		if err != nil {
			http.Error(w, "Error al obtener los cursos de la persona: "+err.Error(), http.StatusInternalServerError)
			return
		}

		cursosDisponibles := filtrarCursosDisponibles(cursos, misCursos)

		data := PageData{
			Persona:   persona,
			Cursos:    cursosDisponibles,
			MisCursos: misCursos,
		}

		templates.ExecuteTemplate(w, "Pagina.html", data)

	case http.MethodPost:
		// Manejar la lógica para POST
		action := r.FormValue("action")
		idPersonaStr := r.FormValue("id_persona")
		cursos := r.Form["curso"]

		idPersona, err := strconv.Atoi(idPersonaStr)
		if err != nil {
			http.Error(w, "ID de persona inválido: "+err.Error(), http.StatusBadRequest)
			return
		}

		if action == "inscribir" {
			for _, cursoIDStr := range cursos {
				cursoID, err := strconv.Atoi(cursoIDStr)
				if err != nil {
					http.Error(w, "Error al convertir cursoID: "+err.Error(), http.StatusInternalServerError)
					return
				}

				err = modelos.InscribirAlumno(idPersona, cursoID)
				if err != nil {
					http.Error(w, "Error al inscribir en curso: "+err.Error(), http.StatusInternalServerError)
					return
				}
			}
		} else if action == "actualizar" {
			var cursoIDs []int
			for _, cursoIDStr := range cursos {
				cursoID, err := strconv.Atoi(cursoIDStr)
				if err != nil {
					http.Error(w, "Error al convertir cursoID: "+err.Error(), http.StatusInternalServerError)
					return
				}
				cursoIDs = append(cursoIDs, cursoID)
			}

			err := modelos.EliminarInscripciones(idPersona, cursoIDs)
			if err != nil {
				http.Error(w, "Error al eliminar inscripciones: "+err.Error(), http.StatusInternalServerError)
				return
			}
		}

		http.Redirect(w, r, "/pagina?mail="+r.FormValue("mail"), http.StatusSeeOther)
	}
}

func filtrarCursosDisponibles(cursos []modelos.Curso, misCursos []modelos.Curso) []modelos.Curso {
	misCursosMap := make(map[int]bool)
	for _, curso := range misCursos {
		misCursosMap[curso.ID] = true
	}

	var cursosDisponibles []modelos.Curso
	for _, curso := range cursos {
		if !misCursosMap[curso.ID] {
			cursosDisponibles = append(cursosDisponibles, curso)
		}
	}

	return cursosDisponibles
}
