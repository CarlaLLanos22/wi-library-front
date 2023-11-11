import { useState } from "react";


const [proveedor, setProveedor] = useState({

    nombre: "",
    direccion: "",
    telefono: 0,
    mail: ""

})

function Proveedores() {

    return (
        <>
       <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 className="text-3xl font-light text-center">Agregar proveedor</h2>
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
                                    onChange={(e)=>{setProveedor({...proveedor, nombre: e.target.value})}}
                                />
                            </div>
                            {/* Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="direccion">Direccion:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="año"
                                    name="año"
                                    type="year"
                                    placeholder="año"
                                    onChange={(e)=>{setProveedor({...proveedor, direccion: e.target.value})}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="telefono">Telefono:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tipo"
                                    name="tipo"
                                    type="text"
                                    placeholder="formato"
                                    onChange={(e)=>{setProveedor({...proveedor, telefono: e.target.value})}}
                                    
                                />
                            </div>
                            

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="mail">Mail:</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ISBN"
                                    name="ISBN"
                                    type="text"
                                    placeholder="ISBN Libro"
                                    onChange={(e)=>{setProveedor({...proveedor, mail: e.target.value})}}
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </main>




        </>
    )
}

export default Proveedores