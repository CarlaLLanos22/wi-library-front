function Libros() {

  return (
    <>
      <main class="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
          <h2 class="text-3xl font-light text-center">Nuevo Libro</h2>
            <div class="flex flex-col mt-10 items-center">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
                    <div class=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                        <form id="formulario" class="bg-white p-3">
                          {/* Input */}
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="Campo 1">Campo 1</label>
                                <input 
                                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Campo 1"
                                    name="Campo 1"
                                    type="text"
                                    placeholder="Campo 1 Libro"
                                />
                            </div>
                            {/* Input */}
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Campo 2</label>
                                <input 
                                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Libro"
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="telefono">Campo 3</label>
                                <input 
                                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    placeholder="Campo 3 Libro"
                                />
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="Campo 4">Campo 4</label>
                                <input 
                                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Campo 4"
                                    name="Campo 4"
                                    type="text"
                                    placeholder="Campo 4 Libro"
                                />
                            </div>

                            {/* Botón */}
                            <input
                                type="submit"
                                class="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold"
                                value="Agregar Libro"
                            />
                            {/* /Botón */}
                        </form>
                    </div>
                </div>
            </div>
          <h2 class="text-3xl font-light text-center mt-20">Listado de Libros</h2>
          <div class="flex flex-col mt-10">
              <div class="py-2 overflow-x-auto">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                   <table class="min-w-full">
                        <thead class="bg-gray-100 ">
                            <tr>
                                <th class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 1 Libro
                                </th>
                                <th class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 3
                                </th>
                                <th class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Campo 4
                                </th>
                                <th class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody id="listado-Libros" class="bg-white"></tbody>
                    </table>
                  </div>
                </div>
              </div>

        </main>
    </>
  )
}

export default Libros
