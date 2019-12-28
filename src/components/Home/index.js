import React from 'react';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { AuthUserContext } from '../Session';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const Home = ({ authUser }) => (
  <div>{authUser ? <HomeAuth /> : <HomeNonAuth />}</div>
);
const HomeAuth = () => (
  <div>
    <Typography variant="h1" align = 'center'>
    Home
    </Typography>
    <Typography align = 'center'>
    Navigate to the Account page to customize your profile or <a href="http://localhost:3000/admin">Chatroom</a> to start watching and chatting with friends.
    </Typography>
    <Typography align = 'center'>
    If you're not logged in, sign in or sign up to start your session.
    </Typography>
  </div>
);

const HomeNonAuth = () => (
  <div>
    <Typography variant="h1" align = 'center'>
    Home
    </Typography>
    <Typography align = 'center'>
    Sign in or sign up to start your session.
    </Typography>
  </div>
);
const Home2 = () => (
  <AuthUserContext.Consumer>
    {
      authUser => (
<div><Home authUser = {authUser}></Home></div>
      )
    }
</AuthUserContext.Consumer>
)

const Home3 = compose(
  withFirebase,
)(Home2);
export default Home3;