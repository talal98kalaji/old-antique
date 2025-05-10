// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      sx={open ? openedMixin(theme) : closedMixin(theme)}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component="a" href="/dashboard">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/dashboard/users">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </MuiDrawer>
  );
}
