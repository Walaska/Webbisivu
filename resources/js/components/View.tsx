import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Sidebar from './Sidebar';
import AddPMain from './AddProblemMain';
import SearchP from './SearchProblems';
import axios from 'axios';
let test = 0;

let viewSet : Dispatch<SetStateAction<any>>;

export function ongelmaLisaysNappi() {
  viewSet("o");
}

export function selaaOngelma() {
  viewSet("s");
}

function View() {
  let [rows, setRows] = React.useState<Array<any>>([]);
  let [tags, setTags] = React.useState<Array<any>>([]);

  if (test == 0) {
    axios.get('http://127.0.0.1:8000/api/get_grid_data')
    .then((response) => {
      console.log("Rows data: ");
      console.log(response.data.griddata);
      setRows(response.data.griddata);
      console.log(rows);
    }).catch(e => {
      console.log(e.response);
    });
    axios.get('http://127.0.0.1:8000/api/get_grid_tags')
    .then((response) => {
      console.log("Tags data: ");
      console.log(response.data.tag);
      setTags(response.data.tag)
      console.log(tags);
    }).catch(e => {
      console.log(e.response);
    });
    test = 1;
}
    let [view, setview] = React.useState("o");
    viewSet = setview;

    const updateView = (e : any) => {
        setview(e);
    };
    
    let ret;
  
    if (view === "o") {
      ret = <div><Sidebar /><AddPMain /></div>
    }
    else if(view === "s") {
      ret = <div><Sidebar /><SearchP rows={rows} tags={tags} /></div>
    }
    else {
        ret = <div><Sidebar /></div>
    }
    return ret;
}

export default View;