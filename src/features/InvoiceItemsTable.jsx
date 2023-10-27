// Add ag-grid table to store invoice items details

import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DeleteRowButtonRenderer = (props) => {
  const onCellDeleteClick = () => {
    if (props.onCellDeleteClick) {
      props.onCellDeleteClick(props.node);
    }
  };

  return (
    <button className="btn btn-error" onClick={onCellDeleteClick}>
      Delete
    </button>
  );
};

const InvoiceItemsTable = ({ onRowDataChange }) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([{}]);

  // Column headers and their definitions
  const columnDefs = [
    {
      headerName: "Ref. Nr.",
      valueGetter: "node.rowIndex + 1",
      width: 100,
    },
    {
      headerName: "Item Name",
      field: "itemName",
      editable: true,
      width: 150,
    },
    {
      headerName: "Item Description",
      field: "itemDescription",
      editable: true,
      width: 300,
      wrapText: true,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      editable: true,
      width: 100,
    },
    {
      headerName: "Price",
      field: "price",
      editable: true,
      width: 150,
    },
    {
      headerName: "Total",
      field: "total",
      valueGetter: "data.quantity * data.price",
      width: 150,
    },
    {
      headerName: "Delete",
      cellRenderer: DeleteRowButtonRenderer,
      cellRendererParams: {
        onCellDeleteClick: (node) => {
          handleDeleteRow(node);
        },
      },
      width: 150
    },

  ];

  // Default columns functionalities apply to all cols in the grid
  const defaultColDef = {
    sortable: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
  };

  // add empty row to the grid
  const addEmptyRow = () => {
    const newRow = {};
    setRowData([...rowData, newRow]);
  };

  // handle row deletion
  const handleDeleteRow = (params) => {
    // return everything exept for the deleted row
    const updatedRowData = rowData.filter((row) => row !== params.data);
    setRowData(updatedRowData);
  };

  return (
    <div>
      {/* Invoice title and add row button start*/}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl">Invoice Items Table</h1>
        <button onClick={() => addEmptyRow()} className="btn btn-primary">
          Add Row
        </button>
      </div>
      {/* Invoice title and add row button end*/}

      {/* Ag Grid table start*/}
      <div
        className="ag-theme-alpine-dark"
        style={{ height: 500, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          ref={gridRef}
          animateRows={true}
          onCellValueChanged={(params) => {
            onRowDataChange(rowData)
          }}
        />
      </div>
      {/* Ag Grid table end*/}
    </div>
  );
};

export default InvoiceItemsTable;
