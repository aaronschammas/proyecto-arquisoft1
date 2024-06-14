package mapeo

import (
	"Api_rest/handlers"
	"log"
	"net/http"
)

func StartApplication() {

	mux := http.NewServeMux()
	mapDynamicRoutes(mux)

	// Iniciar el servidor
	log.Println("Servidor iniciado en http://localhost:8000")
	err := http.ListenAndServe(":8000", mux)
	if err != nil {
		log.Fatal("Error starting the server: ", err)
	}
}

func mapDynamicRoutes(mux *http.ServeMux) {

	fs := http.FileServer(http.Dir("./tmp/CSS"))
	mux.Handle("/CSS/", http.StripPrefix("/CSS/", fs))

	// Servir archivos estáticos desde ./tmp/CSS/Images en la ruta /Images/
	imgFs := http.FileServer(http.Dir("./tmp/CSS/Images"))
	mux.Handle("/Images/", http.StripPrefix("/Images/", imgFs))

	// Rutas de la aplicación dinámicas
	mux.HandleFunc("/", handlers.Login)
	mux.Handle("/pagina", handlers.JWTMiddleware(http.HandlerFunc(handlers.Menu)))
	mux.Handle("/registro", handlers.JWTMiddleware(http.HandlerFunc(handlers.CreateUser)))
	mux.Handle("/admin", handlers.JWTMiddleware(http.HandlerFunc(handlers.Administrador)))

	// Manejo de rutas no encontradas
	mux.HandleFunc("/not-found", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})
}
