import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

function AddTag() {
  let [tag, setTag] = React.useState("");

  const data = {
    'tag': tag
  };

  let addTag = () => {
    if (tag != "") {
      axios.post('http://127.0.0.1:8000/api/add_tag', data)
      .then((response) => {
        console.log(response);
      }).catch(e => {
        console.log(e.response);
      });
      setTag("");
    }
  };

  return (
    <div style={{width:'500px', position: "relative", marginTop: '70px', marginLeft: '300px'}}>
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
            value={tag}
            onChange={e => setTag(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={0} sm={0}>
            <Button onClick={addTag} style={{ minWidth:300, position: 'absolute', marginTop: '11%', marginLeft: '-26%'}} variant='contained'>Lisää tag</Button>
        </Grid>
      </Grid>
      </div>
  );
}

export default AddTag;