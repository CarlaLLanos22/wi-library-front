import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Autores() {
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    const [autor,setAutor] = useState({
        nombre : "",
        apellido : "",
        nacionalidad : "",
        biografia: "",
        fecha_nacimiento : "",
        id_autor : 0
    })

    const [autores, setAutores] = useState([]);
    const [autorSeleccionada, setAutorSeleccionada] = useState({})
    const [visible, setVisible] = useState(false)
  
    useEffect(() => {
      fetch("http://localhost:3000/autores",{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      })
        .then((res) => res.json())
        .then((autores) => setAutores(autores));
        
    }, []);

    useEffect(() => {
      !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
    }, []);
  
  
  
    const clickAutor = async (autor) => {
      setAutorSeleccionada(autor.id_autor)
      setAutor(autor)
      setVisible(true)
    };
    
    function mensajeError(){
      let mensaje = "Ha ocurrido un error"
      autor.nombre == '' ? mensaje = mensaje + "\n Nombre vacio" : null
      autor.apellido == '' ? mensaje = mensaje + "\n Apellido vacio" : null
      autor.nacionalidad == '' ? mensaje = mensaje + "\n Nacionalidad vacio" : null
      autor.biografia == '' ? mensaje = mensaje + "\n Biografia vacio" : null
      autor.fecha_nacimiento == '' ? mensaje = mensaje + "\n Fecha de nacimiento vacio" : null
      return mensaje 
    }
  
  
    const eliminarAutor = async (autorId) => {
      if (window.confirm("¿Desea eliminar ?")) {
        const res = await fetch(`http://localhost:3000/autores/${autorId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`},
        });
  
        if (res.ok) {
          setAutores(autores.filter((autor) => autor.id_autor !== autorId));
        } else {
          alert("Fallo al quitar autor");
        }
      }
      limpiarForm()
      setVisible(false)
    };
  
    const agregarAutor = async () => {
      const res = await fetch("http://localhost:3000/autores", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          autor: {
            nombre: autor.nombre,
            apellido : autor.apellido,
            nacionalidad: autor.nacionalidad,
            biografia: autor.biografia,
            fecha_nacimiento :autor.fecha_nacimiento+" 00:00:00"
          },
        }),
      });
  
      if (res.ok) {
        const autorNueva = await res.json();
        setAutores([...autores, autorNueva]);
      } else {
        alert(mensajeError())
      }
      limpiarForm()
      setVisible(false)
    };
  
    const edicionAutor = async () => {
      if (window.confirm("¿Desea Editar ?")) {
        const res = await fetch(`http://localhost:3000/autores/${autorSeleccionada}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            autor: {
              nombre: autor.nombre,
              apellido : autor.apellido,
              nacionalidad: autor.nacionalidad,
              biografia: autor.biografia,
              fecha_nacimiento :autor.fecha_nacimiento+" 00:00:00"
            },
          }),
        });
        if (res.ok) {
          setAutores(
            autores.map((item)=> item.id_autor == autorSeleccionada?autor:item)
          )
          limpiarForm()
          setVisible(false)
        } else {
          alert("Error al editar el autor.");
        }
      }
  
    }
  
    const cancelarEdicion = () => {
      limpiarForm();
      setVisible(false);
    };
  
    
    function limpiarForm() {
      setAutor({
        nombre: '',
        apellido: '',
        nacionalidad:'',
        biografia: '',
        fecha_nacimiento:''
      })
      setVisible(false)
    }

    return (
        <>
            <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <h2 className="text-3xl font-light text-center">Nuevo Autor</h2>
                <div className="flex flex-col mt-10 items-center">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                        <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                            <div id="formulario" className="bg-white p-3">
                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Nombre</label>
                                    <input
                                        onChange={(e)=>{setAutor({...autor, nombre: e.target.value})}}
                                        value={autor.nombre}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar nombre de la Autor"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Apellido</label>
                                    <input
                                        onChange={(e)=>{setAutor({...autor, apellido: e.target.value})}}
                                        value={autor.apellido}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar apellido del Autor"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Nacionalidad</label>
                                    <input
                                        onChange={(e)=>{setAutor({...autor, nacionalidad: e.target.value})}}
                                        value={autor.nacionalidad}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar nacionalidad de la Autor"
                                    />
                                </div>
                                {/* Input */}

                                 {/* Input */}
                                 <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Biografia</label>
                                    <input
                                        onChange={(e)=>{setAutor({...autor, biografia: e.target.value})}}
                                        value={autor.biografia}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar biografia de la Autor"
                                    />
                                </div>
                                {/* Input */}

                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Fecha nacimiento</label>
                                    <input
                                        onChange={(e)=>{setAutor({...autor, fecha_nacimiento: e.target.value})}}
                                        value={autor.fecha_nacimiento}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="date"
                                        placeholder="Ingresar fecha de nacimiento  de la Autor"
                                    />
                                </div>
                   
                                {visible ? (
                                    <input
                                      onClick={edicionAutor}
                                      type="submit"
                                      className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                      value="Editar Autores"
                                    />
                                  ) : (
                                    <input
                                      onClick={agregarAutor}
                                      type="submit"
                                      className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                      value="Agregar Autores"
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
                <h2 className="text-3xl font-light text-center mt-20">Listado de autores</h2>
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
                                            Nacionalidad
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            biografia
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Fecha Nacimiento
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {/* Inicio del Listado */}
                                <tbody id="listado-Autores" className="bg-white">
                                    {/* Inicio del Item del Listado */}
                                    {
                                    autores.map((item,index)=>(
                                        <tr key={item.id_autor}>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.nombre}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.apellido}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.nacionalidad}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.biografia}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.fecha_nacimiento}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                <span className="cursor-pointer" onClick={()=>{eliminarAutor(item.id_autor)}}>🗑️</span>
                                                <span className="cursor-pointer" onClick={()=>{clickAutor(item)}}>📝</span>
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

export default Autores
