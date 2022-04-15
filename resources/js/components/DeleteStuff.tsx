import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TagDropdown from './TagDropdown';
import DeleteKpi from './DeleteKpi';
import DeleteCategory from './DeleteCategory';
import DeleteTag from './DeleteTag';
import axios from 'axios';

export default function Delete() {
    let [kpi, setKpi] = React.useState("");
    let [deleteItems, setItems] = React.useState<Array<string>>([]);
    let [table, setTable] = React.useState<Array<string>>([]);

let handleItems = (item : string, t : string) => {
    if (item != " " && !deleteItems.includes(item)) {
        setItems(
            prevItems=>([...prevItems, item])
        );
        setTable(
            prevTables=>([...prevTables, t])
        );
    }
    console.log(deleteItems);
    console.log(table);
};

let Delete = () => {
    let data = {
        'table': table,
        'items': deleteItems
    }
    axios.post('http://127.0.0.1:8000/api/delete', data)
    .then((response) => {
        console.log(response);
    }).catch(e => {
        console.log(e.response);
    });
    setItems([""]);
    setTable([""]);
};

  return (
    <div style={{margin: 'auto', marginTop: '20%', width:'20%', position: "absolute", top:'0%', left:'16%'}}>
      <Grid container spacing={1}>
      <Grid xs={0} sm={3.4}> 
      <Typography variant="h6" gutterBottom >
        Poista
      </Typography>
      </Grid>
      <Grid item xs={8} />
        <Grid item xs={3}>
        <div style={{margin: 'auto', marginTop: '10%', width:'20%', position: "absolute", top:'0%', left:'-5%'}}>
            <DeleteKpi handleItems={handleItems}/>
            <DeleteCategory handleItems={handleItems}/>
            <DeleteTag handleItems={handleItems}/>
        </div>
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button onClick={Delete} style={{minWidth:300, marginLeft: '18%', marginTop: '47%'}} variant='contained'>Poista</Button>
        </Grid>
      </Grid>
      <Grid>
      <Typography>
        {deleteItems.map((value, index) => {
            return(value + " ");
        })}
        </Typography>
      </Grid>
      </div>
  );
}