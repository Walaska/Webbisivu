import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Sidebar from './Sidebar';
import AddPMain from './AddProblemMain';
import SearchP from './SearchProblems';

let viewSet : Dispatch<SetStateAction<any>>;

export function ongelmaLisaysNappi() {
  viewSet("o");
}

export function selaaOngelma() {
  viewSet("s");
}

function View() {
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
      ret = <div><Sidebar /><SearchP /></div>
    }
    else {
        ret = <div><Sidebar /></div>
    }
    return ret;
}

export default View;