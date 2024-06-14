package modelos

import (
	db "Api_rest/DB"
)

func (c *Curso) SaveCurso() error {
	if c.ID == 0 {
		return c.insert()
	}
	return c.update()
}

func (c *Curso) insert() error {
	sql := "INSERT INTO cursos (nombre, detalle, precio, horas_cursado) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(sql, c.Nombre, c.Detalle, c.Precio, c.HorasCursado)
	if err != nil {
		return err
	}
	return nil
}

func (c *Curso) update() error {
	sql := "UPDATE cursos SET nombre=?, detalle=?, precio=?, horas_cursado=? WHERE cursos_id=?"
	_, err := db.Exec(sql, c.Nombre, c.Detalle, c.Precio, c.HorasCursado, c.ID)
	if err != nil {
		return err
	}
	return nil
}

func (c *Curso) Delete() error {
	sql := "DELETE FROM cursos WHERE cursos_id = ?"
	_, err := db.Exec(sql, c.ID)
	if err != nil {
		return err
	}
	return nil
}

func ObtenerCursos() ([]Curso, error) {
	sql := "SELECT cursos_id, nombre, detalle, precio, horas_cursado FROM cursos"
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cursos []Curso
	for rows.Next() {
		var curso Curso
		if err := rows.Scan(&curso.ID, &curso.Nombre, &curso.Detalle, &curso.Precio, &curso.HorasCursado); err != nil {
			return nil, err
		}
		cursos = append(cursos, curso)
	}
	return cursos, nil
}

func ObtenerCursosDePersona(personaID int) ([]Curso, error) {
	query := `
        SELECT c.cursos_id, c.nombre
        FROM alumno a
        LEFT JOIN cursos c ON c.cursos_id = a.cursos_id
        LEFT JOIN persona p ON p.id_persona = a.id_persona
        WHERE p.id_persona = ?
    `
	rows, err := db.Query(query, personaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cursos []Curso
	for rows.Next() {
		var curso Curso
		if err := rows.Scan(&curso.ID, &curso.Nombre); err != nil {
			return nil, err
		}
		cursos = append(cursos, curso)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return cursos, nil
}
