//Importando componentes necesarios
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//Define el componente que va a hacer que podamos editar los cursos, sus variables
const EditCourse = () => {
  const [name, setName] = useState(""); //Estado para el nombre del curso
  const [detail, setDetail] = useState(""); //Estado para los detalles del curso
  const [price, setPrice] = useState(""); //Estado para el precio del curso
  const [hours, setHours] = useState(""); //Estado para las horas del curso
  const [imageUrl, setImageUrl] = useState(""); //Estado para la URL de la imagen del curso
  const navigate = useNavigate(); //Hook para la navegación
  const { id } = useParams(); //Hook para obtener el ID del curso desde la URL

  useEffect(() => {
    //Hook que se ejecuta al montar el componente
    axios
      .get("http://localhost:3001/course/course/" + id) //Solicita los datos del curso por ID
      .then((res) => {
        setName(res.data.name); // Actualiza el estado con el nombre del curso
        setDetail(res.data.detail); // Actualiza el estado con el detalle del curso
        setPrice(res.data.price || ""); // Actualiza el estado con el precio del curso
        setHours(res.data.hours || ""); // Actualiza el estado con las horas del curso
        setImageUrl(res.data.imageUrl); // Actualiza el estado con la imagen del curso
      })
      .catch((err) => console.log(err)); //Maneja los errores
  }, []); //Dependencias vacías para ejecutar solo una vez al montar el componente

  const handleSubmit = (e) => {
    //Función que maneja el envío del formulario
    e.preventDefault(); //Previene el comportamiento por defecto del formulario
    axios
      .put("http://localhost:3001/course/course/" + id, {
        //Envía una solicitud PUT para actualizar el curso
        name,
        detail,
        price,
        hours,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          //Si el curso se actualizó correctamente navega hasta los cursos
          navigate("/courses");
        } else {
          console.log(res); //Sino salta el error por consola
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  };

  //Función que nos devuelve la página con sus cambios con el onSubmit para el botón y los onChange para poder cambiar los valores
  return (
    <div className="student-form-container">
      <form className="course-form" onSubmit={handleSubmit}>
        <h2>Edit Course</h2>
        <div className="form-group">
          <label htmlFor="course">Course Name:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCourse;
