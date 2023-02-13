import React from 'react'

import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'

const Tabla = ({
  dt,
  registros,
  importarCSV,
  exportarCSV,
  filtroGlobal,
  crearRegistro,
  editarRegistro,
  setFiltroGlobal,
  seleccionarRegistros,
  setSeleccionarRegistros,
  confirmarEliminarVarios,
  confirmarEliminarRegistro,
}) => {
  //--> Crear o eliminar
  const botonesIzquierda = () => {
    return (
      <>
        <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={crearRegistro} />
        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmarEliminarVarios} disabled={!seleccionarRegistros || !seleccionarRegistros.length} />
      </>
    )
  }

  //--> Exportar o importar
  const botonesDerecha = () => {
    return (
      <>
        <Button label="Importar" icon="pi pi-upload" className="p-button-help" onClick={importarCSV} />
        <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportarCSV} />
      </>
    )
  }

  //--> Editar o eliminar
  const accionRegistro = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarRegistro(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmarEliminarRegistro(rowData)} />
      </React.Fragment>
    );
  }

  //--> Buscador general
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Catálogo</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setFiltroGlobal(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  )

  //----------------------| Valor que regresara |----------------------
  return (
    <div className="card">
      <Toolbar className="mb-4" left={botonesIzquierda} right={botonesDerecha}></Toolbar>

      <DataTable ref={dt} value={registros} selection={seleccionarRegistros} onSelectionChange={(e) => setSeleccionarRegistros(e.value)}
        showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
        globalFilter={filtroGlobal} header={header} responsiveLayout="scroll"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false} />
        <Column field="nombre" header="Nombre" sortable style={{ minWidth: '12rem' }} />
        <Column field="apellido" header="Apellido" sortable style={{ minWidth: '16rem' }} />
        <Column field="edad" header="Edad" sortable style={{ minWidth: '10rem' }} />
        <Column field="estado" header="Estado" sortable style={{ minWidth: '10rem' }} />
        <Column body={accionRegistro} exportable={false} style={{ minWidth: '8rem' }} />
      </DataTable>
    </div>
  )
}

export default Tabla
