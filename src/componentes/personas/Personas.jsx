import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Personas() {
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    const [persona ,setPersona] = useState({
        nombre : "",
        apellido : "",
        email : "",
        telefono: "",
        direccion : "",
        tipo: ""
    })

    const [personas, setPersonas] = useState([]);
    const [personaSeleccionada, setPersonaSeleccionada] = useState({})
    const [visible, setVisible] = useState(false)
  
    useEffect(() => {
      fetch("http://localhost:3000/personas",{
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
  
    const clickPersona = async (persona) => {
      setPersonaSeleccionada(persona.id_persona)
      setPersona(persona)
      setVisible(true)
    };
    
  
    const eliminarPersona = async (personaId) => {
      if (window.confirm("¿Desea eliminar ?")) {
        const res = await fetch(`http://localhost:3000/personas/${personaId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`},
        });
  
        if (res.ok) {
          setPersonas(personas.filter((persona) => persona.id_persona !== personaId));
        } else {
          alert("Fallo al quitar persona");
        }
      }
      limpiarForm()
      setVisible(false)
    };
  
    const agregarPersona = async () => {
      const res = await fetch("http://localhost:3000/personas", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          persona: {
            nombre: persona.nombre,
            apellido: persona.apellido,
            email: persona.email,
            telefono: persona.telefono,
            direccion: persona.direccion,
            tipo: persona.tipo
            
          },
        }),
      });
  
      if (res.ok) {
        const personaNueva = await res.json();
        setPersonas([...personas, personaNueva]);
      } else {
        console.log("Fallo al crear Persona");
      }
      limpiarForm()
      setVisible(false)
    };
  
    const edicionPersona = async () => {
      if (window.confirm("¿Desea Editar ?")) {
        const res = await fetch(`http://localhost:3000/personas/${personaSeleccionada}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            persona: {
              nombre: persona.nombre,
              apellido: persona.apellido,
              email: persona.email,
              telefono: persona.telefono,
              direccion: persona.direccion,
              tipo: persona.tipo
              
            },
          }),
        });
        if (res.ok) {
          setPersonas(
            personas.map((item)=> item.id_persona == personaSeleccionada ? persona:item)
          )
          limpiarForm()
          setVisible(false)
        } else {
          alert("Error al editar la persona.");
        }
      }
  
    }
  
    const cancelarEdicion = () => {
      limpiarForm();
      setVisible(false);
    }  
    
    function limpiarForm() {
      setPersona({
        nombre: '',
        apellido: '',
        email:'',
        telefono: 0,
        direccion:'',
        tipo: ""
      })
      setVisible(false)
    }

    return (
        <>
            <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <h2 className="text-3xl font-light text-center">Nueva Persona</h2>
                <div className="flex flex-col mt-10 items-center">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                        <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                            <div id="formulario" className="bg-white p-3">
                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Nombre</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, nombre: e.target.value})}}
                                        value={persona.nombre}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar nombre"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Apellido</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, apellido: e.target.value})}}
                                        value={persona.apellido}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar apellido"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Email</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, email: e.target.value})}}
                                        value={persona.email}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar Email"
                                    />
                                </div>
                                {/* Input */}

                                 {/* Input */}
                                 <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Telefono</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, telefono: e.target.value})}}
                                        value={persona.telefono}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="number"
                                        placeholder="Ingresar telefono"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Direccion</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, direccion: e.target.value})}}
                                        value={persona.direccion}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="direccion"
                                        name="direccion"
                                        type="text"
                                        placeholder="Ingresar direccion"
                                    />
                                </div>
                                {/* Input */}
                                 {/* Input */}
                                 <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Tipo</label>
                                    <input
                                        onChange={(e)=>{setPersona({...persona, tipo: e.target.value})}}
                                        value={persona.tipo}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="tipo"
                                        name="tipo"
                                        type="text"
                                        placeholder="Ingresar tipo"
                                    />
                                </div>
                                {visible ? (
                                    <input
                                      onClick={edicionPersona}
                                      type="submit"
                                      className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                      value="Editar Persona"
                                    />
                                  ) : (
                                    <input
                                      onClick={agregarPersona}
                                      type="submit"
                                      className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                      value="Agregar Persona"
                                    />
                                  )}
                                    {visible && (
                                    <input
                                      type="submit"
                                      onClick={cancelarEdicion}
                                      className="bg-gray-500 hover:bg-gray-700 text-white w-full mt-5 p-2 uppercase font-bold"
                                      value="Cancelar"
                                    />
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-light text-center mt-20">Listado de personas</h2>
                <div className="flex flex-col mt-10">
                    <div className="py-2 overflow-x-auto">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 ">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Apellido
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Telefono
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Direccion
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {/* Inicio del Listado */}
                                <tbody id="listado-Personas" className="bg-white">
                                    {/* Inicio del Item del Listado */}
                                    {
                                    personas.map((item,index)=>(
                                        <tr key={item.id_persona}>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.nombre}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.apellido}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.email}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.telefono}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.direccion}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.tipo}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                <span onClick={()=>{eliminarPersona(item.id_persona)}}>🗑️</span>
                                                <span onClick={()=>{clickPersona(item)}}>📝</span>
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

export default Personas
