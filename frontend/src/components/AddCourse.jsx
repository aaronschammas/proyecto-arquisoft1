//Importando componentes necesarios
import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Define el componente habilitado para el admin que agrega un nuevo curso con sus cosas
const AddCourse = () => {
  const [name, setName] = useState(""); //Estado para el nombre del curso
  const [detail, setDetail] = useState(""); //Estado para el detalle del curso
  const [price, setPrice] = useState(""); //Estado para el precio del curso
  const [hours, setHours] = useState(""); //Estado para las horas del curso
  const [imageUrl, setImageUrl] = useState(""); //Estado para la imagen del curso
  const navigate = useNavigate(); //Hook para la navegación

  const handleSubmit = (e) => {
    //Función para manejar el envío del formulario
    e.preventDefault(); //Evita que el formulario se envíe automáticamente
    axios
      .post("http://localhost:3001/course/add", {
        //Envía una solicitud POST al servidor para agregar un nuevo curso
        name,
        detail,
        price,
        hours,
        imageUrl,
      })
      .then((res) => {
        if (res.data.added) {
          //Si se agrega el curso correctamente según la respuesta del servidor, navega hasta la página de cursos
          navigate("/courses");
          console.log(res);
        } else {
          console.log(res); //Sino, salta el error por consola
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  };

  //Función para agregar el curso por la pagina con el boton para agregarlo, setea los valores debido al onChange se puede cambiar
  return (
    <div className="student-form-container">
      <form className="course-form" onSubmit={handleSubmit}>
        <h2>Add Course</h2>
        <div className="form-group">
          <label htmlFor="course">Course Name:</label>
          <input
            type="text"
            id="course"
            name="course"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="text"
            id="hours"
            name="hours"
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCourse;
