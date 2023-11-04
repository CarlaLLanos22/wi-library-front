import { useEffect, useState } from "react";

function Libros() {

   const [libro,setLibro] =  useState({
    id_categoria : 0
   })

   const token = localStorage.getItem('token')
   
   const [categorias,setCategorias] = useState([])

   useEffect(() => {
    fetch("http://localhost:3000/categorias",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((categorias) => setCategorias(categorias));
      
  }, []);


  useEffect(() => {
    !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
  }, []);
  
  return (
    <>
      <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 className="text-3xl font-light text-center">Nuevo Libro</h2>
            <div className="flex flex-col mt-10 items-center">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                    <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                        <form id="formulario" className="bg-white p-3">
                          {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="Campo 1">Campo 1</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Campo 1"
                                    name="Campo 1"
                                    type="text"
                                    placeholder="Campo 1 Libro"
                                />
                            </div>
                            {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Campo 2</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Libro"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="telefono">Campo 3</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    placeholder="Campo 3 Libro"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="telefono">Campo 3</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_categoria : e.target.value })}}>
                                    {
                                    categorias.map((item,index)=>(
                                        <option value={item.id_categoria} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="Campo 4">Campo 4</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Campo 4"
                                    name="Campo 4"
                                    type="text"
                                    placeholder="Campo 4 Libro"
                                />
                            </div>

                            {/* Botón */}
                            <input
                                onClick={console.log(libro)}
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                value="Agregar Libro"
                            />
                            {/* /Botón */}
                        </form>
                    </div>
                </div>
            </div>
          <h2 className="text-3xl font-light text-center mt-20">Listado de Libros</h2>
          <div className="flex flex-col mt-10">
              <div className="py-2 overflow-x-auto">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                   <table className="min-w-full">
                        <thead className="bg-gray-100 ">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 1 Libro
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 3
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 4
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody id="listado-Libros" className="bg-white"></tbody>
                    </table>
                  </div>
                </div>
              </div>

        </main>
    </>
  )
}

export default Libros
