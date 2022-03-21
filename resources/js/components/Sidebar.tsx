import React from "react";
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';
import { ongelmaLisaysNappi, selaaOngelma } from './View';

let viewSet : Dispatch<SetStateAction<any>>;


function Sidebar(props : any) {
    let [view, setview] = React.useState(props.view);
    viewSet = setview;
    const drawerWidth = 240;

    return(
        <div style={{position: 'relative'}}>
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{ background: 'coral' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Database
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem>
              <ListItemButton onClick={ongelmaLisaysNappi}>
                 <ListItemText primary="Lisää ongelma" /> 
              </ListItemButton>
          </ListItem>
          <ListItem>
              <ListItemButton onClick={selaaOngelma}>
                  <ListItemText primary="Selaa ongelmia" />
              </ListItemButton>
          </ListItem>
        </List>
        </Drawer>
        </div>
    );
}

export default Sidebar;