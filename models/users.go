package modelos

import (
	db "Api_rest/DB"
)

func NewPersona(nombre, apellido, mail, tipo, contraseña string) *Persona {
	return &Persona{Nombre: nombre, Apellido: apellido, Mail: mail, Tipo: tipo, Contraseña: contraseña}
}

func (p *Persona) Save() error {
	if p.ID == 0 {
		return p.insert()
	}
	return p.update()
}

func (p *Persona) insert() error {
	sql := "INSERT INTO persona (nombre, apellido, mail, tipo, contraseña) VALUES (?, ?, ?, ?, ?)"
	_, err := db.Exec(sql, p.Nombre, p.Apellido, p.Mail, p.Tipo, p.Contraseña)
	if err != nil {
		return err
	}
	return nil
}

func (p *Persona) update() error {
	sql := "UPDATE persona SET nombre=?, apellido=?, mail=?, tipo=?, contraseña=? WHERE id_persona=?"
	_, err := db.Exec(sql, p.Nombre, p.Apellido, p.Mail, p.Tipo, p.Contraseña, p.ID)
	if err != nil {
		return err
	}
	return nil
}

func ObtenerTodasLasPersonas() ([]Persona, error) {
	sql := "SELECT id_persona, nombre, apellido, mail, tipo, contraseña FROM persona"
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	personas := []Persona{}
	for rows.Next() {
		p := Persona{}
		if err := rows.Scan(&p.ID, &p.Nombre, &p.Apellido, &p.Mail, &p.Tipo, &p.Contraseña); err != nil {
			return nil, err
		}
		personas = append(personas, p)
	}
	return personas, nil
}

func ObtenerPersonaPorID(id int) (*Persona, error) {
	p := &Persona{}
	sql := "SELECT id_persona, nombre, apellido, mail, tipo, contraseña FROM persona WHERE id_persona = ?"
	row := db.QueryRow(sql, id)
	if err := row.Scan(&p.ID, &p.Nombre, &p.Apellido, &p.Mail, &p.Tipo, &p.Contraseña); err != nil {
		return nil, err
	}
	return p, nil
}

func (p *Persona) Delete() error {
	sql := "DELETE FROM persona WHERE id_persona = ?"
	_, err := db.Exec(sql, p.ID)
	if err != nil {
		return err
	}
	return nil
}

func ObtenerTodosLosCursos() ([]Curso, error) {
	sql := "SELECT cursos_id, nombre, detalle, precio, horas_cursado FROM cursos"
	rows, err := db.Query(sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cursos := []Curso{}
	for rows.Next() {
		c := Curso{}
		if err := rows.Scan(&c.ID, &c.Nombre, &c.Detalle, &c.Precio, &c.HorasCursado); err != nil {
			return nil, err
		}
		cursos = append(cursos, c)
	}
	return cursos, nil
}

func ObtenerCursoPorID(id int) (*Curso, error) {
	c := &Curso{}
	sql := "SELECT cursos_id, nombre, detalle, precio, horas_cursado FROM cursos WHERE cursos_id = ?"
	row := db.QueryRow(sql, id)
	if err := row.Scan(&c.ID, &c.Nombre, &c.Detalle, &c.Precio, &c.HorasCursado); err != nil {
		return nil, err
	}
	return c, nil
}

func ObtenerPersonaPorEmail(mail string) (*Persona, error) {
	p := &Persona{}
	sql := "SELECT id_persona, nombre, apellido, mail, tipo, contraseña FROM persona WHERE mail = ?"
	row := db.QueryRow(sql, mail)
	if err := row.Scan(&p.ID, &p.Nombre, &p.Apellido, &p.Mail, &p.Tipo, &p.Contraseña); err != nil {
		return nil, err
	}
	return p, nil
}
