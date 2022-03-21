import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function AddTag() {
  return (
    <div style={{margin: 'auto', marginTop: '10%', width:'20%', position: "absolute", top:'0%', left:'43%'}}>
      <Grid container spacing={1}>
      <Grid xs={0} sm={3.4}> 
      <Typography variant="h6" gutterBottom>
        Lisää tag
      </Typography>
      </Grid>
      <Grid item xs={8} />
        <Grid item xs={3}>
          <TextField
            id="tag"
            name="tag"
            label="Tag"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button style={{minWidth:300}} variant='contained'>Lisää tag</Button>
        </Grid>
      </Grid>
      </div>
  );
}