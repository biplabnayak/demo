import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Message from '../../components/Message/Message';
import { Player } from 'video-react';

class Reader extends Component {
  state = {
    messages: null,
    loading: true,
    showVideo: false
  };
  
  componentDidMount () {
    axios.get('http://52.32.34.54:8080/message')
    .then( res => {
      this.setState({ loading: false, messages: res.data });      
    })
    .catch(err => {
      console.log('something went wrong.....', err);      
    })

    setTimeout(() => {
      this.setState({
        showVideo: true
      })
    }, 5000);
  }

  render () {
    console.log(this.state.messages);
    return (
      <div style={{display: 'flex', flexDirection: 'row', padding: '1em'}}>
        <div style={{flex: 1}}>
          {
            this.state.loading ?
            <Spinner />
            : <Message message={this.state.messages.message}/>
          }
        </div>
        <div style={{flex: 1}}>
        {
          this.state.showVideo ?
          <Player
          playsInline
          autoPlay={true}
          poster="/assets/poster.png"
          src="http://52.32.34.54:8081/0wrIRgCm.mp4"
          />: null
        }

        </div>
    
      </div>
    )
  }
}

export default Reader;