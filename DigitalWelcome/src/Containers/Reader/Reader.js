import React, { Component } from 'react';
//import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Video from '../../components/Video';
import Message from '../../components/Message/Message';
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
    loadingBar: true,
    showVideo: false,
    showImage: true,
    showMessage: false,
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
        console.log(d);
        console.log(this);
        this.setState({ loading: false, messages: d});

        setTimeout(() => {
          this.setState({
            showVideo: true,
          });
        }, 20000);
      }
    });
  }

  componentDidMount () {
    this.runPolling();
  }  

  onVideoLoaded = () => {
    setTimeout(() => {
      this.refVideo1.current.play()  
    }, 2000) 
  }

  onVideoEnded = () => {
    this.setState({ showImage: false });
    setTimeout(() => {
      this.refVideo2.current.play()          
    }, 10000);
  }

  onImageLoaded = () => {
    console.log('image loaded')
    this.setState({
      showMessage: true
    })
  }

  onImageLoadedError = () => {
    console.log('image loaded error')
    this.setState({
      showMessage: true
    })
  }

  render () {
    // const arrow = [classes.arrow, classes.arrowFirst].join(' ');
    let demo = null;
    if (!this.state.loading) {
      demo = (<div className={classes.Postcard}>
        <div className={classes.Content}>      
          <div className={classes.Column}>
          <img src={BrandLogo} alt="Logo" />
          <Message checked={this.state.openEnvelop} message={this.state.showMessage && this.state.messages ? this.state.messages.message : ''}/>
            <img className={classes.Stamp} src={MumbaiPostage} alt="Mumbai Postage" />            
          </div>
          <div className={classes.Column}>
            {
            this.state.showVideo ?
              <div>
              <Video src={"http://52.32.34.54:8081/0wrIRgCm.mp4"}
                ref={this.refVideo1} autoplay={'autoplay'}
                onVideoEnded={this.onVideoEnded}
                onVideoLoaded={this.onVideoLoaded}/>
              { this.state.showImage ?
                <img className={classes.Marvel} src={Marvels} alt="Marvels" />
                : <Video src={"http://52.32.34.54:8081/0wrIRgCm.mp4"} ref={this.refVideo2} />
              }                            
              </div>
              : <img className={classes.Marvel} src={Marvels} onLoad={this.onImageLoaded} onError={this.onImageLoadedError} alt="Marvels" />
            }             
          </div>
        </div>
      </div>);
    } else {
      demo = <Spinner />;
    }

    return (
      <React.Fragment>{demo} </React.Fragment>
    )
  }
}

export default Reader;