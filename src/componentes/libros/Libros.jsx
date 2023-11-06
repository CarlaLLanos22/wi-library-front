import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Libros() {

    const navigate = useNavigate();
    
    const token = localStorage.getItem('token')

    const [libro, setLibro] = useState({
        nombre: "",
        año: 0,
        tipo: "",
        isbn: "",
        id_autor: 0,
        id_editorial: 0,
        id_proveedor: 0,
        id_categoria: 0
        
    })
  const [libros, setLibros] = useState([])
  const [categorias, setCategorias] = useState([])
  const [autor, setAutor] = useState([])
  const [editorial, setEditorial] = useState([])
  const [proveedor, setProveedor] = useState([])
  const [visible, setVisible] = useState(false)

  

  useEffect(() => {
    fetch("http://localhost:3000/libros",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((libros) => setLibros(libros));
      
  }, []);

  useEffect(() => {
    !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
  }, []);

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
    fetch("http://localhost:3000/autores",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((autor) => setAutor(autor));
      
  }, []);
   useEffect(() => {
    fetch("http://localhost:3000/proveedores",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((proveedor) => setProveedor(proveedor));
      
   }, []);

  
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
    fetch("http://localhost:3000/editorial",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((editorial) => setEditorial(editorial));
      
   }, []);
  
  const agregarLibros = async () => {
    const res = await fetch("http://localhost:3000/libros", {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        libro: {
          nombre: libro.nombre,
          año: libro.año,
          tipo:libro.tipo,
          isbn: libro.isbn,
          id_autor: libro.id_autor,
          id_editorial: libro.id_editorial,
          id_proveedor: libro.id_proveedor,
          id_categoria: libro.id_categoria
        },
      }),
    });

    if (res.ok) {
      const LibroNuevo = await res.json();
      setLibros([...libros, LibroNuevo]);
    } else {
      console.log("Fallo al crear Libro");
    }
  };


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
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="nombre"
                                    onChange={(e)=>{setLibro({...libro, nombre: e.target.value})}}
                                />
                            </div>
                            {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="año">Año:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="año"
                                    name="año"
                                    type="year"
                                    placeholder="año"
                                    onChange={(e)=>{setLibro({...libro, año: e.target.value})}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="tipo">Formato:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tipo"
                                    name="tipo"
                                    type="text"
                                    placeholder="formato"
                                    onChange={(e)=>{setLibro({...libro, tipo: e.target.value})}}
                                    
                                />
                            </div>
                            

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="ISBN">ISBN:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ISBN"
                                    name="ISBN"
                                    type="text"
                                    placeholder="ISBN Libro"
                                    onChange={(e)=>{setLibro({...libro, isbn: e.target.value})}}
                                />
                </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="categorias">Categorias:</label>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="autor">Autores:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_autor : e.target.value })}}>
                                    {
                                    autor.map((item,index)=>(
                                        <option value={item.id_autor} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="editorial">Editoriales:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_editorial : e.target.value })}}>
                                    {
                                    editorial.map((item,index)=>(
                                        <option value={item.id_editorial} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="proveedor">Proveedores:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_provedor: e.target.value })}}>
                                    {
                                    proveedor.map((item,index)=>(
                                        <option value={item.id_proveedor} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>

                            {/* Botón */}
                            <input
                                    onClick={()=>{agregarLibros()}}
                                    type="button"
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                    value="Agregar libro"
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
