import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TagDropdown from './TagDropdown';
import KpiDrop from './KpiDrop';
import axios from 'axios';

export default function AddKpi() {
    let [kpi, setKpi] = React.useState("");
    const data = {
        'kpi': kpi
};

let addKpi = () => {
    if(kpi != "") {
        axios.post('http://127.0.0.1:8000/api/add_kpi', data)
        .then((response) => {
            console.log(response);
        }).catch(e => {
            console.log(e.response);
        });
        setKpi("");
    }
};

  return (
    <div style={{margin: 'auto', marginTop: '20%', width:'20%', position: "absolute", top:'0%', left:'43%'}}>
      <Grid container spacing={1}>
      <Grid xs={0} sm={3.4}> 
      <Typography variant="h6" gutterBottom>
        Lisää Kpi
      </Typography>
      </Grid>
      <Grid item xs={8} />
        <Grid item xs={3}>
        <TextField
            id="kpi"
            name="kpi"
            label="Kpi"
            value={kpi}
            onChange={e => setKpi(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button onClick={addKpi} style={{minWidth:300}} variant='contained'>Lisää Kpi</Button>
        </Grid>
      </Grid>
      </div>
  );
}