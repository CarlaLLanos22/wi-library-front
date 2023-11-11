import { Route, Routes } from "react-router-dom";
import Login from "./componentes/login/Login.jsx"
import BarraLateral from "./componentes/barraLateral/BarraLateral.jsx"
import Categorias from "./componentes/categorias/Categorias.jsx"
import Libros from "./componentes/libros/Libros.jsx";
import Editorial from "./componentes/editorial/Editorial.jsx";
import Stock from "./componentes/stock/Stock.jsx"
import Dashboard from "./componentes/dashboard/Dashboard.jsx";
import Usuarios from "./componentes/usuarios/Usuarios.jsx"
import Autores from "./componentes/autores/Autores.jsx";
import Roles from "./componentes/roles/Roles.jsx";
import Personas from "./componentes/personas/Personas.jsx";

function App() {
  return (
    <>
    <div style={{'display': 'flex' , 'flexDirection': 'row', 'minHeight': '800px'}}>
        <Routes>
            <Route path="/categorias" element={<><BarraLateral></BarraLateral><Categorias /></>}></Route>
            <Route path="/libros" element={<><BarraLateral></BarraLateral><Libros /></>}></Route>
            <Route path="/editorial" element={<><BarraLateral></BarraLateral><Editorial /></>}></Route>
            <Route path="/stock" element={<><BarraLateral></BarraLateral><Stock /></>}></Route>
            <Route path="/usuarios" element={<><BarraLateral></BarraLateral><Usuarios /></>}></Route>
            <Route path="/login" element={<><Login /></>}></Route>
            <Route path="/" element={<><BarraLateral></BarraLateral><Dashboard /></>}></Route>
        </Routes>
    </div>
    </>
  );
}

export default App;
