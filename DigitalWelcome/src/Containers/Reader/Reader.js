import React, { Component } from 'react';
//import axios from 'axios';
//import Spinner from '../../components/UI/Spinner/Spinner';
import Video from '../../components/Video';
//import Message from '../../components/Message/Message';
import classes from './Reader.css';
import BrandLogo from '../../assets/images/Logo.svg';
import MumbaiPostage from '../../assets/images/BottomLeft-Stamps.svg';
import Marvels from '../../assets/images/got-marvel-stamps.svg';


class Reader extends Component {
  constructor() {
    super();
    this.refVideo2 = React.createRef();
    this.refVideo1 = React.createRef();
    this.pollForWelcomeMessage = this.pollForWelcomeMessage.bind(this);
  }
  state = {
    messages: null,
    loading: true,
    showVideo: false,
    showImage: true,
    retryCount: 0    
  };

  *pollForWelcomeMessage() {
    while (true) {
      yield fetch('http://52.32.34.54:8080/message', {
        method: 'get'
      }).then(function (d) {
        const json = d.json();
        return json;
      });
    }
  }

  runPolling = (generator) => {
    if (!generator) {
      generator = this.pollForWelcomeMessage();
    }  
    const p = generator.next();
    p.value.then((d) => {
      if (!d || d.message.length <= 0) {
        this.runPolling(generator);
      }
      else {
        this.setState({ loading: false, messages: d });
        setTimeout(() => {
          this.setState({
            showVideo: true,
          });
          this.refVideo1.current.play()                            
        }, 5000);
      }
    });
  }

  componentDidMount () {
    this.runPolling();   
  }  

  render () {
    return (
      <div className={classes.Postcard}>
        <div className={classes.Content}>
          <div className={classes.FlexRow}>
            <div>
              <div><img src={BrandLogo} alt="Logo" /></div>
              <div>{!this.state.loading ? this.state.messages.message : null}</div>
              <div><img className={classes.Stamp} src={MumbaiPostage} alt="Mumbai Postage" /></div>
            </div>
          </div>
          <div className={classes.FlexColumn}>
            <div><img className={classes.Marvel} src={Marvels} alt="Marvels" /></div>
            <div>
              {
              this.state.showVideo ?
                <Video src={"http://52.32.34.54:8081/0wrIRgCm.mp4 "}
                  autoplay={'autoplay'}
                  ref={this.refVideo1}
                  onVideoEnded={this.onVideoEnded} />
                : null
              } </div>
          </div>
        </div>       
      </div>
    )
  }
}

export default Reader;