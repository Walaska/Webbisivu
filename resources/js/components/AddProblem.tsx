import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TagDropdown from './TagDropdown';
import CategoryDrop from './CategoryDrop';
import axios from 'axios';
import KpiDrop from './KpiDrop';

function AddProblem() {
  let [ongelma, setOngelma] = React.useState("");
  let [ratkaisu, setRatkaisu] = React.useState<string>("");
  let [kpi, setKpi] = React.useState<string>("");
  let [kategoriaId, setKategoriaId] = React.useState<number>();
  let [tags, setTags] = React.useState<Array<string>>([]);
  let [tagids, setTagid] = React.useState<Array<number>>([]);
  let [chips, setChips] = React.useState<Array<string>>([]);
  let [kategoria, setKategoria] = React.useState<string>("");

         /*<TextField
            id="kpi"
            name="kpi"
            label="KPI"
            fullWidth
            variant="standard"
            onChange={e => setKpi(e.currentTarget.value)}
            value={kpi}
          />*/

  const data = {
    '_token': '{{ csrf_token() }}',
    'ongelma': ongelma,
    'ratkaisu': ratkaisu,
    'kpi': kpi,
    'kategoriaid': kategoriaId,
    'tagid': tagids,
  };

  let setCatId = (value : string) => {
    console.log("Kategoria vaihtui! : " + value)
    axios.get('http://127.0.0.1:8000/api/get_category/' + value)
    .then((response) => {
      console.log("KategoriaID: ");
      console.log(response.data.kategoriaId.id);
      setKategoriaId(response.data.kategoriaId.id);
    }).catch(e => {
      console.log(e.response);
    });
  };

  const handleTags = (tag : any) => {
    setTags(
      [...tags, tag]
    );
    setTagId(tag);
  };

  let setTagId = (value : any) => {
    console.log("Get data value:" + value);
    axios.get('http://127.0.0.1:8000/api/get_tag/' + value)
    .then((response) => {
      console.log("tagID: " + response.data.tagId.id);
      setTagid(
        [...tagids, response.data.tagId.id]
      );
    }).catch(e => {
      console.log(e.response);
    });
  };
  
  let addData = () => {
    console.log("Tags length: " + tags.length + " | TagIDS lentgh: " + tagids.length);
    if(tags.length == tagids.length) {
      console.log(data);
      axios.post('http://127.0.0.1:8000/api/add', data).then((response) => {
        console.log(response);
      }).catch(e => {
        console.log(e.response);
      });
    }
    setOngelma("");
    setRatkaisu("");
    setKpi("");
    setChips([]);
    setKategoria("");
  };
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
            onChange={e => setOngelma(e.currentTarget.value)}
            value={ongelma}
          />
        </Grid>
        <Grid item xs={2}>
        <TagDropdown handleTags={handleTags} chips={chips} setChips={setChips}/>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="ratkaisu"
            name="ratkaisu"
            label="Ratkaisu"
            fullWidth
            variant="standard"
            onChange={e => setRatkaisu(e.currentTarget.value)}
            value={ratkaisu}
          />
        </Grid>
        <Grid item xs={2}>
          <KpiDrop />
        </Grid>
        <Grid item xs={0} sm={0}>
        <CategoryDrop setCatId={setCatId} kategoria={kategoria} setKategoria={setKategoria}/>
        </Grid>
        <Grid item xs={5}>
            <Button onClick={addData} style={{minWidth:300, position:'relative', top: '22%', left: '0%'}} variant='contained'>Lisää ongelma</Button>
        </Grid>
      </Grid>
      </div>
  );
}

export default AddProblem;