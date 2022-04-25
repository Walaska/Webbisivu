import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

function AddCategory() {
  let [kategoria, setKategoria] = React.useState("");

  const data = {
    'kategoria': kategoria
  };

  let addKategoria = () => {
    if(kategoria != "") {
      axios.post('http://127.0.0.1:8000/api/add_category', data)
      .then((response) => {
        console.log(response);
      }).catch(e => {
        console.log(e.response);
      });
      setKategoria("");
    }
  };

  return (
    <div style={{margin: 'auto', width:'500px', position: "relative", marginTop: '80px', marginLeft: '300px'}}>
      <Grid container spacing={1}>
      <Grid xs={3} sm={3}> 
      <Typography variant="h6" gutterBottom>
        Lisää kategoria
      </Typography>
      </Grid>
      <Grid item xs={8} />
        <Grid item xs={8}>
          <TextField
            id="kategoria"
            name="kategoria"
            label="Kategoria"
            value={kategoria}
            onChange={e => setKategoria(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button onClick={addKategoria} style={{minWidth:300}} variant='contained'>Lisää kategoria</Button>
        </Grid>
      </Grid>
      </div>
  );
}

export default AddCategory;