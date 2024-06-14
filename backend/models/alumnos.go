package modelos

import (
	db "Api_rest/DB"
	"fmt"
)

func EliminarInscripciones(idPersona int, cursoIDs []int) error {
	sql := "DELETE FROM alumno WHERE id_persona = ? AND cursos_id = ?"
	for _, cursoID := range cursoIDs {
		_, err := db.Exec(sql, idPersona, cursoID)
		if err != nil {
			return err
		}
	}
	return nil
}

func InscribirAlumno(idPersona int, cursoID int) error {
	sql := "INSERT INTO alumno (id_persona, cursos_id) VALUES (?, ?)"
	_, err := db.Exec(sql, idPersona, cursoID)
	return err
}

func ObtenerTodosLosAlumnos() ([]Alumno, error) {
	sql := "SELECT id_alumno, id_persona, cursos_id FROM alumno"
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	alumnos := []Alumno{}
	for rows.Next() {
		a := Alumno{}
		if err := rows.Scan(&a.IDAlumno, &a.IDPersona, &a.CursoID); err != nil {
			return nil, err
		}
		alumnos = append(alumnos, a)
	}
	return alumnos, nil
}

func ObtenerAlumnoPorID(id int) (*Alumno, error) {
	a := &Alumno{}
	sql := "SELECT id_alumno, id_persona, cursos_id FROM alumno WHERE id_alumno = ?"
	row := db.QueryRow(sql, id)
	if err := row.Scan(&a.IDAlumno, &a.IDPersona, &a.CursoID); err != nil {
		return nil, err
	}
	return a, nil
}
func NewCurso(nombre, detalle string, precio float64, horasCursado int) *Curso {
	return &Curso{Nombre: nombre, Detalle: detalle, Precio: precio, HorasCursado: horasCursado}
}
func DeleteCursoByID(cursoID int) error {

	sqlalumnos := "DELETE FROM alumno WHERE cursos_id = ?"

	_, erralum := db.Exec(sqlalumnos, cursoID)
	if erralum != nil {
		return fmt.Errorf("error deleting course with ID %d: %v", cursoID, erralum)
	}

	sql := "DELETE FROM cursos WHERE cursos_id = ?"
	_, err := db.Exec(sql, cursoID)
	if err != nil {
		return fmt.Errorf("error deleting course with ID %d: %v", cursoID, err)
	}

	return nil
}
