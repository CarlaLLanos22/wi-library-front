import { Route, Routes } from "react-router-dom";
import Login from "./componentes/login/login.jsx"
import BarraLateral from "./componentes/barraLateral/BarraLateral.jsx"
import Categorias from "./componentes/categorias/Categorias.jsx"
import Libros from "./componentes/libros/Libros.jsx";
import Proveedores from "./componentes/proveedores/Proveedores.jsx";

function App() {
  return (
    <>
    <div style={{'display': 'flex' , 'flexDirection': 'row', 'minHeight': '800px'}}>
        { localStorage.getItem("token") && (<BarraLateral></BarraLateral>)}
        <Routes>
            <Route path="/categorias" element={<Categorias />}></Route>
            <Route path="/libros" element={<Libros />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/proveedores" element={<Proveedores />}></Route>
        </Routes>
    </div>
    </>
  );
}

export default App;
