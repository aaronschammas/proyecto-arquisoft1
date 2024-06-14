//Importando componentes necesarios para las conexiones
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import axios from "axios";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import DeleteCourse from "./components/DeleteCourse";
import Registration from "./components/Registration";

//Declaración de la función App
function App() {
  const [role, setRole] = useState(""); //Estado para almacenar el rol que va a tener el ususario (admin / student)

  axios.defaults.withCredentials = true; //Configura axios para enviar cookies con cada solicitud
  useEffect(() => {
    axios //conecta el front con el back (es básicamente igual que el fetch), maneja solicitudes HTTP
      .get("http://localhost:3001/auth/verify") //Verifica autenticación del usuario
      .then((res) => {
        if (res.data.login) {
          //Si está autenticado, le da su respectivo rol
          setRole(res.data.role);
        } else {
          setRole(""); //Sino, lo resetea
        }
      })
      .catch((err) => console.log(err)); //Maneja el error si hay
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />{" "}
      {/*Muestra la barra de navegación, pasando el rol del usuario*/}
      <Routes>
        {" "}
        {/*Conexión a las rutas */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses" element={<Courses role={role} />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
        <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
        <Route path="/addcourse" element={<AddCourse />}></Route>
        <Route path="/course/:id" element={<EditCourse />}></Route>
        <Route path="/delete/:id" element={<DeleteCourse />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
