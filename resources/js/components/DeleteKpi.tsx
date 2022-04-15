import React from "react";
import { useState } from 'react';
import {  MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import axios from 'axios';

function DeleteKpi(props : any) {
    const [test, setTest] = React.useState<number>(0); 
    const [open, setOpen] = React.useState<boolean>(false);
    const [kpis, setKpis] = React.useState<Array<string>>([]);
    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        props.handleItems(event.currentTarget.textContent, "kpi");
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let arr : any[] = [];
    const testArray = () => {
        kpis.map((value, index) => {
          if(!arr.includes(value)) {
            arr.push(value);
          }
        });
      }


    if (test == 0) {
      axios.get('http://127.0.0.1:8000/api/get_all_kpis')
      .then((response) => {
        setTest(1);
        for (let c = 0; c < response.data.kpis.length; c++) {
          setKpis(prevKpis =>([...prevKpis, response.data.kpis[c].name])
          );
        }
      }).catch(e => {
        console.log(e.response);
      });
    }

    testArray();
    return(
      
        <FormControl style={{width:200}}>
        <InputLabel id="demo-controlled-open-select-label">Poista Kpi</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.kpi}
          onClick={handleChange}
        >
          {arr.map((value, index) => {
            return(
              <MenuItem key={index} onClick={handleChange}>{value}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    );
}

export default DeleteKpi;