//Importando componentes necesarios
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ role }) => {
  const isLoggedIn = role !== ""; //Verifica si el usuario ha iniciado sesión

  //Función que muestra la barra de arriba de la página con la que podes navegar mediante los distintos botones/links
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          COURSEATP
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/courses" className="navbar-link">
          Courses
        </Link>
        {role === "admin" && ( //Si el rol es admin muestra estos botones/links
          <>
            <Link to="/addcourse" className="navbar-link">
              Add Course
            </Link>
            <Link to="/addstudent" className="navbar-link">
              Add Student
            </Link>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </>
        )}
        {isLoggedIn ? ( //Verifica si el usuario ha iniciado sesión
          <Link to="/logout" className="navbar-link">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
