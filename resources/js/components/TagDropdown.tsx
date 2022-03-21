import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

let tagsFromDB = ["test", "test2"];


export default function TagDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [chips, setChips] = React.useState<Array<string>>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    handleAddChip(event.currentTarget.textContent);
    setAnchorEl(null);
  };
  const handleAddChip = (chip : any) => {
    console.log("handleAddChip: " + chip);
    setChips(
      [...chips, chip]
    );
    console.log(chips);
};
const handleRemoveChip = (chip : any) => {
    setChips(
        chips.filter(c => c != chip)
    )
};

let chArray : any[] = [];

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
        <MenuItem key={0} defaultValue={1} onClick={handleSelect} disableRipple>
          Test
        </MenuItem>
        <MenuItem key={1} defaultValue={2} onClick={handleSelect} disableRipple>
          Test2
        </MenuItem>
      </StyledMenu>
      <Stack direction={"row"} spacing={1}>
        {chips.map((value, index) => {
            chArray.push(<Chip label={value} key={index} variant="outlined" onDelete={() => {handleRemoveChip(value)}} />)
        })}
        {chArray}
      </Stack>
    </div>
  );
}