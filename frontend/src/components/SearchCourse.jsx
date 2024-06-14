//Importando componentes necesarios
import React, { useState } from "react";
import CourseCard from "./CourseCard";
import "../css/Course.css";

//Función que la utilizamos para poder buscar los cursos por su nombre en la parte de Courses, recibe los cursos y el rol como props
const SearchCourse = ({ courses, role }) => {
  const [searchTerm, setSearchTerm] = useState(""); //Estado para el término de búsqueda

  const handleSearchChange = (event) => {
    //Función que maneja el cambio en el campo de búsqueda
    setSearchTerm(event.target.value); //Actualiza el término de búsqueda en el estado
  };

  const filteredCourses = courses.filter(
    //Filtra los cursos según el término de búsqueda (nombre)
    (course) =>
      course.name &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Nos muestra la página de cursos normal y va cambiando si le ingresamos nombres
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar cursos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="course-list">
        {filteredCourses.length > 0 ? ( //Verifica si hay cursos que coincidan con la búsqueda
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} role={role} /> //Muestra la tarjeta para cada curso que coincida
          ))
        ) : (
          <p className="no-results">No se encontraron cursos.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCourse;
