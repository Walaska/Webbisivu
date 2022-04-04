import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { elementAcceptingRef } from '@mui/utils';
import { render } from 'react-dom';
import { Grid, Select } from '@mui/material';
let test = 0;
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function TagDropdown(props : any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let [tags, setTags] = React.useState<Array<string>>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    handleAddChip(event.currentTarget.textContent);
    props.handleTags(event.currentTarget.textContent);
    setAnchorEl(null);
  };
  const handleAddChip = (chip : any) => {
    console.log("handleAddChip: " + chip);
    props.setChips(
      [...props.chips, chip]
    );
    console.log(props.chips);
};
const handleRemoveChip = (chip : any) => {
    props.setChips(
        props.chips.filter((c: any) => c != chip)
    )
};
let chArray : any[] = [];
if(test == 0) {
  axios.get('http://127.0.0.1:8000/api/get_all_tags')
  .then((response) => {
    test = 1;
    for (let c = 0; c < response.data.tags.length; c++) {
      setTags(prevTags =>([...prevTags, response.data.tags[c].nimi])
      );
    }
  }).catch(e => {
    console.log(e.response);
  });
}

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
      >
        Tagit
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
       {tags.map((value, index) => {
         return(
         <MenuItem key={index} onClick={handleSelect}>{value}</MenuItem>
         )
       })}
      </StyledMenu>
      <Stack direction={"row"} spacing={1}>
        {props.chips.map((value : any, index : any) => {
            chArray.push(<Chip label={value} key={index} variant="outlined" onDelete={() => {handleRemoveChip(value)}} />)
        })}
        {chArray}
      </Stack>
    </div>
  );
}

export default TagDropdown;