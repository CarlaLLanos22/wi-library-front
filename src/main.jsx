import React from 'react'
import ReactDOM from 'react-dom/client'
import Libros from './componentes/libros/Libros.jsx'
import BarraLateral from './componentes/barraLateral/BarraLateral.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div class="md:flex min-h-screen md:align-top">
      <BarraLateral></BarraLateral>
      <Libros></Libros>
    </div>
  </React.StrictMode>,
)
