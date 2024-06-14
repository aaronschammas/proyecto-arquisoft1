//Importando componentes necesarios
import React from "react";
import { Link, useNavigate } from "react-router-dom";

//Define el componente que va a mostrar las tarjetas de los cursos con sus respectivas cosas
const CourseCard = ({ course, role, userId }) => {
  const { name, detail, imageUrl, price = "", hours = "" } = course; //Destructura las propiedades del curso
  const navigate = useNavigate(); //Hook para la navegación
  /*
  const handleEnroll = async () => {
    try {
      const response = await axios.post("http://localhost:3001/enroll", {
        courseId: course._id,
        userId,
      });
      if (response.status === 200) {
        alert("Inscripción exitosa");
        navigate("/courses");
      }
    } catch (error) {
      console.error("Error al inscribirse en el curso:", error);
      alert("Error al inscribirse en el curso.");
    }
  }; */

  //Devuelve en la página las tarjetas detalladas y si el que ingresa es el admin tiene botones para editar y borrar estos
  return (
    <div className="course-card">
      <img src={imageUrl} alt={name} className="course-image" />
      <div className="course-details">
        <h3>{name}</h3>
        <p>{detail}</p>
        <p>
          Price:
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p>Duration: {hours} hs</p>
      </div>
      {role === "admin" && (
        <div className="course-actions">
          <button>
            <Link to={`/course/${course._id}`} className="btn-link">
              edit
            </Link>
          </button>
          <button>
            <Link to={`/delete/${course._id}`} className="btn-link">
              delete
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
