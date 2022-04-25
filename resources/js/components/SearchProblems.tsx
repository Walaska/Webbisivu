import * as React from 'react';
import { DataGrid, GridCellEditCommitParams, GridColDef, GridEditRowsModel, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField, Grid, Button } from '@mui/material';
import axios from 'axios';
import { serializeStyles } from '@emotion/serialize';

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
function SearchP(props : any) {
  const [test, setTest] = React.useState<number>(0);
 // let [haku, setHaku] = React.useState<string>("");
  let [rivit, setRivit] = React.useState<Array<Object>>([]);
  let [uusiRivi, setUusiRivi] = React.useState<Array<Object>>([]);
  let [vanhatRivit, setVanhatRivit] = React.useState<Array<Object>>([]);
  let [vanhatTagit, setVanhatTagit] = React.useState<Array<any>>([]);


  let search = (haku : string) => {
    console.log("Haloo");
    setRivit(() => [...[]]);
    vanhatRivit.filter((rivi: any) => {
      if (haku === "") {
        setRivit(() => [...[]]);
        vanhatRivit.map((val, index) => {
          setRivit(e =>([...e, val]));
        });
      }
      else{
        if (rivi.tags != null && rivi.tags.join().toLowerCase().includes(haku.toLowerCase())) {
          return rivi;
        }
        if (rivi.ongelma != null && rivi.ongelma.toLowerCase().includes(haku.toLowerCase())) {
          return rivi;
        }
        if (rivi.ratkaisu != null && rivi.ratkaisu.toLowerCase().includes(haku.toLowerCase())) {
          return rivi;
        }
        if(rivi.kpi != null && rivi.kpi.toLowerCase().includes(haku.toLowerCase())) {
          return rivi;
        }
        if (rivi.kategoria != null && rivi.kategoria.toLowerCase().includes(haku.toLowerCase())) {
          return rivi;
        } 
      }
    }).map((val, index) => {
      console.log(val);
      setRivit(e => ([...e, val]));
    });
    console.log(uusiRivi);
  }
console.log("ASDASDS");
console.log(props.rows);
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
      setVanhatRivit(prevVanhaRivi =>([...prevVanhaRivi, {id: y, ongelma: props.rows[y].ongelma, tags: tagit, ratkaisu: props.rows[y].ratkaisu, kpi: props.rows[y].kpi, kategoriat: props.rows[y].kategoriat}]));
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
    console.log(props.rows);
    console.log(props.rows[id].ongelma);
    console.log(id);
    if(value != props.rows[id].ongelma) {
      let data = {
        'table': 'ongelma',
        'ongelmaValue': value,
        'vanhaData': props.rows[id].ongelma,
        'ongelmaId': props.rows[id].pID
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
        'vanhaData': props.rows[id].ratkaisu,
        'ongelmaId': props.rows[id].pID
      };
      update(data);
    }
  }
  else if (field == "tags") {
    console.log(props.tags[id].nimi);
    let tagArray = value.toString().split(',');
    console.log(value);
    let data = {
      'table': 'tag',
      'id': id,
      'tagValue': tagArray,
      'vanhaData': vanhatTagit[parseInt(id.toString())],
      'ongelmaId': props.rows[id].pID
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
        'vanhaData': props.rows[id].kpi,
        'ongelmaId': props.rows[id].pID
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
        'vanhaData': props.rows[id].kategoriat,
        'ongelmaId': props.rows[id].pID
      };
      update(data);
    }
  }
}, [rivit]);

  return (
    <div style={{ height: 400, width: '1400px', marginTop:'150px', marginLeft:'300px', position: 'absolute' }}>
        <Grid style={{padding:'20px'}}>
        <Grid item xs={3} style={{width: '1100px'}}>
          <TextField
            id="haku"
            name="haku"
            label="Hae..."
            onChange={e => search(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
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