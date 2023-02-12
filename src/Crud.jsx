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

  //--> Informacion
  const [registro, setRegistro] = useState(usuarioVacio);
  const [registros, setRegistros] = useState(null);
  //--> Modales
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarEliminarVarios, setMostrarEliminarVarios] = useState(false);

  const [seleccionarRegistros, setSeleccionarRegistros] = useState(null);   // Arreglo de registros para eliminar
  const [submitted, setSubmitted] = useState(false);                        // Validar envio
  const [filtroGlobal, setFiltroGlobal] = useState(null);                   // Buscador general

  //--> Funciones de transicion
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setRegistros(data)
  }, [])
  //--> Modal para crear registro
  const crearRegistro = () => {
    setRegistro(usuarioVacio)
    setSubmitted(false);
    setMostrarCrear(true);
  }
  //--> Oculta modal de crear
  const ocultarCrear = () => {
    setSubmitted(false);
    setMostrarCrear(false);
    setRegistro(usuarioVacio)
  }
  //--> Oculta modal de eliminar registro
  const ocultarEliminar = () => {
    setMostrarEliminar(false);
  }
  //--> Oculta modal de eliminar registros
  const ocultarEliminarVarios = () => {
    setMostrarEliminarVarios(false);
  }
  //--> Funcion para guardar registro
  const guardarRegistro = () => {
    console.log(registro)
    setSubmitted(true);

    if (registro.name) {
      let _registros = [...registros];
      let _registro = { ...registro };
      if (registro.id) {
        const index = findIndexById(registro.id);

        _registros[index] = _registro;
        toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registro Actualizado', life: 3000 });
      }
      else {
        _registro.id = createId();
        _registro.image = 'product-placeholder.svg';
        _registros.push(_registro);
        toast.current.show({ severity: 'success', summary: 'Correcto!', detail: 'Registro Creado', life: 3000 });
      }

      setRegistros(_registros);
      setMostrarCrear(false);
      setRegistro(usuarioVacio);
    }
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
    console.log(seleccionarRegistros)
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
    <div className="datatable-crud-demo">
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
        registro={registro}
        submitted={submitted}
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