//Importando componentes necesarios
import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Define el componente que el admin tiene habilitado para agregar un student a la pagina
const AddStudent = () => {
  const [username, setUsername] = useState(""); //Estado para el nombre de usuario
  const [password, setPassword] = useState(""); //Estado para la contraseña
  const navigate = useNavigate(); //Hook para la navegación

  const handleSubmit = (e) => {
    //Función para manejar el envío del formulario
    e.preventDefault(); //Evita que el formulario se envíe automáticamente
    axios
      .post("http://localhost:3001/student/register", {
        //Envía una solicitud POST al servidor para registrar un nuevo estudiante
        username,
        password,
      })
      .then((res) => {
        if (res.data.registered) {
          //Si el registro es exitoso según la respuesta del servidor, navega hasta el dashboard
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  };

  //Función para agregar al estudiante por la pagina con el boton para registrarlo
  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AddStudent;
