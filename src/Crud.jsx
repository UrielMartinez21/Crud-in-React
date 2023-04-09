import React, { useState, useEffect, useRef } from 'react';
import Tabla from './components/Tabla';
import Crear from './components/Crear';
import { Toast } from 'primereact/toast';
import { registroVacio } from './data/registroVacio';
import { informacion } from './data/informacion';
import EliminarRegistro from './components/EliminarRegistro';
import EliminarRegistros from './components/EliminarRegistros';

const Crud = () => {
  const usuarioVacio = registroVacio
  const data = informacion

  //--> Manipulacion de registros
  const [registro, setRegistro] = useState(usuarioVacio)
  const [registros, setRegistros] = useState(null)
  const [seleccionarRegistros, setSeleccionarRegistros] = useState(null)
  //--> Modales
  const [mostrarCrear, setMostrarCrear] = useState(false)
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarEliminarVarios, setMostrarEliminarVarios] = useState(false);

  const [envio, setEnvio] = useState(true)                          // Validar envio
  const [filtroGlobal, setFiltroGlobal] = useState(null);           // Buscador general

  //--> Funciones de transicion
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setRegistros(data)
  }, [])
  //--> Modal para crear registro
  const crearRegistro = () => {
    setRegistro(usuarioVacio)
    setEnvio(true);
    setMostrarCrear(true);
  }
  //--> Oculta modal de crear
  const ocultarCrear = () => {
    setEnvio(true);
    setMostrarCrear(false);
    setRegistro(usuarioVacio)
  }
  //--> Oculta modal de eliminar registro
  const ocultarEliminar = () => { setMostrarEliminar(false) }
  //--> Oculta modal de eliminar registros
  const ocultarEliminarVarios = () => { setMostrarEliminarVarios(false) }
  //--> Funcion para guardar registro
  const guardarRegistro = () => {
    //--> Validar campos
    if (Object.values(registro).includes('')) {
      setEnvio(false)
      setTimeout(() => {
        setEnvio(true)
      }, 2000);
      return
    }
    //--> Actualizar registro
    if (registro.nombre) {
      const arregloModificado = registros.map((regis) => regis.id === registro.id ? registro : regis)
      setRegistros(arregloModificado)
      toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registro Actualizado', life: 3000 });
    }
    //--> Crear registros
    else {
      const arregloNuevo = [...registros, registro]
      setRegistros(arregloNuevo)
      toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registro Creado', life: 3000 });
    }

    setMostrarCrear(false);
    setRegistro(usuarioVacio);
  }
  //------------------| Edicion de registro |------------------
  //--> Modal de crear con informacion de registro
  const editarRegistro = (registro) => {
    setRegistro({ ...registro });
    setMostrarCrear(true);
  }
  //------------------| Eliminar registro |------------------
  //--> Modal para eliminar registro
  const confirmarEliminarRegistro = (registro) => {
    setRegistro(registro);
    setMostrarEliminar(true);
  }
  //--> Funcion para eliminar registro
  const eliminarRegistro = () => {
    let _registros = registros.filter(val => val.id !== registro.id);
    setRegistros(_registros);
    setMostrarEliminar(false);
    setRegistro(registroVacio);
    toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registro Eliminado', life: 3000 });
  }
  //------------------| Funciones de exportar e importar |------------------
  //--> Funcion para importar
  const importarCSV = () => {
    console.log("Importar")
  }
  //--> Funcion para exportar
  const exportarCSV = () => {
    console.log("Exportar")
  }
  //------------------| Eliminar varios registros |------------------
  //--> Mostrar modal para eliminar registros
  const confirmarEliminarVarios = () => {
    // console.log(seleccionarRegistros)
    setMostrarEliminarVarios(true)
  }
  //--> Funcion para eliminar registros
  const eliminarVariosRegistros = () => {
    let _registros = registros.filter(val => !seleccionarRegistros.includes(val));
    setRegistros(_registros);
    setMostrarEliminarVarios(false);
    setSeleccionarRegistros(null);
    toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registros Eliminados', life: 3000 });
  }

  // const onCategoryChange = (e) => {
  //   let _registro = { ...registro };
  //   _registro['category'] = e.value;
  //   setRegistro(_registro);
  // }

  //------------------| Funciones de edicion |------------------
  //--> Editar texto
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;

    setRegistro(_registro);
  }
  //--> Editar numeros
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _registro = { ...registro };
    _registro[`${name}`] = val;

    setRegistro(_registro);
  }
  //------------------| Valor que se mostrara |------------------
  return (
    <div className='card'>
      <Toast ref={toast} />

      <Tabla
        dt={dt}
        registros={registros}
        importarCSV={importarCSV}
        exportarCSV={exportarCSV}
        filtroGlobal={filtroGlobal}
        crearRegistro={crearRegistro}
        editarRegistro={editarRegistro}
        setFiltroGlobal={setFiltroGlobal}
        seleccionarRegistros={seleccionarRegistros}
        setSeleccionarRegistros={setSeleccionarRegistros}
        confirmarEliminarVarios={confirmarEliminarVarios}
        confirmarEliminarRegistro={confirmarEliminarRegistro} />

      <Crear
        envio={envio}
        registro={registro}
        mostrarCrear={mostrarCrear}
        ocultarCrear={ocultarCrear}
        onInputChange={onInputChange}
        guardarRegistro={guardarRegistro}
        onInputNumberChange={onInputNumberChange} />

      <EliminarRegistro
        registro={registro}
        ocultarEliminar={ocultarEliminar}
        mostrarEliminar={mostrarEliminar}
        eliminarRegistro={eliminarRegistro} />

      <EliminarRegistros
        registro={registro}
        mostrarEliminarVarios={mostrarEliminarVarios}
        ocultarEliminarVarios={ocultarEliminarVarios}
        eliminarVariosRegistros={eliminarVariosRegistros} />

    </div>
  );
}

export default Crud