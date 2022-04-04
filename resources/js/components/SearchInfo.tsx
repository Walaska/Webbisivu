import React from "react";
import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



const columns: GridColDef[] = [
    {
      field: 'ratkaisu',
      headerName: 'Ratkaisu',
      width: 450,
      editable: false,
    },
    {
      field: 'KPI',
      headerName: 'KPI',
      width: 150,
      editable: false,
    },
  ];
  
  const rows = [
    { id: 10, ratkaisu: 'tähän tulee ratkaisu', KPI: 'tähän tulee KPI' }
  ];

export function SearchInfo()
{
    return (
      
        <div style={{
            
          height: '400px', 
          width: '25%',
          textAlign: 'center',
          position: 'absolute',
          marginLeft: '30%',
          marginTop: '-15.6%'
          }}>
          
          <Paper/>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
        />
          <Paper elevation={1} />
        </div>
      );
}