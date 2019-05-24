import React, { Component } from 'react';
import Video from '../../components/Video';
import classes from './Reader.css';
import BrandLogo from '../../assets/images/Logo.svg';
import MumbaiPostage from '../../assets/images/BottomLeft-Stamps.svg';
import Typist from 'react-typist';
import Marvels from '../../assets/images/Marvel.png';


class Reader extends Component {
  constructor() {
    super();
    this.refVideo1 = React.createRef();
    this.refMessage = React.createRef();
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
      }
    });
  }

  typeWriter = () => {
    let i = 0;
    const message = 'Hi Ram this is test'; //this.state.messages.message;
    if (i < message.length) {
      this.refMessage.current.innerHTML += message.charAt(i);
      i++;
      setTimeout(this.typeWriter, 50);
    }
  }

  componentDidMount () {
    this.runPolling();   
  }  

  onTypingFinish = () => {
    this.setState({
      showVideo: true
    })

    setTimeout(() => {
      this.refVideo1.current.play()                         
    }, 2000);
  }

  render () {
    return (
        <div className={classes.mainWrapper}>
          <div className={[classes.section, classes.left, 'col-xs-6'].join(' ')}>
            <div className={classes.half}>
              <img src={BrandLogo} alt="Logo" />
            </div>
            <div className={classes.half}>
            {
              !this.state.loading ?
              <Typist onTypingDone={this.onTypingFinish}>
                {this.state.messages.message}
              </Typist>
              : null
            }
            </div>
            <div className={classes.half}>
              <img src={MumbaiPostage} alt="Mumbai Postage" />
            </div>
          </div>
          <div className={[classes.section, classes.left, 'col-xs-6'].join(' ')}>
            <div className={classes.half}>
            <img className={classes.Marvel} src={Marvels} alt="Marvels" />
            </div>
            <div className={classes.half}>
            <div className={this.state.showVideo ? classes.ShowVideo: classes.HideVideo}>
            <Video src={"http://52.32.34.54:8081/0wrIRgCm.mp4 "}
              autoplay={'autoplay'}
              ref={this.refVideo1}
              onVideoEnded={this.onVideoEnded} />
            </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Reader;