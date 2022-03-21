import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField, Grid, Button } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'ongelma',
    headerName: 'Ongelma',
    width: 450,
    editable: false,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 150,
    editable: false,
  },
];

const rows = [
  { id: 1, ongelma: 'Test', tags: 'B2B, B2C' },
  { id: 2, ongelma: 'Test2', tags: 'B2B' },
  { id: 3, ongelma: 'Test3', tags: null },
  { id: 4, ongelma: 'Test4', tags: '' },
  { id: 5, ongelma: 'Test5', tags: 'B2C' },
  { id: 6, ongelma: 'Test6', tags: null },
  { id: 7, ongelma: 'Test7', tags: 'B2B' },
  { id: 8, ongelma: 'Test8', tags: 'B2C' },
  { id: 9, ongelma: 'Test9', tags: 'B2B' },
];

export default function SearchP() {
  return (
    <div style={{ height: 400, width: '50%', marginTop:'10%', marginLeft:'15%' }}>
        <Grid style={{padding:'20px'}}>
        <Grid item xs={3} style={{width: '40%'}}>
          <TextField
            id="haku"
            name="haku"
            label="Hae..."
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid>
        <Button variant='contained'>Hae</Button>
        </Grid>
        </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}