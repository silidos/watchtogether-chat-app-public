import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import './Player.css';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class ResponsivePlayer2 extends Component {
  constructor(props) {
        super(props);
      this.state = {
        source: '',
        newSource: 'qwe',
        player: '',
        playing: false,
        duration: 0,
        seeking: false,
        played: 0.5,
        progress: false,
      }
        this.play = this.play.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.Player = this.props.firebase.db.ref().child('chatrooms').child('global');
        this.Resource = this.props.firebase.db.ref().child('Player');
        this.handleNewPlayer = snap => {
          console.log(snap.child("source").val());
          if(snap.val()) this.setState({ 
            source: snap.child("source").val(),
            playing: snap.child("playing").val(),
            duration: snap.child("duration").val(),
            played: snap.child("played").val(),
            progress: snap.child("progress").val() })
            if(this.state.progress)
            {
              this.state.player.seekTo(this.state.played);
              this.setState({ 
              progress: false
              })
            }
        }
      }
      
      handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
      }
  
      handlePlay = () => {
        console.log('onPlay');
        this.setState({ playing: true });
        this.Resource.set({
          playing: this.state.playing,
          source: this.state.source,
          duration: this.state.duration,
          played: this.state.played,
          progress: true
        });
      }

      handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false });
        this.Resource.set({
          playing: this.state.playing,
          source: this.state.source,
          duration: this.state.duration,
          played: this.state.played

        });
      }

      handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
      }
      
      handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
      }

      handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
        this.setState(
          {
            played: state.played,
            progress: true
          })
        this.Resource.set({
          playing: this.state.playing,
          source: this.state.source,
          duration: this.state.duration,
          played: this.state.played

        });
      }

      componentDidMount() {
        this.Resource.on('value', this.handleNewPlayer);
      }
      componentWillUnmount() {
        // unsubscribe
        this.Resource.off('value', this.handleNewPlayer);
      }
play(url) {   
 
    console.log(this.state.player.props.muted);
    this.setState({
      source: 'https://www.youtube.com/watch?v=foiD5iCkq08'
      
    }); 
    console.log(this.state.player);

}
handleValueChange(e) {
  this.Player.push({
    sender: 'URL',
    message: 'new URL is: ' + this.state.newSource,
    newSource: this.state.newSource
  });
  this.Resource.set({
    source: this.state.newSource,
    playing: false,
    duration: 0,
    played: 0
  });
  this.setState({
    source: this.state.newSource
  });
  e.preventDefault();
  this.setState({ newSource: "" });
}
onTextChange = event => {
  console.log(event.target.value);
  this.setState({ [event.target.name]: event.target.value });
};

// currently handling syncing through buffer, videos will be exactly 1:1 with
// this method but the video will stutter until both players are synced
Buffer = () => 
{
  this.setState({progress: true})
}
  render () {
    const {
      newSource
    } = this.state;
    return (
      
      <div className='player-wrapper'>
        <ReactPlayer
       ref={player => {
                    this.state.player = player;
                  }}
          className='react-player'
          url={this.state.source}
          controls
          playing ={this.state.playing}
          width = "1000px"
          height = "720px"
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onDuration={this.handleDuration}
          onSeek={e => console.log('onSeek', e)}
          onBuffer={this.Buffer}
          onProgress={this.handleProgress}
        />
      <div className = 'buttons'>
      <Button onClick={this.handlePlayPause}>
            Link #2
          </Button>
      </div>
      
      <form onSubmit={this.handleValueChange}>
      <input value = {newSource} 
      onChange={this.onTextChange} 
      type="text" 
      name="newSource">
        </input>
      </form>
      <th>playing</th>
                <td>{this.state.playing ? 'true' : 'false'}</td>
                 <th>Played</th>
                <td><progress max={1} value={this.state.played} /></td>
      </div>
      
    )
  }
}
const ResponsivePlayer = compose(
  withFirebase,
)(ResponsivePlayer2);
export default ResponsivePlayer;