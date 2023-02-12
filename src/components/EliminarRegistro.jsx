import React from 'react'
import useBotones from '../hooks/useBotones'

import { Dialog } from 'primereact/dialog'

const EliminarRegistro = ({ registro, ocultarEliminar, mostrarEliminar, eliminarRegistro }) => {
  //--> Botones de accion
  const [botonesEliminar] = useBotones(
    "No", "pi pi-times", "p-button-text", ocultarEliminar,
    "Si", "pi pi-check", "p-button-text", eliminarRegistro
  )

  //----------------------| Valor que regresara |----------------------
  return (
    <Dialog
      visible={mostrarEliminar} style={{ width: '450px' }} header="Confirmar" modal footer={botonesEliminar} onHide={ocultarEliminar}
    >
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {registro && <span>¿Estas seguro de eliminar a <b>{registro.nombre}</b>?</span>}
      </div>
    </Dialog>
  )
}

export default EliminarRegistro
