//Importando componentes necesarios
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Función para poder eliminar el curso que el admin desea
const DeleteCourse = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const { id } = useParams(); // Hook para obtener el ID del curso desde la URL
  useEffect(() => {
    // Hook que se ejecuta al montar el componente
    axios
      .delete("http://localhost:3001/course/course/" + id) // Envía una solicitud DELETE para eliminar el curso por ID
      .then((res) => {
        if (res.data.deleted) {
          // Si el curso se eliminó correctamente navega hasta la pagina cursos
          navigate("/courses");
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente
};

export default DeleteCourse;
