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
            <p className="mt-10 text-white">Menú</p>
            <nav className="mt-8">
                <a  
                    href="/libros" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Libros</a>
                <a  
                    href="/categorias" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Categorias</a>
                <a  
                    href="/editorial" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Editoriales</a>
                <a  
                    href="/stock" 
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
                >Stock</a>
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
