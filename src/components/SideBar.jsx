import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { Title } from '@mui/icons-material';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import adiogent from '../asset/adiogent.png'



const drawerWidth = 200
;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);



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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideBar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate= useNavigate()

  const handle_Navigate =(path)=>{

    console.log("navigae=>");
    console.log("path=>",path);
 
  navigate(path)

  }

  const sidebar_navi=[
    {side_icon: <Inventory2TwoToneIcon/>  , title: "Products",path:"/products", counting:"1"},
    {side_icon: <EventNoteRoundedIcon/>  , title: "Order", path:'/order', counting:"2"},
    {side_icon: <CategoryRoundedIcon/>  , title: "Category", path:'/categories',  counting:"3"},
    {side_icon: <ImageRoundedIcon/>  , title: "Banner", path:'/banners',  counting:"4"},
    {side_icon: <AccountCircleRoundedIcon/>  , title: "Customer", path:'/customers',  counting:"5"},
    {side_icon: <SupervisorAccountRoundedIcon/>  , title: "Admin", path:'/admin',  counting:"6"},
    // {side_icon: <LogoutIcon/>  , title: "Log Out"},
    // {side_icon: <SettingsIcon/>  , title: "Setting"},

  ]


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   position="fixed" open={open}>
        <div className={open && "header_content"} >
        <div className='flex_header_icon_box' >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          
        </Toolbar>
         <div>
         <Typography variant="h6" noWrap component="div">
            {props.headerTitle}
           
          </Typography>
         </div>
        </div>
      
      <div className='header_welcome_content' >
      <Typography variant="h6" noWrap component="div">
      👋  Hi Adiogent App Admin, Welcome Back 
          </Typography>
      </div>
         </div>

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

          <img className='logo' src={adiogent} alt="logo" />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>  
        <Divider />
        <List>
          {sidebar_navi?.map((text, index) => (
            <ListItem key={index} disablePadding>
              <  ListItemButton onClick={()=>handle_Navigate(text.path)} >
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {text.side_icon}
                 
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        
        </List>
        <Divider />
        <List>
        
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary={"Setting"} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary={"Log out"} />
              </ListItemButton>
            </ListItem>
         
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <h1>{props.comp}</h1>
        
    
      </Main>
    </Box>
  );
}