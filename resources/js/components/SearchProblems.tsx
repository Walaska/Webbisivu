import * as React from 'react';
import { DataGrid, GridCellEditCommitParams, GridColDef, GridEditRowsModel, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField, Grid, Button } from '@mui/material';
import axios from 'axios';

const columns: GridColDef[] = [
  {
    field: 'ongelma',
    headerName: 'Ongelma',
    width: 450,
    editable: true,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 150,
    editable: true,
  },
  {
    field: 'ratkaisu',
    headerName: 'Ratkaisu',
    width: 300,
    editable: true,
  },
  {
    field: 'kpi',
    headerName: 'KPI',
    width: 150,
    editable: true,
  },
  {
    field: 'kategoriat',
    headerName: 'Kategoria',
    width: 300,
    editable: true,
  }
];

function update(data : object) {
  axios.post('http://127.0.0.1:8000/api/update', data)
  .then((response) => {
    console.log(response);
  }).catch(e => {
    console.log(e.response);
  });
}

let testi : string[] = ["Tag", "tag2"];

//{id: i, ongelma: response.data.griddata[i].problems, }
function SearchP(props : any) {
  const [test, setTest] = React.useState<number>(0);
  let [haku, setHaku] = React.useState<string>("");
  let [rivit, setRivit] = React.useState<Array<Object>>([]);
  let [vanhatTagit, setVanhatTagit] = React.useState<Array<any>>([]);
  let search = () => {
    axios.get('http://127.0.0.1:8000/api/search/' + haku)
    .then((response) => {
      console.log(response.data);

    }).catch(e => {
      console.log(e.response);
    });
  }
if(test == 0) {
  if(props.rows.length > 0 && props.tags.length > 0 ) {
    for (let y = 0; y < props.rows.length; y++) {
      let tagit : string[] = [];
      for (let z = 0; z < props.tags.length; z++) {
        if(props.rows[y].pId == props.tags[z].ongelmaid) {
          tagit.push(props.tags[z].nimi);
        }
      }
      setRivit(prevRivit =>([...prevRivit, {id: y, ongelma: props.rows[y].ongelma, tags: tagit, ratkaisu: props.rows[y].ratkaisu, kpi: props.rows[y].kpi, kategoriat: props.rows[y].kategoriat}]));
      setVanhatTagit(
        prevTags =>([...prevTags, tagit])
      );
    }
  }
  setTest(1);
}

const handleEdit = React.useCallback(({id, field, value}: GridCellEditCommitParams) => {
  if (value == null || value == undefined) value = "";
  if (field == "ongelma") {
    console.log(props.rows[id].ongelma);
    if(value != props.rows[id].ongelma) {
      let data = {
        'table': 'ongelma',
        'ongelmaValue': value,
        'vanhaData': props.rows[id].ongelma
      };
      update(data);
    }
  }
  else if (field == "ratkaisu") {
    console.log(props.rows[id].ratkaisu);
    if(value != props.rows[id].ratkaisu) {
      let data = {
        'table': 'ratkaisu',
        'ratkaisuValue': value,
        'vanhaData': props.rows[id].ratkaisu
      };
      update(data);
    }
  }
  else if (field == "tags") {
  /*  let arrToPush = [];
    let tagString = value.toString().split(',');
    console.log("-------------");
    console.log(vanhatTagit[parseInt(id.toString())][0]);
    if (vanhatTagit[parseInt(id.toString())].length < tagString.length) {
      for(let x = 0; x < tagString.length; x++) {
        if(!tagString.includes(vanhatTagit[parseInt(id.toString())][x])) {
          let taki = vanhatTagit[parseInt(id.toString())][x];
          console.log("taki on: " + taki);
          arrToPush.push(taki);
        }
      }
    }
    else {
      for(let x = 0; x < vanhatTagit[parseInt(id.toString())].length; x++) {
        if(!tagString.includes(vanhatTagit[parseInt(id.toString())][x])) {
          let taki = vanhatTagit[parseInt(id.toString())][x];
          console.log("taki on: " + taki);
          arrToPush.push(taki);
        }
      }
    }
    console.log("Moro!!!!!");
    console.log(arrToPush); */

    console.log(props.tags[id].nimi);
    let tagArray = value.toString().split(',');
    console.log(value);
    let data = {
      'table': 'tag',
      'tagValue': tagArray,
      'vanhaData': vanhatTagit[parseInt(id.toString())]
    };
    console.log(vanhatTagit[parseInt(id.toString())]);
      update(data);
  }
  else if(field == "kpi") {
    console.log(props.rows[id].kpi);
    if(value != props.rows[id].kpi) {
      let data = {
        'table': 'kpi',
        'kpiValue': value,
        'vanhaData': props.rows[id].kpi
      };
      update(data);
    }
  }
  else if(field == "kategoriat") {
    console.log(props.rows[id].kategoriat);
    if(value != props.rows[id].kategoriat) {
      let data = {
        'table': 'kategoriat',
        'kategoriatValue': value,
        'vanhaData': props.rows[id].kategoriat
      };
      update(data);
    }
  }
}, [rivit]);

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
        <Button onClick={search} variant='contained'>Hae</Button>
        </Grid>
        </Grid>
      <DataGrid
        rows={rivit}
        columns={columns}
        pageSize={5}
        onCellEditCommit={handleEdit}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

export default SearchP;