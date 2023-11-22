import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Proveedores from "../proveedores/Proveedores";


function Libros() {

    const navigate = useNavigate();
    
    const token = localStorage.getItem('token')

    const [libro, setLibro] = useState({
        nombre: "",
        año: 0,
        tipo: "",
        isbn: "",
        precio:0,
        id_autor: 0,
        id_editorial: 0,
        id_proveedor: 0,
        id_categoria: 0
        
    })
  const [libros, setLibros] = useState([])
  const [categorias, setCategorias] = useState([])
  const [autores, setAutores] = useState([])
  const [editorial, setEditorial] = useState([])
  const [proveedor, setProveedor] = useState([])
  const [libroSeleccionada, setLibroSeleccionada] = useState({})
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
  
  const clickLibro = async (libro) => {
    if (libro && libro.id_libro) {
      setLibroSeleccionada(libro.id_libro);
      setLibro({
        nombre: libro.nombre,
        año: libro.año,
        tipo: libro.tipo,
        isbn: libro.isbn,
        precio:libro.precio,
        id_autor: libro.id_autor,
        id_categoria: libro.id_categoria,
        id_editorial: libro.id_editorial,
        id_proveedor: libro.id_proveedor,
      });
      setVisible(true);
    } else {
      console.error('El objeto libro no tiene la propiedad id_libro.');
    }
  };

  function mensajeError(){
    let mensaje = "Ha ocurrido un error"
    libro.nombre == '' ? mensaje = mensaje + "\n Nombre vacio" : null
    libro.año == '' ? mensaje = mensaje + "\n Año vacio" : null
    libro.precio == '' ? mensaje = mensaje + "\n Precio vacio" : null
    libro.formato == '' ? mensaje = mensaje + "\n Formato vacio" : null
    libro.isbn == '' ? mensaje = mensaje + "\n ISBN vacio" : null
    libro.id_autor == '' ? mensaje = mensaje + "\n Autor vacio" : null
    libro.id_editorial == '' ? mensaje = mensaje + "\n Editorial vacio" : null
    libro.id_proveedor == '' ? mensaje = mensaje + "\n Proveedor vacio" : null
    libro.id_categoria == '' ? mensaje = mensaje + "\n Categoria vacia" : null
    return mensaje 
  }

  
  
  const agregarLibros = async () => {
    const res = await fetch("http://localhost:3000/libros", {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
          nombre: libro.nombre,
          año: +libro.año,
          tipo:libro.tipo,
          isbn: libro.isbn,
          precio:+libro.precio,
          id_autor: +libro.id_autor,
          id_editorial: +libro.id_editorial,
          id_proveedor: +libro.id_proveedor,
          id_categoria: +libro.id_categoria
       
      }),
    });

    if (res.ok) {
      const LibroNuevo = await res.json();
      setLibros([...libros, LibroNuevo]);
      setVisible(false)
      limpiarForm()
    } else {
      alert(mensajeError())
    }

    
  };

  const edicionLibro = async () => {
    if (window.confirm("¿Desea Editar ?")) {
      const res = await fetch(`http://localhost:3000/libros/${libroSeleccionada}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: libro.nombre,
          año: +libro.año,
          tipo:libro.tipo,
          isbn: libro.isbn,
          precio:+libro.precio,
          id_autor: +libro.id_autor,
          id_editorial: +libro.id_editorial,
          id_proveedor: +libro.id_proveedor,
          id_categoria: +libro.id_categoria
      }),
    });

      if (res.ok) {
        setLibros(
          libros.map((item) => item.id_libro === libroSeleccionada ? libro : item)
        );
        limpiarForm();
        setVisible(false);
      } else {
        alert("Error al editar el libro.");
      }
    }
  };
  

  const eliminarLibro = async (libroId) => {
    if (window.confirm("¿Desea eliminar ?")) {
      const res = await fetch(`http://localhost:3000/libros/${libroId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`},
      });

      if (res.ok) {
        setLibros(libros.filter((libro) => libro.id_libro !== libroId));
      } else {
        alert("Fallo al quitar libro");
      }
    }
    limpiarForm()
    setVisible(false)
  };

  const cancelarEdicion = () => {
    limpiarForm();
    setVisible(false);
  };

  function limpiarForm() {
    setLibro({
      nombre: "",
      año: 0,
      tipo: "",
      isbn: "",
      precio:0,
      id_autor: 0,
      id_editorial: 0,
      id_proveedor: 0,
      id_categoria: 0
    })
    setVisible(false)
  }

  return (
    <>
      <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 className="text-3xl font-light text-center">Nuevo Libro</h2>
            <div className="flex flex-col mt-10 items-center">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                    <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                      
                        <div id="formulario" className="bg-white p-3">
                          {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre:</label>
                                <input 
                                    value={libro.nombre}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="Ingresar nombre del libro"
                                    onChange={(e)=>{setLibro({...libro, nombre: e.target.value})}}
                                />
                            </div>
                            {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="año">Año de Edicion:</label>
                                <input 
                                    value={libro.año}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="año"
                                    name="año"
                                    type="number"
                                    placeholder="Ingresar año de edicion del libro"
                                    onChange={(e)=>{setLibro({...libro, año: e.target.value})}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio:</label>
                                <input 
                                    value={libro.precio}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    placeholder="Ingresar precio del libro"
                                    onChange={(e)=>{setLibro({...libro, precio: e.target.value})}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">Formato:</label>
                                <input 
                                    value={libro.tipo}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tipo"
                                    name="tipo"
                                    type="text"
                                    placeholder="Ingresar formato del libro"
                                    onChange={(e)=>{setLibro({...libro, tipo: e.target.value})}}
                                    
                                />
                            </div>
                            

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ISBN">ISBN:</label>
                                <input
                                    value={libro.isbn} 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ISBN"
                                    name="ISBN"
                                    type="text"
                                    placeholder="ISBN del Libro"
                                    onChange={(e)=>{setLibro({...libro, isbn: e.target.value})}}
                                />
                </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorias">Categorias:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_categoria : +e.target.value })}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={libro.id_categoria}>
                                  <option value="0" >Seleccionar</option>
                                    {
                                    categorias.map((item,index)=>(
                                        <option value={item.id_categoria} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="autores">Autores:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_autor : e.target.value })}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                 value={libro.id_autor} >
                               
                                <option value="0" >Seleccionar</option>
                                    {
                                    autores.map((item,index)=>(
                                        <option value={item.id_autor} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editorial">Editoriales:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_editorial : e.target.value })}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                 value={libro.id_editorial}>
                                <option value="0" >Seleccionar</option>
                                    {
                                    editorial.map((item,index)=>(
                                        <option value={item.id_editorial} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>
                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proveedor">Proveedores:</label>
                                <select onChange={(e)=>{ setLibro({...libro, id_proveedor: e.target.value })}} className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={libro.id_proveedor}>
                                <option value="0" >Seleccionar</option>
                                    {
                                    proveedor.map((item,index)=>(
                                        <option value={item.id_proveedor} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                            </div>

                            {/* Botón */}
                          
                          {/* /Botón Cancelar */}
                          {/* Botón Agregar o Editar */}
                          {visible ? (
                            <input
                              onClick={edicionLibro}
                              type="submit"
                              className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                              value="Editar Libro"
                            />
                          ) : (
                            <input
                              onClick={agregarLibros}
                              type="submit"
                              className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                              value="Agregar Libro"
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
                                {/* /Botón  Editar*/}
                        </div>
                    </div>
                </div>
            </div>
          <h2 className="text-3xl font-light text-center mt-20">Listado de Libros</h2>
          <div className="flex flex-col mt-10">
              <div className="py-2 overflow-x-auto">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                   <table className="min-w-full">
                        <thead className="bg-gray-100 " >
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Nombre
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Edicion
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Formato
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        ISBN
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Autor
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Proveedor
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Categoria
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Precio

                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Editorial
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody id="listado-Libros" className="bg-white">
                  {
                    libros.map((l)=>(
                                        <tr key={l.id_libro}>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.nombre}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.año}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.tipo}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.isbn}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                  {l.nombre_autor}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                  {l.nombre_proveedor}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.nombre_categoria}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {l.precio}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                  {l.nombre_editorial}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                <span className="cursor-pointer" onClick={()=>{eliminarLibro(l.id_libro)}}>🗑️</span>
                                                <span className="cursor-pointer" onClick={()=>{clickLibro({ ...l })}}>📝</span>
                                            </th>
                                        </tr>
                                        
                                     ))}
                                    
                        </tbody>
                    </table>
                  </div>``
                </div>
              </div>

        </main>
    </>
  )
}

export default Libros
