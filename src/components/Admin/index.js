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
import { AuthUserContext } from '../Session';
import PlayerControlExample from '../Player';
import './Message.css';
import ResponsivePlayer from '../Player';

class AdminBase2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      nickname: "",
      email: "",
      msg: "",
      messages: {},
      player: '',
      previous: false
    };

  this.chatRoom = this.props.firebase.db.ref().child('chatrooms').child('global');
    this.handleNewMessages = snap => {
      console.log(snap.val());
      // if not null then update state
      if (snap.val()) 
      this.setState(
        { messages: snap.val() 
      });
    };
  }
  componentDidMount() {
    // subscribe
    this.chatRoom.on('value', this.handleNewMessages);
  }
  componentWillUnmount() {
    // unsubscribe
    this.chatRoom.off('value', this.handleNewMessages);
  }
  handleNameChange = e => this.setState({ nickname: e.target.value });
  handleEmailChange = e => this.setState({ email: e.target.value });
  handleClick = e => {
    // register the nickname
    this.props.firebase.db.ref().child('nicknames').push({
      nickname: this.state.nickname,
      email: this.state.email,
    });
    
    this.setState({ joined: true });
    
  };

  onSubmit = event => 
{
  var ref = this.props.firebase.db.ref().child('chatrooms').child('global');
  ref.remove();
  event.preventDefault();
  this.setState({ messages: {} })
}

  handleMsgChange = e => this.setState({ msg: e.target.value });
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.chatRoom.push({
        sender: this.state.nickname,
        msg: this.state.msg,
      });
      this.setState({ msg: "" });
    }
  };
  render() {
    return (
      <AuthUserContext.Consumer>
        
        {authUser => ( 
        <div className="messenger" >
        {!this.state.joined ? (
          <div className= "messenger2" >
          <div className= "header2">
            <div className="left-items"></div>
            <div className= "header2">
              <Typography color="textPrimary" variant="h1" align = 'center'>
            Choose your chatroom
          </Typography>
          <div className="joinForm">
            <Button variant="text" color="inherit" size="small" className= "toolbarbutton" onClick={this.handleClick}  >
    <Typography color="textPrimary" className= "toolbartext">
            Global Chat 
          </Typography>
          </Button>
          </div>
          </div>
          </div>
          </div>
        ) : (
          this.state.nickname = authUser.email,
          <div className="messenger" >
            <div className="player">
            <ResponsivePlayer></ResponsivePlayer>
              </div>
            <div className="scrollable sidebar">
               <div className="toolbar" >
               <div className="left-items"></div>
               <form onSubmit={this.onSubmit}>
               <Button variant="text" color="inherit" size="small" className= "toolbarbutton"type="submit"  >
    <Typography color="textPrimary" className= "toolbartext">
            Clear Chat
          </Typography>
          </Button>
          </form>
               </div>
              <Container maxWidth="sm">
              <div className="message">
                {Object.keys(this.state.messages).map(message => {
                  if (this.state.messages[message]["sender"] === this.state.nickname)
                    return (
                      <div className="message4">
                        <span id="me">{this.state.messages[message]["sender"]} :</span><br />
                        {this.state.messages[message]["msg"]}
                      </div>
                    );
                    else if (this.state.messages[message]["sender"] === 'URL')
                    {
                    return (
                      <div className="automessage">
                        {'The video has been changed'}
                      </div>
                    );
                    }
                  else
                    return (
                      <div className="message2">
                        <span id="sender" className= "message .bubble-container .bubble">{this.state.messages[message]["sender"]} :</span><br />
                        {this.state.messages[message]["msg"]}
                      </div>
                    );
                })}
                   </div>
              
              <div className = "compose">
              <input className="compose-input" placeholder="Type a message, @name" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown} value={this.state.msg} /><br />
              </div>
              
              </Container> </div>
                </div>
          )}
      </div>
        )}
      </AuthUserContext.Consumer>
      
    );
  }
}
const AdminBase = compose(
  withFirebase,
)(AdminBase2);
export default AdminBase;