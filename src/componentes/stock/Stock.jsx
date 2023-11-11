import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Stock() {
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    const [stock,setStock] = useState({
        cantidad: 0,
        id_libro: 0
    })

    const [stocks, setStocks] = useState([]);
    const [stockSeleccionado, setStockSeleccionado] = useState({})
    const [libro, setLibro] = useState([])
    const [visible, setVisible] = useState(false)
  
    useEffect(() => {
      fetch("http://localhost:3000/stock",{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      })
        .then((res) => res.json())
        .then((stocks) => { setStocks(stocks[0])});
        
    }, []);

    useEffect(() => {
      !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/libros",{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        })
          .then((res) => res.json())
          .then((libro) => setLibro(libro));
          
       }, []);
  
       const clickStock = async (stock) => {
        setStockSeleccionado(stock.id_stock)
         setStock(stock)
         setVisible(true)
    };
    
  
    const eliminarStock = async (stockId) => {
      if (window.confirm("¿Desea eliminar ?")) {
        const res = await fetch(`http://localhost:3000/stock/${stockId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`},
        });
  
        if (res.ok) {
          setStocks(stocks.filter((stock) => stock.id_stock !== stockId));
        } else {
          alert("Fallo al quitar stock");
        }
      }
      limpiarForm()
      setVisible(false)
    };
  
  const agregarStock = async () => {
    const url = 'http://localhost:3000/stock/libros/' + stock.id_libro
      const res = await fetch(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            cantidad: stock.cantidad,
            id_libro: +stock.id_libro
        }),
      });
     
      if (res.ok) {
        const stockNuevo = await res.json();
        setStocks([...stocks, stockNuevo]);
          limpiarForm()
          setVisible(false)
      } else {
        console.log("Fallo al crear Stock");
      }
     
    };
  
    const edicionStock = async () => {
      if (window.confirm("¿Desea Editar ?")) {
        const res = await fetch(`http://localhost:3000/stock/${stockSeleccionado}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
              cantidad: stock.cantidad
          }),
        });
        if (res.ok) {
          setStocks(
            stocks.map((item)=> item.id == stockSeleccionado?stock:item)
          )
          limpiarForm()
          setVisible(false)
        } else {
          alert("Error al editar el stock");
        }
      }
  
    }
    
    function limpiarForm() {
      setStock({
          cantidad: 0,
          id_libro:0
      })
      setVisible(false)
    }

    return (
        <>
            <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                <h2 className="text-3xl font-light text-center">Stock</h2>
                <div className="flex flex-col mt-10 items-center">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                        <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                            <div id="formulario" className="bg-white p-3">
                                {/* Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Stock">Cantidad de Libros:</label>
                                    <input
                                        onChange={(e)=>{setStock({...stock, cantidad: parseInt(e.target.value)})}}
                                        value={stock.cantidad}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="Stock"
                                        name="Stock"
                                        type="number"
                                        placeholder="cantidad de stock de libros"
                                    />
                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proveedor">Proveedores:</label>
                                <select onChange={(e)=>{ setStock({...stock, id_libro: e.target.value })}}
                                value={stock.id_libro}>
                                <option value="0" >Seleccionar</option>
                                    {
                                    libro.map((item,index)=>(
                                        <option value={item.id_libro} key={index}>
                                                {item.nombre}
                                        </option>
                                     ))}
                                </select>
                                </div>
                                {/* Input */}

                                {/* Botón Agregar */}
                                {visible == false && (<input
                                    onClick={()=>{agregarStock()}}
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                    value="Agregar Stock"
                                />)}
                                {/* Botón Agregar */}

                                {/* Botón Editar */}
                
                                {visible == true && (<input
                                    onClick={()=>{edicionStock()}}
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                    value="Editar Stock"
                                />)}
                                {/* /Botón  Editar*/}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-light text-center mt-20">Listado Stocks de Libros</h2>
                <div className="flex flex-col mt-10">
                    <div className="py-2 overflow-x-auto">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 ">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Cantidad
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Nombre del Libro
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {/* Inicio del Listado */}
                                <tbody id="listado-Stock" className="bg-white">
                                    {/* Inicio del Item del Listado */}
                                                                    {
                                  stocks.map((item, index) => (
                                    <tr key={index}>
                                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        {item.stock_cantidad}
                                      </th>
                                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        {item.libro_nombre}
                                      </th>
                                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        <span onClick={() => { eliminarStock(item.id_stock) }}>🗑️</span>
                                        <span onClick={() => { clickStock(item) }}>📝</span>
                                      </th>
                                    </tr>
                                  ))
                                }


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

export default Stock
