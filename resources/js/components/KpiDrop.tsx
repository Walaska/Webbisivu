import React from "react";
import { useState } from 'react';
import {  MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";

function KpiDrop() {
    const [kpi, setKpi] = React.useState<string | HTMLElement>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        console.log("setKpi: " + event.currentTarget);
        setKpi(event.currentTarget);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
 
    return(
      
        <FormControl style={{width:200}}>
        <InputLabel id="demo-controlled-open-select-label">Kpi</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={kpi}
          onClick={handleChange}
        >
          <MenuItem value={10}>testiKpi</MenuItem>
          <MenuItem value={20}>TestiKpi2</MenuItem>
          <MenuItem value={30}>TestiKpi3</MenuItem>
        </Select>
      </FormControl>
    );
}

export default KpiDrop;