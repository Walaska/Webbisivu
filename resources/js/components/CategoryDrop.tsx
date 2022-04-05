import React from "react";
import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, Typography } from "@mui/material";
import axios from "axios";

function CategoryDrop(props : any) {
    const [test, setTest] = React.useState<number>(0); 
    const [open, setOpen] = React.useState<boolean>(false);
    const [categories, setCategories] = React.useState<Array<string>>([]);
    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log("setKategoria: " + event.currentTarget.textContent);
        props.setKategoria(event.currentTarget.textContent);
        props.setCatId(event.currentTarget.textContent);
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

    if(test == 0) {
      axios.get('http://127.0.0.1:8000/api/get_all_categories')
      .then((response) => {
        console.log(response);
        setTest(1)
        for (let c = 0; c < response.data.categories.length; c++) {
            console.log(categories.includes(response.data.categories[c].nimi));
            setCategories(prevCategories =>([...prevCategories, response.data.categories[c].nimi])
            );
        }
      }).catch(e => {
        console.log(e.response);
      });
    }
    testArray();
    return(     
        <FormControl style={{minWidth:400}}>
        <InputLabel id="demo-controlled-open-select-label">Kategoria</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {arr.map((value, index) => {
            return(
              <MenuItem key={index} onClick={handleChange}>{value}</MenuItem>
            )
          })}
        </Select>
        <Typography variant="h6">{props.kategoria}</Typography>
      </FormControl>
        
    );
}

export default CategoryDrop;