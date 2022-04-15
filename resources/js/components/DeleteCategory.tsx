import React from "react";
import { useState } from 'react';
import {  MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import axios from 'axios';

function DeleteCategory(props : any) {
    const [test, setTest] = React.useState<number>(0); 
    const [open, setOpen] = React.useState<boolean>(false);
    const [categories, setCategories] = React.useState<Array<string>>([]);
    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        props.handleItems(event.currentTarget.textContent, "category");
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let arr : any[] = [];
    const testArray = () => {
      categories.map((value, index) => {
        if(!arr.includes(value)) {
          arr.push(value);
        }
      });
    }
    if (test == 0) {
      axios.get('http://127.0.0.1:8000/api/get_all_categories')
      .then((response) => {
        setTest(1);
        for (let c = 0; c < response.data.categories.length; c++) {
          setCategories(prevCategories =>([...prevCategories, response.data.categories[c].nimi])
          );
        }
        testArray();
      }).catch(e => {
        console.log(e.response);
      });
    }
  
    return(
      
        <FormControl style={{width:200}}>
        <InputLabel id="demo-controlled-open-select-label">Poista Kategoria</InputLabel>
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

export default DeleteCategory;