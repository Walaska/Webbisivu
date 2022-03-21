import React from "react";
import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

function CategoryDrop() {
    const [kategoria, setKategoria] = React.useState<string | HTMLElement>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log("setKategoria: " + event.currentTarget);
        setKategoria(event.currentTarget);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
        <FormControl style={{minWidth:400}}>
        <InputLabel id="demo-controlled-open-select-label">Kategoria</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={kategoria}
          onClick={handleChange}
        >
          <MenuItem value={10}>TestKategoria</MenuItem>
          <MenuItem value={20}>TestKategoria2</MenuItem>
          <MenuItem value={30}>TestKategoria3</MenuItem>
        </Select>
      </FormControl>
        </div>
    );
}

export default CategoryDrop;