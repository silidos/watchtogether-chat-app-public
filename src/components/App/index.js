


import React, { Component } from 'react';
import { BrowserRouter as Router,
Route,} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }


  componentWillUnmount() {
    this.listener();
  }

  render() 
  {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
    <Router>
      <Navigation authUser={this.state.authUser} />
    <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </Router>
    </AuthUserContext.Provider>
    );
  }
}
export default withAuthentication(App);