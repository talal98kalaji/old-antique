import React, { useState } from "react";
import { Box, Button, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Sidebar from "./sidebar.jsx";
import { useNavigate } from "react-router-dom";
import "../../assets/style.css"


const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate('')
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
          <Button color="secondary" onClick={()=>{navigate('\login')}}>login </Button>
        </Toolbar>
      </MuiAppBar>

      <MuiDrawer
        variant="permanent"
        open={open}
        className={`drawer ${open ? "drawerOpen" : "drawerClosed"}`}
        classes={{
          paper: `drawerPaper ${open ? "drawerPaperOpen" : "drawerPaperClosed"}`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Sidebar />
      </MuiDrawer>

       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
