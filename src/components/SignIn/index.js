import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { positions } from '@material-ui/system';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <React.Fragment>
      <CssBaseline />
      <form onSubmit={this.onSubmit}>
      <Container maxWidth="md">
      <Box component="span" m={40} position="absolute" top={-50}>
      <TextField  
      id="standard-basic" label="Email Address"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            autoComplete="email"
         />
            </Box>
<Box component="span" m={40} position="absolute" top={0}>
<TextField  
      id="standard-basic" label="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
         />
         </Box>
    </Container>
    <Box component="span" m={43} position="absolute" top={50} right={3} left = {510}>
    <Button variant="contained" color="primary" size="small" type="submit" >
      Sign In
    </Button>
    </Box>
    <Box component="span" position="absolute" bottom={400} right={1} left = {820}>
    <SignUpLink />
    {error && <p>{error.message}</p>}
    </Box>
    </form>
    </React.Fragment>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };