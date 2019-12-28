import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { positions } from '@material-ui/system';
import DenseAppBar from './DenseAppBar';

import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser =>
        {
          return this.props.firebase.user(authUser.user.uid).set(
            {
              username,
              email,
            });
        })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
      
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
    <TextField id="standard-basic" label="Full Name"
             name="username"
             value={username}
             onChange={this.onChange}
             type="text"
          />
    </Box>
    <Box component="span" m={40} position="absolute" top={50}>
    <TextField id="standard-basic" label="Password"
             name="passwordOne"
                       value={passwordOne}
                       onChange={this.onChange}
                       type="password"
          />
    </Box>
          <Box component="span" m={40} position="absolute" top={100}>
           <TextField id="standard-basic" label="Confirm Password"
             name="passwordTwo"
             value={passwordTwo}
             onChange={this.onChange}
             type="password"
          />
          </Box>
    <Box component="span" m={43} position="absolute" top={150}>
      
           <Button variant="contained" color="primary" size="small" type="submit"  >
      Sign Up
    </Button>
    <Box pr = {71}>
    {error && <p>{error.message}</p>}
    </Box>
    </Box>
      </Container>
      </form>
    </React.Fragment>
    
      // <form onSubmit={this.onSubmit}>
      //    <TextField id="standard-basic" label="Full Name"
      //      name="username"
      //      value={username}
      //      onChange={this.onChange}
      //      type="text"
      //      placeholder="Full Name"
      //      autoFocus="true"
      //    />

// <TextField id="standard-basic" label="Email Address"
//             name="email"
//             value={email}
//             onChange={this.onChange}
//             type="text"
//             placeholder="Email Address"
//          />
//         <input
//           name="username"
//           value={username}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Full Name"
//         />
//         <input
//           name="email"
//           value={email}
//           onChange={this.onChange}
//           type="text"
//           placeholder="Email Address"
//         />
//         <input
//           name="passwordOne"
//           value={passwordOne}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Password"
//         />
//         <input
//           name="passwordTwo"
//           value={passwordTwo}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Confirm Password"
//         />
//          <button disabled={isInvalid} type="submit">Sign Up</button>
//         {error && <p>{error.message}</p>}
//       </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>

  
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };