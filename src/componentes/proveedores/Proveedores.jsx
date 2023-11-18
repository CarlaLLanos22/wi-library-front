import { useState, useEffect } from "react";
import { useNavigate } from "react-router";


function Proveedores() {

const navigate = useNavigate()
const token = localStorage.getItem('token')
const [proveedor, setProveedor] = useState({
    nombre: null,
    direccion: null,
    telefono: 0,
    mail: null,
    id_proveedor: 0
})
const [proveedores, setProveedores] = useState([])
const [visible, setVisible] = useState(false)
const [proveedorSeleccionado, setProveedorSeleccionado] = useState({})


useEffect(() => {
    fetch("http://localhost:3000/proveedores",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => res.json())
      .then((proveedores) => setProveedores(proveedores));
      
  }, []);

  useEffect(() => {
    !localStorage.getItem("token") ? navigate('/login',{ replace: true }) : null
  }, []);

    const agregarProveedor = async () => {
    const res = await fetch("http://localhost:3000/proveedores", {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        proveedor: {
          nombre: proveedor.nombre,
          direccion: proveedor.direccion,
          telefono: +proveedor.telefono,
          mail: proveedor.mail,
        }
      }),
    });

    if (res.ok) {
      const proveedorNuevo = await res.json();
      setLibros([...proveedores, proveedorNuevo]);
      setVisible(false)
      limpiarForm()
    } else {
      console.log("Fallo al crear proveedor");
    }
}

    const clickProveedor = async (proveedor) => {
    if (proveedor && proveedor.id_proveedor) {
      setProveedorSeleccionado(proveedor.id_proveedor);
      setProveedor({
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        telefono: +proveedor.telefono,
        mail: proveedor.mail,
      });
      setVisible(true);
    } else {
      console.error('El proveedor no tiene un id.');
    }
  };

    const editarProveedor = async () => {
    if (window.confirm("¿Desea editar?")) {
      const res = await fetch(`http://localhost:3000/proveedores/${proveedorSeleccionado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            proveedor: {
                nombre: proveedor.nombre,
                direccion: proveedor.direccion,
                telefono: +proveedor.telefono,
                mail: proveedor.mail,
              }
        }),
      });
      if (res.ok) {
        setProveedores((proveedores) =>
          proveedores.map((item) => (item.id_proveedor === proveedorSeleccionado ? proveedor : item))
        );
        limpiarForm();
        setVisible(false);
      } else {
        alert("Error al editar el proveedor.");
      }
    }
  };
  
    const eliminarProveedor = async (proveedorId) => {
    if (window.confirm("¿Desea eliminar?")) {
      const res = await fetch(`http://localhost:3000/proveedores/${proveedorId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`},
      });

      if (res.ok) {
        setProveedores(proveedores.filter((proveedor) => proveedor.id_proveedor !== proveedorId));
      } else {
        alert("Fallo al quitar proveedor");
      }
    }
    limpiarForm()
    setVisible(false)
  };

  function limpiarForm() {
    setLibro({
      nombre: "",
      direccion: "",
      telefono: 0,
      mail: ""
    })
    setVisible(false)
  }

  return (
    <>
   <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
      <h2 className="text-3xl font-light text-center">Agregar proveedor</h2>
        <div className="flex flex-col mt-10 items-center">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                    <div id="formulario" className="bg-white p-3">
                      {/* Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="nombre">Nombre:</label>
                            <input 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                name="nombre"
                                type="text"
                                placeholder="Ingresar nombre del proveedor"
                                value={proveedor.nombre}
                                onChange={(e)=>{setProveedor({...proveedor, nombre: e.target.value})}}
                            />
                        </div>
                        {/* Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="direccion">Direccion:</label>
                            <input 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="direccion"
                                name="direccion"
                                type="text"
                                placeholder="Ingresar direccion del proveedor"
                                value={proveedor.direccion}
                                onChange={(e)=>{setProveedor({...proveedor, direccion: e.target.value})}}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="telefono">Telefono:</label>
                            <input 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                name="telefono"
                                type="int"
                                value={proveedor.telefono}
                                placeholder="Telefono"
                                onChange={(e)=>{setProveedor({...proveedor, telefono: e.target.value})}}
                                
                            />
                        </div>
                        

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="mail">Mail:</label>
                            <input 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="mail"
                                name="mail"
                                type="text"
                                value={proveedor.mail}
                                placeholder="Mail del proveedor"
                                onChange={(e)=>{setProveedor({...proveedor, mail: e.target.value})}}
                            />
                        </div>

                        {/* Botón */}
                        {visible == false && (<input
                                onClick={()=>{agregarProveedor()}}
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                value="Agregar Proveedor"
                            />)}
                        {/* /Botón */}
                        {/* Botón Editar */}
                        {visible == true && (<input
                                onClick={()=>{editarProveedor()}}
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                value="Editar Proveedor"
                            />)}
                            {/* /Botón  Editar*/}

                    </div>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-light text-center mt-20">Proveedores</h2>
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
                                    Direccion
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Telefono
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Mail
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Acciones
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody id="listado-proveedores" className="bg-white">
              {proveedores.map(({ id_proveedor, nombre, direccion, telefono, mail})=>(
                                    <tr key={id_proveedor}>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            {nombre}
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            {direccion}
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            {telefono}
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            {mail}
                                        </th>
                                        
                                        <th className="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            <span onClick={()=>{eliminarProveedor(id_proveedor)}}>🗑️</span>
                                            <span onClick={()=>{clickProveedor({ id_proveedor, nombre, direccion, telefono, mail })}}>📝</span>
                                        </th>
                                    </tr>
                                    
                                 ))}
                                
                    </tbody>
                </table>
              </div>
            </div>
          </div>

    </main>

    </>
)

};

export default Proveedores