import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const drawerWidth = 240;

const SideNavbar = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
      };
    
      const logoutStyle = {
        position: 'absolute',
        bottom: '16px',
        left: '16px',
      };

  return (
    <Drawer
      variant="permanent"
      style={{
        width: drawerWidth,
      }}
      PaperProps={{
        style: {
          width: drawerWidth,
        },
      }}
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/dashboard" style={linkStyle}>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/addExam" style={linkStyle}>
          <ListItemIcon>
            <PlaylistAddIcon/>
          </ListItemIcon>
          <ListItemText primary="Add Exam" />
        </ListItem>
        <ListItem button component={Link} to="/enroll-exam" style={linkStyle}>
          <ListItemIcon>
            <LockOpenIcon/>
          </ListItemIcon>
          <ListItemText primary="Enroll Exam" />
        </ListItem>
      </List>
      <Divider />
      <Button color="secondary" style={logoutStyle} component={Link} to="/signin" onClick={()=>{localStorage.setItem('token',JSON.stringify(null))}}>
        Logout
      </Button>
    </Drawer>
  );
};

export default SideNavbar;
