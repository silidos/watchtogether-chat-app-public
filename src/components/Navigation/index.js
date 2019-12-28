import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as ROUTES from '../../constants/routes';
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SignOutButton from '../SignOut';
import MenuIcon from '@material-ui/icons/Menu';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';

import { AuthUserContext } from '../Session';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    fontSize: 32,
    htmlFontSize: 24,
    color: 'white',
    spacing: theme.spacing(5)
  },
  bar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function NavigationAuth()
{ 
  const classes = useStyles();
  return (
  <div >
  <div className={classes.bar}>
          <Box position = "absolute" top ={0} left={50} pr={5}>
          <Link to={ROUTES.HOME}><Typography color="textPrimary" className= {classes.root}>
            Home
          </Typography></Link>
          </Box>
          <Box position = "absolute" top ={0} left={150}>
          <Link to={ROUTES.ACCOUNT}><Typography color="textPrimary" className= {classes.root}>
            Account
          </Typography></Link>
          </Box>
          <Box position = "absolute" top ={0} left={285}>
          <Link to={ROUTES.ADMIN}><Typography color="textPrimary" className= {classes.root}>
            Chatroom
          </Typography></Link>
          </Box>
          </div>
    </div>
  )
}
function NavigationNonAuth()
{ 
  const classes = useStyles();
  return (
  <div >
  <div className={classes.bar}>
  <Box  left={100} top ={5} pr={5}>
            <Link to={ROUTES.SIGN_IN}><Typography color="textPrimary" className= {classes.root}>
            Sign in
          </Typography></Link>
          </Box>
    <Box position = "absolute" top ={12} left={200}>
          <Link to={ROUTES.HOME}><Typography color="textPrimary" className= {classes.root}>
            Home
          </Typography></Link>
          </Box>
          <Box position = "absolute" top ={12} left={300} width= '100%'>
          <Link to={ROUTES.SIGN_UP}><Typography color="textPrimary" className= {classes.root}>
            Sign Up
          </Typography></Link>
          </Box>
          </div>
    </div>
  )
}
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

function Navigation2({ authUser }) {
  const classes = useStyles();

  return (
    <div >
       <div className={classes.bar}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
          </IconButton>
          <Box position="absolute" right={30}>
          <SignOutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
    </div>
  )
}
export default Navigation2;
