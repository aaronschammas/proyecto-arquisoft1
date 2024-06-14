package endpoint

import (
	db "Api_rest/DB"
	"database/sql"
	"net/http"
)

func Tipo(username string, w http.ResponseWriter, r *http.Request) {
	query := "SELECT tipo FROM persona WHERE mail = ?"
	row := db.QueryRow(query, username)

	var tipo string
	err := row.Scan(&tipo)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Usuario no encontrado", http.StatusUnauthorized)
		} else {
			http.Error(w, "Error al obtener el tipo de usuario: "+err.Error(), http.StatusInternalServerError)
		}
		return
	}

	switch tipo {
	case "alumno":
		http.Redirect(w, r, "/pagina?mail="+username, http.StatusSeeOther)
	case "administrador":
		http.Redirect(w, r, "/admin?mail="+username, http.StatusSeeOther)
	default:
		http.Error(w, "Tipo de usuario desconocido", http.StatusForbidden)
	}
}
