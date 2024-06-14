//Importando componentes necesarios
import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Función login implementada para student/admin, donde los verifica
const Login = ({ setRoleVar }) => {
  const [username, setUsername] = useState(""); //Estado para el nombre de usuario
  const [password, setPassword] = useState(""); //Estado para la contraseña
  const [role, setRole] = useState("admin"); //Estado para el rol, con valor predeterminado "admin"
  const navigate = useNavigate(); //Hook para la navegación

  axios.defaults.withCredentials = true; //Configura axios para enviar cookies con cada solicitud
  const handleSubmit = () => {
    //Función que maneja el envío del formulario
    axios
      .post("http://localhost:3001/auth/login", { username, password, role }) //Envía una solicitud POST para iniciar sesión
      .then((res) => {
        if (res.data.login && res.data.role === "admin") {
          //Si el usuario es un administrador, establece el rol y navega al dashboard
          setRoleVar("admin");
          navigate("/dashboard");
        } else if (res.data.login && res.data.role === "student") {
          //Si el usuario es un estudiante, establece el rol y navega a la página de inicio
          setRoleVar("student");
          navigate("/"); //Función que los envía a las páginas
        }
        console.log(res);
      })
      .catch((err) => console.log(err)); //Maneja los errores
  };

  //Lo que se muestra en la pág, se le setean los valores con el onChange y los sets
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2> <br />
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn-login" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
