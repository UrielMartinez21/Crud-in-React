import React from 'react'
import useBotones from '../hooks/useBotones'

import { Dialog } from 'primereact/dialog'

const EliminarRegistros = ({ registro, mostrarEliminarVarios, ocultarEliminarVarios, eliminarVariosRegistros }) => {
  const [botonesEliminarVarios] = useBotones(
    "No", "pi pi-times", "p-button-text", ocultarEliminarVarios,
    "Si", "pi pi-check", "p-button-text", eliminarVariosRegistros
  )

  //----------------------| Valor que regresara |----------------------
  return (
    <Dialog
      visible={mostrarEliminarVarios}
      style={{ width: '450px' }}
      header="Confirm"
      modal
      footer={botonesEliminarVarios}
      onHide={ocultarEliminarVarios}
    >
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {registro && <span>Estas seguro de eliminar los registros seleccionados?</span>}
      </div>
    </Dialog>
  )
}

export default EliminarRegistros
