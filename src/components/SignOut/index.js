import React from 'react';
import { withFirebase } from '../Firebase';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.h1,
    width: '100%',
    maxWidth: 500,
    fontSize: 24,
    htmlFontSize: 24,
    color: 'white',
    spacing: theme.spacing(5),
    textTransform: "none"
  },
}));

function SignOutButton({ firebase }) {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" size="small" onClick={firebase.doSignOut} >
    <Typography color="textPrimary" className= {classes.root}>
            Sign Out
          </Typography>
          </Button>
  )
};
export default withFirebase(SignOutButton);