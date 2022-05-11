
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '@mui/material/Button';



import {useState}  from 'react';



const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function PersistentDrawerLeft(props) {

  const theme = useTheme();
  const [open, setOpen] = useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
 
    <>
      
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            style={{marginRight: "2%"}}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Adminstration
          </Typography>
        
          <Button color="inherit" style={{marginLeft: '77%'}}
          title="ausloggen"
          onClick={() =>{props.handleLogout(); handleDrawerClose();}}
          ><LogoutIcon sx={{mr: 1}}/></Button>
       
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
        variant="persistent"
        anchor="left"
        open={open}
      >

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
        <Divider />


        <List>
          <ListItem button key={"freigeben"} style={{margin: "10%"}}>
               
            <FactCheckIcon sx={{mr  :1}}/>
            <ListItemText primary={"Freigeben"} 
            onClick={() =>{ 
              props.setDisplayTable(true); 
              handleDrawerClose();
              props.setDrawerNumber(1);
            }}/>
          </ListItem>

          <ListItem button key={"keywords"} style={{margin: "10%"}}>
            <ListItemText primary={"Schlagworte"} 
            onClick={() =>{
              props.setDisplayTable(false); 
              handleDrawerClose();
              props.setDrawerNumber(2);
            
            }}/>
          </ListItem>
          <Divider />

          <ListItem button key={"address"} style={{margin: "10%"}}>
            <ListItemText primary={"Institute"} 
            onClick={() =>{
              props.setDisplayTable(false); 
              handleDrawerClose();
              props.setDrawerNumber(3);
            
            }}/>
          </ListItem>
          <Divider />


          <ListItem button key={"BestehendeBenutzer"} style={{margin: "10%"}}>
            <ListItemText primary={"Bestehende Benutzer"}
             onClick={() =>{ 
               handleDrawerClose();
               props.setDrawerNumber(4);
              }}
             />
          </ListItem>
          <Divider />

          <ListItem button key={"Ausloggen"} style={{margin: "10%"}}>
            <LogoutIcon sx={{mr: 1}}/>
            <ListItemText primary={"Ausloggen"} onClick={() =>{props.handleLogout(); handleDrawerClose();}}/>
          </ListItem>
          <Divider />

        </List>

        <Divider />


      </Drawer>

    </>
     
  );
}
