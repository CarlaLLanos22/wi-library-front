import { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

function BarraLateral() {

  const { logout } = useAuthContext(); 

  const navigate = useNavigate();

  const onLogout = () => {
    logout(()=> navigate("/login", { replace: true }))
  }

  return (
    <>
    <aside className="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-teal-600 px-5 py-10">
            <h1 className="uppercase text-white tracking-wide text-2xl  font-bold mt-2">Wi-Library 1.0</h1>
            <h1 className="mt-10 text-white"><b>MENU</b></h1><br></br>
            <a  
                href="/ventas" 
                className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
            >Nueva Venta</a>

            <a  
                href="/stock" 
                className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
            >Cargar Stock</a>

            <nav className="mt-8">
                <a  
                    href="/autores" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Autores</a>
                <a  
                    href="/categorias" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Categorias</a>
                <a  
                    href="/editorial" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Editoriales</a>
                <a  
                    href="/libros" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Libros</a>
                <a  
                    href="/personas" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Personas</a>
                <a  
                    href="/proveedores" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Proveedores</a>
                <a  
                    href="/roles" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Roles</a>
                <a  
                    href="/usuarios" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Usuarios</a>
            </nav>
          <a style={{'background':'none', 'marginTop':'100px'}} 
          href="#"
          onClick={()=>{onLogout()}}
          className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
        >🔒 Cerrar Sesión</a>
    </aside>
    </>
  )
}

export default BarraLateral
