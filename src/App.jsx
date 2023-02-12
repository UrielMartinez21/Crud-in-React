import React from 'react'
import Crud from './Crud';
import { Service } from './services/Service';
import "primereact/resources/themes/lara-light-indigo/theme.css";   // theme
import "primereact/resources/primereact.min.css";                   // core
import "primeicons/primeicons.css";                                 // icons


const App = () => {
  const Catalogo = new Service
  const Produccion = new Service

  Catalogo.baseUrl = "hola"

  // console.log(Produccion.baseUrl)
  // console.log(Catalogo.baseUrl)

  //----------------------| Valor que regresara |----------------------
  return (
    <div className='container'>
      <Crud />
    </div>
  )
}

export default App
