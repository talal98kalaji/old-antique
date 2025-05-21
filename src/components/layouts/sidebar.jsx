import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CategoryIcon from "@mui/icons-material/Category";

export default function Sidebar() {
  return (
    <>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/dashboard">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/dashboard/users">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={RouterLink} to="/dashboard/products">
          <ListItemIcon><CheckroomIcon /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={RouterLink} to="/dashboard/categories">
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
      </List>
    </>
  );
}
