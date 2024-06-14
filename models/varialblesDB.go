package modelos

type Persona struct {
	ID         int    `json:"id_persona"`
	Nombre     string `json:"nombre"`
	Apellido   string `json:"apellido"`
	Mail       string `json:"mail"`
	Tipo       string `json:"tipo"`
	Contraseña string `json:"contraseña"`
}

type Curso struct {
	ID           int     `json:"cursos_id"`
	Nombre       string  `json:"nombre"`
	Detalle      string  `json:"detalle"`
	Precio       float64 `json:"precio"`
	HorasCursado int     `json:"horas_cursado"`
}

type Alumno struct {
	IDAlumno  int `json:"id_alumno"`
	IDPersona int `json:"id_persona"`
	CursoID   int `json:"cursos_id"`
}

type Administrador struct {
	IDAdm     int `json:"id_adm"`
	IDPersona int `json:"id_persona"`
}
