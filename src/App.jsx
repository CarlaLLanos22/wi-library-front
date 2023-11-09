import { Route, Routes } from "react-router-dom";
import Login from "./componentes/login/login.jsx"
import BarraLateral from "./componentes/barraLateral/BarraLateral.jsx"
import Categorias from "./componentes/categorias/Categorias.jsx"
import Libros from "./componentes/libros/Libros.jsx";
import Editorial from "./componentes/editorial/Editorial.jsx";

function App() {
  return (
    <>
    <div style={{'display': 'flex' , 'flexDirection': 'row', 'minHeight': '800px'}}>
        { localStorage.getItem("token") && (<BarraLateral></BarraLateral>)}
        <Routes>
            <Route path="/categorias" element={<Categorias />}></Route>
            <Route path="/libros" element={<Libros />}></Route>
            <Route path="/editorial" element={<Editorial />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    </div>
    </>
  );
}

export default App;
