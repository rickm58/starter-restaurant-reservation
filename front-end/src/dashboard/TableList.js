import React from "react";


function TablesList({ table, handleFinish }) {
  
  return (
    <div className="card col-sm-8 col-md-7 col-lg-6 m-auto">
      <div className="card-body">
        <h5 className="card-title">Table Name: {table.table_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">ID: {table.table_id}</h6>
        <p className="card-text">Capacity: {table.capacity}</p>
        {table.reservation_id 
          ? <p className="text-danger" data-table-id-status={table.table_id}>
              Occupied
            </p>
          : <p className="text-success" data-table-id-status={table.table_id}>
              Free
            </p>
        }
        {table.reservation_id &&
          <>
            <button className="btn btn-outline-primary" 
              data-table-id-finish={table.table_id}
              onClick={() => handleFinish(table.table_id)}
            >
              Finish
            </button>
            <button className="btn btn-outline-secondary" >Cancel</button>
          </>
        }
      </div>
    </div>
  )
} 


export default TablesList;