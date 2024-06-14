//Importando componentes necesarios
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import "../css/Course.css";
import SearchCourse from "./SearchCourse";

//Define el componente que muestra los cursos recibiendo los roles como prop
const Courses = ({ role }) => {
  const [courses, setCourses] = useState([]); //Estado para almacenar la lista de cursos

  useEffect(() => {
    //Hook que se ejecuta al montar el componente
    axios
      .get("http://localhost:3001/course/courses") //Realiza una solicitud GET al servidor para obtener la lista de cursos
      .then((res) => {
        console.log("Datos recibidos:", res.data); // Verificar los datos recibidos
        // Si los datos son un array de cursos, filtra por 'name'
        const validCourses = res.data.filter((course) => course && course.name);
        setCourses(validCourses); //Actualiza el estado con los cursos válidos
      })
      .catch((err) => console.log(err)); //Maneja los errores
  }, []);
  /*
  const handleEnroll = (courseId) => {
    axios
      .post(`http://localhost:3001/enroll`, { courseId }) // Suponiendo que la ruta de inscripción sea esta
      .then((res) => {
        alert("Inscripción exitosa!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error al inscribirse en el curso.");
      });
  }; */

  return (
    <div className="course-back">
      <SearchCourse courses={courses} role={role} />{" "}
      {/* Renderiza el componente SearchCourse con la lista de cursos y el rol del usuario */}
    </div>
  );
};

export default Courses;
