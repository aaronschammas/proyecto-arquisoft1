//Importando componentes necesarios
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Función para desloguearse de la pág
const Logout = ({ setRole }) => {
  const navigate = useNavigate(); //Hook para la navegación
  useEffect(() => {
    //Hook que se ejecuta al montar el componente
    axios
      .get("http://localhost:3001/auth/logout") //Envía una solicitud GET para cerrar sesión
      .then((res) => {
        if (res.data.logout) {
          //Si la respuesta indica que la sesión se cerró correctamente, se resetea el rol y navega hasta el Home
          setRole("");
          navigate("/");
        }
      })
      .catch((err) => console.log(err)); //Maneja los errores
  }, []);
};

export default Logout;
