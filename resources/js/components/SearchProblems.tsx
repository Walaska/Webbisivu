import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField, Grid, Button } from '@mui/material';
import axios from 'axios';
let test = 0;

/*
{ id: 1, ongelma: 'Test', tags: 'B2B, B2C', ratkaisu: 'RatkaisuEsim', kpi: '1' },
{ id: 2, ongelma: 'Test2', tags: 'B2B', ratkaisu: 'RatkaisuEsim2', kpi: '2'  },
{ id: 3, ongelma: 'Test3', tags: null , ratkaisu: 'RatkaisuEsim3', kpi: '3' },
{ id: 4, ongelma: 'Test4', tags: '', ratkaisu: 'RatkaisuEsim4', kpi: '4'  },
{ id: 5, ongelma: 'Test5', tags: 'B2C', ratkaisu: '', kpi: ''  },
{ id: 6, ongelma: 'Test6', tags: null, ratkaisu: '', kpi: ''  },
{ id: 7, ongelma: 'Test7', tags: 'B2B', ratkaisu: 'RatkaisuEsim5', kpi: '6'  },
{ id: 8, ongelma: 'Test8', tags: 'B2C', ratkaisu: '', kpi: ''  },
{ id: 9, ongelma: 'Test9', tags: 'B2B', ratkaisu: 'RatkaisuEsim6', kpi: '7'  }, */

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
  {
    field: 'ratkaisu',
    headerName: 'Ratkaisu',
    width: 300,
    editable: false,
  },
  {
    field: 'kpi',
    headerName: 'KPI',
    width: 150,
    editable: false,
  }
];

let testi : string[] = ["Tag", "tag2"];

//{id: i, ongelma: response.data.griddata[i].problems, }
function SearchP() {
  let [rows, setRows] = React.useState<Array<any>>([]);
  if (test == 0) {
    axios.get('http://127.0.0.1:8000/api/get_grid_data')
    .then((response) => {
      test = 1;
      console.log("Rows data: ");
      console.log(response.data);
      for(let i = 0; i < response.data.griddata.length; i++) {
        
      }
    }).catch(e => {
      console.log(e.response);
    });
  }

  let search = () => {
    axios.get('http://127.0.0.1:8000/api/search')
    .then((response) => {
      console.log(response.data);

    }).catch(e => {
      console.log(e.response);
    });
  }

  let [haku, setHaku] = React.useState<string>("");

  return (
    <div style={{ height: 400, width: '80%', marginTop:'10%', marginLeft:'15%' }}>
        <Grid style={{padding:'20px'}}>
        <Grid item xs={3} style={{width: '40%'}}>
          <TextField
            id="haku"
            name="haku"
            label="Hae..."
            onChange={e => setHaku(e.currentTarget.value)}
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

export default SearchP;