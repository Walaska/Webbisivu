import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function AddCategory() {
  return (
    <div style={{margin:'auto', marginTop:'10%', width:'32%', position: "absolute", left:'65%'}}>
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
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button style={{minWidth:300}} variant='contained'>Lisää kategoria</Button>
        </Grid>
      </Grid>
      </div>
  );
}