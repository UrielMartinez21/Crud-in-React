import React from 'react'
import useBotones from '../hooks/useBotones'

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'

const Crear = ({ registro, submitted, onInputChange, mostrarCrear, ocultarCrear, guardarRegistro, onInputNumberChange }) => {
  //--> Botones
  const [botonesCrear] = useBotones(
    "Cancelar", "pi pi-times", "p-button-text", ocultarCrear,
    "Guardar", "pi pi-check", "p-button-text", guardarRegistro
  )

  //----------------------| Valor que regresara |----------------------
  return (
    <Dialog
      visible={mostrarCrear}
      style={{ width: '450px' }}
      header="Detalles del registro"
      modal
      className="p-fluid"
      footer={botonesCrear}
      onHide={ocultarCrear}
    >
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <InputText
          id="nombre" value={registro.nombre} onChange={(e) => onInputChange(e, 'nombre')}
          required autoFocus className={classNames({ 'p-invalid': submitted && !registro.name })} />
        {submitted && !registro.nombre && <small className="p-error">El nombre es requerido.</small>}
      </div>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <InputText
          id="nombre"
          value={registro.apellido} onChange={(e) => onInputChange(e, 'apellido')}
          required autoFocus className={classNames({ 'p-invalid': submitted && !registro.name })} />
      </div>
      <div className="field">
        <label htmlFor="edad">Edad</label>
        <InputNumber
          id="edad" value={registro.edad} onValueChange={(e) => onInputNumberChange(e, 'edad')} />
      </div>
      <div className="field">
        <label htmlFor="estado">Estado</label>
        <InputText
          id="estado"
          value={registro.estado} onChange={(e) => onInputChange(e, 'estado')}
          required autoFocus className={classNames({ 'p-invalid': submitted && !registro.name })} />
      </div>
    </Dialog>
  )
}

export default Crear
