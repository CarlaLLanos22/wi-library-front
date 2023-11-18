import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Ventas() {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [venta,setVenta] = useState({
        nombre : '',
        cantidad: 0,
        descuento: 0,
        total: 0,
        id_cliente:0
    })

    const [ventas, setVentas] = useState([]);
    const [libros, setLibros] = useState([])
    const [detalles, setDetalles]=useState([])
    const [detallesFiltrados, setDetallesFiltrados]=useState([])
    const [personas,setPersonas] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:3000/libros",{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}` 
            }
          })
            .then((res) => res.status == 401 ? volverLogin() : res.json() )
            .then((libros) => { 
              setLibros(libros) 
              setDetallesFiltrados(libros)
      });

      fetch("http://localhost:3000/personas",{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      })
        .then((res) => res.status == 401 ? volverLogin() : res.json() )
        .then((personas) => setPersonas(personas));
    }, []);

  
    useEffect(() => {
      !localStorage.getItem("token") ?  volverLogin() : null
    }, []);


    const volverLogin = () =>{
      navigate('/login',{ replace: true })
    }
  
    const finalizarVenta = async () => {
      const tokenDecode = jwtDecode(localStorage.getItem("token"));

      const res = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          venta: {
            id_vendedor: parseInt(tokenDecode.id_persona),
            id_cliente: parseInt(venta.id_cliente),
            descuento: parseInt(venta.descuento)
          },
        }),
      });
  
      if (res.ok) {
        const ventaNueva = await res.json();
        detalles.forEach(async (libro) => {
          const res = await fetch(`http://localhost:3000/ventas-productos`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              ventaProducto:{
                id_libro: libro.id_libro,
                id_venta: ventaNueva.id,
                precio: libro.precio,
                cantidad: parseInt(libro.cantidad)
              }
            }),
          });
        });

        alert("✅ ¡Venta creada exitosamente!")
      
      } else {
        if (res.status == 401){
          volverLogin()
        } 
        alert("⚠️ ¡Error al crear la venta!")
      }
      setDetalles([])
      setDetallesFiltrados(libros)
      limpiarForm()
      setVenta({
        total:0,
        descuento:0,
        nombre: '',
        cantidad: 0
      })
    };
  
    function limpiarForm() {
      setVenta({
        ...venta,
        nombre: '',
        cantidad: 0
      })
    }

    function filtrarLibro(nombre) {
      let difference = libros.filter(x => !detalles.includes(x));
      const libroFiltrado = difference.filter((item)=>item.nombre.includes(nombre))
      setDetallesFiltrados(libroFiltrado)
    }

    function agregarLibro(id_libro,stock) {
      if (venta.cantidad==0 || venta.cantidad > stock){
        alert("La cantidad ingresada es incorrecta")
      }else{
        const libroSeleccionado = libros.filter((item)=>item.id_libro==id_libro)[0]
        libroSeleccionado['cantidad'] = parseInt(venta.cantidad)
        const nuevoDetalle = [...detalles, libroSeleccionado]
        
        setDetalles(nuevoDetalle)
        setDetallesFiltrados(detallesFiltrados.filter((item)=>item.id_libro != id_libro ))
  
        const totalActual = nuevoDetalle.reduce((acc,item)=>acc+(item.precio*item.cantidad),0)
      
        setVenta({
          ...venta,
          nombre: '',
          cantidad: 0,
          total: totalActual
        })
      }
    }

    function eliminarLibro(libro){
      const detalleSinLibro = detalles.filter((item)=>item.id_libro != libro.id_libro )
      setDetalles(detalleSinLibro)
      setDetallesFiltrados([...detallesFiltrados,libro])
      const totalActual = detalleSinLibro.reduce((acc,item)=>acc+(item.precio*item.cantidad),0)
      setVenta({
        ...venta,
        nombre: '',
        cantidad: 0,
        total: totalActual
      })
    } 

    function devolverFecha(){
      const today = new Date();
      const month = today.getMonth()+1;
      const year = today.getFullYear();
      const date = today. getDate();
      return date + "/" + month + "/" + year
    }

    return (
        <>
            <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <h2 className="text-3xl font-light text-center">Nuevo Venta</h2>
                <div className="flex flex-col mt-10 items-center">
                    <div className="w-full">
                        <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                            <div id="formulario" className="bg-white p-3">
                              <br></br>
                              <label  className="mr-5 pt-10 text-gray-700 text-sm font-bold mb-2" htmlFor="Cliente">Elegir Cliente</label>
                                <select className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{ setVenta({...venta, id_cliente : e.target.value })}}
                                value={venta.id_cliente}>
                                  <option value="0" >Seleccionar</option>
                                    {
                                    personas.map((item,index)=>(
                                        <option value={item.id_persona} key={index}>
                                                {item.apellido}, {item.nombre} ({item.email}) 
                                        </option>
                                     ))}
                                </select>
                                <label  className="ml-40 text-gray-700 text-sm font-bold mb-2" htmlFor="Descuento">Fecha</label>
                                <label className="ml-10">{devolverFecha()}</label>
                                <br></br>
                                <br></br>
                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Buscar Libro🔍</label>
                                    <input
                                        onChange={(e)=>{setVenta({...venta,nombre:e.target.value});filtrarLibro(e.target.value)}}
                                        value={venta.nombre}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Nombre"
                                        name="Nombre"
                                        type="text"
                                        placeholder="Ingresar nombre del libro"
                                    />
                                
                                </div>
                                {/* Input */}
                                <div className="overflow-hidden overflow-y-scroll h-30" >

                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-6" htmlFor="Nombre">Cantidad del Libro</label>

                                <input
                                                    onChange={(e)=>{setVenta({...venta,cantidad:e.target.value})}}
                                                    className="appearance-none border rounded ml-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="Cantidad"
                                                    name="Cantidad"
                                                    type="number"
                                                    value={venta.cantidad}
                                                    placeholder="Cantidad"
                                                />
                                {
                                  
                                    detallesFiltrados.map((item)=>(
                                        <ul key={item.id_libro} >
                                            <li className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                               { (item.stock-item.ventas)>0 && (<button className="bg-teal-600 hover:bg-teal-900 mr-10 p-2 text-white uppercase font-bold" onClick={()=>{agregarLibro(item.id_libro,item.stock-item.ventas)}}>Agregar al Detalle</button>)} 
                                               { (item.stock-item.ventas) == 0 && (<label className="bg-teal-900 hover:bg-teal-900 mr-10 p-2 text-white uppercase font-bold">Sin Stock</label>)} 
                                               {item.nombre} - ${item.precio} (En Stock: {item.stock-item.ventas})  
                                              
                                            </li>
                                    
                                        </ul>
                                     ))}
                                  </div>
                                  <br></br>
                                  <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Descuento">Descuento</label>
                                  <input
                                        onChange={(e)=>{setVenta({...venta,descuento:e.target.value})}}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Descuento"
                                        name="Descuento"
                                        type="number"
                                        value={venta.descuento}
                                        placeholder="Porcentaje de Descuento"
                                    />

                                <h1 className="text-2xl font-light text-center mt-5">Detalle</h1>
                            
                                <table className="min-w-full">
                                <thead className="bg-gray-100 ">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Libro
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Precio
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Cantidad
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Sub-Total
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {/* Inicio del Listado */}
                                <tbody id="listado-Categorias" className="bg-white">
                                    {/* Inicio del Item del Listado */}
                                    {
                                    detalles.map((item,index)=>(
                                        <tr key={index}>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.nombre}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                ${item.precio}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                {item.cantidad}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                ${parseFloat(item.cantidad) * parseFloat(item.precio)}
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                                <span className="cursor-pointer" onClick={()=>{eliminarLibro(item)}}>❌</span>
                                           
                                            </th>

                                        </tr>
                                     ))}
                                    {/* Fin del Item del Listado */}
                                </tbody>
                                {/* Fin del Listado */}
                            </table>

                            <h2 className="text-3xl font-light text-center">TOTAL = ${ venta.total - (venta.total*venta.descuento/100) } </h2>
                            {/* Botón Agregar */}
                            {(detalles.length > 0 && venta.id_cliente > 0) && (<button
                                    onClick={()=>{finalizarVenta()}}
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                >Finalizar Venta</button>)}
                                {/* Botón Agregar */}
                            </div>
                        </div>
                    </div>
                </div>
                

            </main>
        </>
    )
}

export default Ventas
