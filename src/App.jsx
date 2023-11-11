import { Route, Routes } from "react-router-dom";
import Login from "./componentes/login/Login.jsx"
import BarraLateral from "./componentes/barraLateral/BarraLateral.jsx"
import Categorias from "./componentes/categorias/Categorias.jsx"
import Libros from "./componentes/libros/Libros.jsx";
import Proveedores from "./componentes/proveedores/Proveedores.jsx";
import Editorial from "./componentes/editorial/Editorial.jsx";
import Dashboard from "./componentes/dashboard/Dashboard.jsx";

function App() {
  return (
    <>
    <div style={{'display': 'flex' , 'flexDirection': 'row', 'minHeight': '800px'}}>
        <Routes>
            <Route path="/categorias" element={<><BarraLateral></BarraLateral><Categorias /></>}></Route>
            <Route path="/proveedores" element={<><BarraLateral></BarraLateral><Proveedores /></>}></Route>
            <Route path="/libros" element={<><BarraLateral></BarraLateral><Libros /></>}></Route>
            <Route path="/editorial" element={<><BarraLateral></BarraLateral><Editorial /></>}></Route>
            <Route path="/login" element={<><Login /></>}></Route>
            <Route path="/" element={<><BarraLateral></BarraLateral><Dashboard /></>}></Route>
        </Routes>
    </div>
    </>
  );
}

export default App;
