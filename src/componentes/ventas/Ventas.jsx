import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Ventas() {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [venta,setVenta] = useState({
        nombre : '',
        cantidad: 0,
        descuento: 0
    })

    const [ventas, setVentas] = useState([]);
    const [ventaSeleccionada, setVentaSeleccionada] = useState({})
    const [visible, setVisible] = useState(false)
    const [libros, setLibros] = useState([])
    const [detalles, setDetalles]=useState([])
    const [detallesFiltrados, setDetallesFiltrados]=useState([])
  
    useEffect(() => {
      fetch("http://localhost:3000/ventas",{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      })
        .then((res) => res.json())
        .then((ventas) => setVentas(ventas));
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
  
    const clickVenta = async (venta) => {
      setVentaSeleccionada(venta.id_venta)
      setVenta(venta)
      setVisible(true)
    };
    
  
    const eliminarVenta = async (ventaId) => {
      if (window.confirm("¿Desea eliminar ?")) {
        const res = await fetch(`http://localhost:3000/ventas/${ventaId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`},
        });
  
        if (res.ok) {
          setVentas(ventas.filter((venta) => venta.id_venta !== ventaId));
        } else {
          alert("Fallo al quitar venta");
        }
      }
      limpiarForm()
      setVisible(false)
    };
  
    const agregarVenta = async () => {
      const res = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          venta: {
            nombre: venta.nombre,
          },
        }),
      });
  
      if (res.ok) {
        const ventaNueva = await res.json();
        setVentas([...ventas, ventaNueva]);
      } else {
        console.log("Fallo al crear Venta");
      }
      limpiarForm()
      setVisible(false)
    };
  
    const edicionVentas = async () => {
      if (window.confirm("¿Desea Editar ?")) {
        const res = await fetch(`http://localhost:3000/ventas/${ventasSeleccionada}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            ventas: { 
              nombre: ventas.nombre
            },
          }),
        });
        if (res.ok) {
          setVentas(
            ventas.map((item)=> item.id == ventaSeleccionada?venta:item)
          )
          limpiarForm()
          setVisible(false)
        } else {
          alert("Error al editar la venta.");
        }
      }
  
    }

    
    function limpiarForm() {
      setVenta({
        nombre: '',
        cantidad: 0,
        descuento: 0
      })
      setVisible(false)
    }

    function filtrarLibro(nombre) {
      let difference = libros.filter(x => !detalles.includes(x));
      const libroFiltrado = difference.filter((item)=>item.nombre.includes(nombre))
      setDetallesFiltrados(libroFiltrado)
    }

    function agregarLibro(id_libro) {
      const libroSeleccionado = libros.filter((item)=>item.id_libro==id_libro)[0]
      libroSeleccionado['cantidad'] = parseInt(venta.cantidad)
      setDetalles( [...detalles, libroSeleccionado])
      limpiarForm()
      setDetallesFiltrados([])
    }

    return (
        <>
            <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <h2 className="text-3xl font-light text-center">Nuevo Venta</h2>
                <div className="flex flex-col mt-10 items-center">
                    <div className="w-full">
                        <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                            <div id="formulario" className="bg-white p-3">
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
                                <div className="overflow-hidden overflow-y-scroll h-20" >
                                {
                                  
                                    detallesFiltrados.map((item,index)=>(
                                        <ul key={item.id_libro} >
                                            <li className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                               <span onClick={()=>{agregarLibro(item.id_libro)}}>✔️ {item.nombre}</span>
                                            </li>
                                    
                                        </ul>
                                     ))}
                                  </div>
                                  <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">Cantidad</label>
                                  <input
                                        onChange={(e)=>{setVenta({...venta,cantidad:e.target.value})}}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Cantidad"
                                        name="Cantidad"
                                        type="number"
                                        placeholder="Cantidad"
                                    />
                                  <br></br>
                                  <br></br>
                                  <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Descuento">Descuento</label>
                                  <input
                                        onChange={(e)=>{setVenta({...venta,cantidad:e.target.value})}}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Descuento"
                                        name="Descuento"
                                        type="number"
                                        placeholder="Porcentaje de Descuento"
                                    />
                                <br></br>
                                <br></br>
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
                                                <span onClick={()=>{eliminarLibro(indice)}}>🗑️</span>
                                           
                                            </th>

                                        </tr>
                                     ))}
                                    {/* Fin del Item del Listado */}
                                </tbody>
                                {/* Fin del Listado */}
                            </table>

                            <h2 className="text-3xl font-light text-center">TOTAL = ${ detalles.reduce((acc,item)=>acc+(item.precio*item.cantidad),0) } </h2>
                            {/* Botón Agregar */}
                            {visible == false && (<input
                                    onClick={()=>{agregarDescuento()}}
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                    value="Agregar Descuento"
                                />)}
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
