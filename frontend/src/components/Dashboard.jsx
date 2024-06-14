//Importando componentes necesarios
import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";

//Define el componente que muestra cuantos cursos, estudiantes y admins hay en la página
const Dashboard = () => {
  const [students, setStudents] = useState(0); //Actualiza el estado con el número total de estudiantes
  const [admin, setAdmin] = useState(0); //Actualiza el estado con el número total de admins
  const [courses, setCourses] = useState(0); //Actualiza el estado con el número total de cursos

  useEffect(() => {
    //Hook que se ejecuta al montar el componente
    axios
      .get("http://localhost:3001/dashboard") //Realiza una solicitud GET al servidor para obtener datos del dashboard
      .then((res) => {
        if (res.data.ok) {
          //Si la respuesta indica éxito, muestra la cantidad de estudiantes, admins y cursos que hay
          setStudents(res.data.student);
          setAdmin(res.data.admin);
          setCourses(res.data.course);
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  }, []);

  //Muestra la página con los 3 cuadros
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Total Courses</h2> <br />
        <h2>{courses}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Students</h2> <br />
        <h2>{students}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Admins</h2> <br />
        <h2>{admin}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
