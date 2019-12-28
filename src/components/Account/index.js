  
import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';


import 'typeface-roboto';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { positions } from '@material-ui/system';
import FileUploader from "react-firebase-file-uploader";
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    fontSize: 64,
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
let theme = createMuiTheme({
  root: {
    flexGrow: 1,
  },
  typography: {
    h1: {
      fontSize: 50,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 25,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: 30,
      position: 'relative'
    }
  },
});
theme.typography.h3 = {
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}
class Account extends Component {
  static contextType = AuthUserContext
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      loading: true,
      uid: '',
      avatarURL: '',
      isUploading: false,
      progress: 0
    };
  }
  async componentDidMount()
  {
    const user = this.context
    console.log(await this.onListenForUser(user.uid));
    var hello = await this.onListenForUser(user.uid);
    var avatar = await this.checkForAvatar(user.uid);
    this.state.avatarURL = avatar;
    console.log(avatar);
    this.state.username = hello;
   this.setState({loading: false});
  }

  onStyle = () =>
  {
    var styles = useStyles();
    return styles;
  }
  onListenForUser = (uid) =>
  {
    this.setState({ loading: true });

    var ref = this.props.firebase.user(uid);
    this.state.uid = uid;
    var user = ref.once("value")
    .then(function(snapshot){
    var newPost = snapshot.val();
     return (newPost.username);
  })
  return (user);
  };

  checkForAvatar = (uid) =>
  {
    var ref = this.props.firebase.user(uid);
    var avatar = ref.once("value")
    .then(function(snapshot)
    {
      var newPost = snapshot.val();
      return (newPost.avatarURL);
    })
    return (avatar);
  }
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    const user = this.context;
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    this.props.firebase.storageImage(user.uid)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarURL: url });
        var postDate = 
      {
        avatarURL: url
      }
      console.log()
      this.props.firebase.user(user.uid).update(postDate);
      });
  };

  
 render() {
  const {loading, username, email} = this.state;
return (
<AuthUserContext.Consumer>
      {authUser => (
        <div>
          {!loading && (
            
            <div>
              
              <div className={theme.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={theme.paper}>
       <Typography color="textPrimary" theme = {theme} variant = "h3">
         Username: {username}
       </Typography></Paper>
       </Grid>
       <Grid item xs={6}>
          <Paper className={theme.paper}>
          <Typography color="textPrimary" theme = {theme} variant = "h3">
         Email: {authUser.email}
       </Typography></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={theme.paper}>
          <Typography color="textPrimary" theme = {theme} variant = "h3">
         Profile Picture:
       </Typography></Paper>
       <form>
       {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
       {this.state.avatarURL && <img src={this.state.avatarURL} />}
       <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
    Select your avatar
    <FileUploader
      hidden
      accept="image/*"
      randomizeFilename
      storageRef={this.props.firebase.storageImage(authUser.uid)}
      onUploadStart={this.handleUploadStart}
      onUploadError={this.handleUploadError}
      onUploadSuccess={this.handleUploadSuccess}
      onProgress={this.handleProgress}
    />
    
  </label>   
  </form>
        </Grid> 
        </Grid>
        
    </div>
       
       </div>
          )}

          {loading && <div>Loading = {authUser.uid} ...</div>
          }
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}
}

const AccountBase = compose(
  withFirebase,
)(Account)
export default AccountBase;