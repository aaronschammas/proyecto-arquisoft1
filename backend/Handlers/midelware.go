package handlers

import (
	"net/http"

	"github.com/golang-jwt/jwt/v4"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request)

func (h HandlerFunc) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h(w, r)
}

func JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Error(w, "No autorizado", http.StatusUnauthorized)
				return
			}
			http.Error(w, "Error interno del servidor", http.StatusInternalServerError)
			return
		}

		tknStr := c.Value
		claims := &Claims{}
		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				http.Error(w, "No autorizado", http.StatusUnauthorized)
				return
			}
			http.Error(w, "Error interno del servidor", http.StatusInternalServerError)
			return
		}

		if !tkn.Valid {
			http.Error(w, "No autorizado", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
