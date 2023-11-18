import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


function Usuarios() {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [usuario,setUsuario] = useState({
        username : '',
        password:  '',
        id_rol: 0,
        id_persona:0
    })

    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({})
    const [visible, setVisible] = useState(false)
  
    useEffect(() => {
        fetch("http://localhost:3000/usuarios", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        })
          .then((res) => res.json())
          .then((usuarios) => setUsuarios(usuarios));
      
  
        fetch("http://localhost:3000/roles", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        })
          .then((res) => res.json())
          .then((roles) => setRoles(roles));
      
       
        fetch("http://localhost:3000/personas", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        })
          .then((res) => res.json())
          .then((personas) => setPersonas(personas));
      
      }, []); 
      

    useEffect(() => {
      !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
    }, []);
  
    const clickUsuario = async (usuario) => {
      setUsuarioSeleccionado(usuario.usuario.id_usuario)
      const usua = {...usuario.usuario, id_persona: usuario.oersona.id_persona, id_rol: usuario.rol.id_rol}
      setUsuario(usua)
      setVisible(true)
    };
    
  
    const eliminarUsuario = async (usuarioId) => {
      if (window.confirm("¿Desea eliminar ?")) {
        const res = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`},
        });
  
        if (res.ok) {
          setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== usuarioId));
        } else {
          alert("Fallo al quitar usuario");
        }
      }
      limpiarForm()
      setVisible(false)
    };
  
    const agregarUsuario = async () => {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          usuario: {
            username: usuario.username,
            password:  usuario.password,
            id_persona: usuario.id_persona,
            id_rol: usuario.id_rol,
          },
        }),
      });
  
      if (res.ok) {
        const usuarioNuevo = await res.json();
          const usuarioEstado = {
              "usuario": usuarioNuevo,
              "persona": {
                  "id_persona": usuarioNuevo.id_persona
              },
              "rol": {
                  "id_rol": usuarioNuevo.id_rol
              }
          }
        setUsuarios([...usuarios, usuarioEstado]);
        limpiarForm()
      } else {
        alert(mensajeError())
      }
      setVisible(false)
    };
  
    const edicionUsuario = async () => {
      if (window.confirm("¿Desea Editar ?")) {
        const res = await fetch(`http://localhost:3000/usuarios/${usuarioSeleccionado}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            usuario:{
              username: usuario.username,
              password: usuario.password,
              id_rol: usuario.id_rol,
              id_persona : usuario.id_persona
            },
          }),
        });
        if (res.ok) {
          setUsuarios(
            usuarios.map((item)=> item.id_usuario == usuarioSeleccionado? usuario:item)
          )
          limpiarForm()
          setVisible(false)
        } else {
          alert("Error al editar la usuario.");
        }
      }
  
    }
    
    function limpiarForm() {
      setUsuario({
        username : '',
        password:  '',
        id_rol:0,
        id_persona:0
      })
      setVisible(false)
    }



    return (
        <>
            <main className="md:w-2/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <div className="flex flex-row items-start">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                    <h2 className="text-3xl font-light text-center">Nuevo Usuario</h2>
                    <br></br>
                        <div className=" bg-white p-3 shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Username">Usuario</label>
                                    <input
                                        onChange={(e)=>{setUsuario({...usuario, username: e.target.value})}}
                                        value={usuario.username}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Username"
                                        name="Username"
                                        type="text"
                                        placeholder="Ingresar usuario"
                                        required
                                    />
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">Contraseña</label>
                                    <input
                                        onChange={(e)=>{setUsuario({...usuario, password: e.target.value})}}
                        
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Password"
                                        name="Password"
                                        type="password"
                                        placeholder="Ingresar contraseña"
                                        required
                                    />
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Tipo">Rol:</label>
                                    <select onChange={(e)=>{setUsuario({...usuario, id_rol: e.target.value})}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    value={usuario.id_rol}>
                                        <option value="0" >Seleccionar</option>
                                    {
                                    roles.map((item,index)=>(
                                        <option value={item.id_rol} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                    </select>

                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Tipo">Persona:</label>
                                    <select onChange={(e)=>{setUsuario({...usuario, id_persona: e.target.value})}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    value={usuario.id_persona}>
                                        <option value="0" >Seleccionar</option>
                                    {
                                    personas.map((item,index)=>(
                                        <option value={item.id_persona} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                    </select>
                                
                                </div>
                                {/* Input */}

                                {/* Botón Agregar */}
                                {visible == false && (<button
                                    onClick={()=>{agregarUsuario()}}
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                 > Agregar Usuario </button>)}
                                {/* Botón Agregar */}

                                {/* Botón Editar */}
                                {visible == true && (<button
                                    onClick={()=>{edicionUsuario()}}
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                >Editar Usuario</button>)}
                                {/* /Botón  Editar*/}
                        </div>
                    </div>
                    <div className="py-2  w-full ml-5 t-0 -mt-12">
                      <h2 className="text-3xl font-light text-center mt-20">Listado de Usuarios</h2>
                    
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 ">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Usuario
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Id Rol
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Id Persona
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {/* Inicio del Listado */}
                                <tbody id="listado-Usuarios" className="bg-white">
                                    {/* Inicio del Item del Listado */}
                                    {usuarios.map((item,index)=>(
                                        <tr key={index}>
                                            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.usuario.username}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.persona.id_persona}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.rol.id_rol}
                                            </th> 
                                            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                <span onClick={()=>{eliminarUsuario(item.id_usuario)}}>🗑️</span>
                                                <span onClick={()=>{clickUsuario(item)}}>📝</span>
                                            </th>
                                        </tr>
                                     ))}
                                    {/* Fin del Item del Listado */}
                                </tbody>
                                {/* Fin del Listado */}
                            </table>
                        </div>
                    </div>
                </div>
 

            </main>
        </>
    )
}

export default Usuarios