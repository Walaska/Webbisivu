import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TagDropdown from './TagDropdown';
import CategoryDrop from './CategoryDrop';

export default function AddProblem() {
  return (
    <div style={{margin:'auto', marginTop:'10%', width:'32%', position: "absolute", left:'15%'}}>
      <Grid container spacing={1}>
        <Grid item xs={0} sm={0}>   
      <Typography variant="h6">
        Lisää ongelma
      </Typography>
      </Grid>
      <Grid item xs={8} />
        <Grid item xs={6}>
          <TextField
            required
            id="ongelma"
            name="ongelma"
            label="Ongelma"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2}>
        <TagDropdown />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="ratkaisu"
            name="ratkaisu"
            label="Ratkaisu"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="kpi"
            name="kpi"
            label="KPI"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
        <CategoryDrop />
        </Grid>
        <Grid item xs={5}>
            <Button style={{minWidth:300, position:'relative', top: '22%', left: '0%'}} variant='contained'>Lisää ongelma</Button>
        </Grid>
      </Grid>
      </div>
  );
}