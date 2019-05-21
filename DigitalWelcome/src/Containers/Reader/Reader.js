import React, { Component } from 'react';
import axios from '../../axios-reader';
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
  }
  state = {
    messages: null,
    loading: true,
    showVideo: false,
    showImage: true,
    retryCount: 0    
  };

  sendWithRetry = () => {
    axios.get()
    .then(this.successHandler).catch(this.errorHandler);
  }
  
  successHandler = (res) => {
    this.setState({ loading: false, messages: res.data, openEnvelop: true });
      setTimeout(() => {
        this.setState({
          showVideo: true,
        });
        
      }, 10000);     
  }

  errorHandler = () => {
    if (this.state.retryCount <= 0) {
      this.setState({ retryCount: this.state.retryCount + 1 });
      console.log('Retrying...');
      this.sendWithRetry();
    } else {
      console.log('Retried several times but still failed');
      this.setState({
        messages: {message: 'Hard work always pay.... '},
        loading: false });
        setTimeout(() => {
          this.setState({
            showVideo: true,
          });          
        }, 10000);
      
    }
  }  

  componentDidMount () {
   this.sendWithRetry();         
  }  

  onVideoEnded = () => {
    this.setState({ showImage: false });
    setTimeout(() => {
      this.refVideo2.current.play()          
    }, 10000);
    
  }

  render () {
    // const arrow = [classes.arrow, classes.arrowFirst].join(' ');
    let demo = null;
    if (!this.state.loading) {
      demo = (<div className={classes.Postcard}>
        <div className={classes.Content}>      
          <div className={classes.Column}>
          <img src={BrandLogo} alt="Logo" />
          <Message checked={this.state.openEnvelop} message={this.state.messages.message}/>
          <img className={classes.Stamp} src={MumbaiPostage} alt="Mumbai Postage" />
          </div>
          <div className={classes.Column}>
            {
            this.state.showVideo ?
              <div>
              <Video src={"//www.w3schools.com/html/mov_bbb.mp4"} autoplay={'autoplay'} onVideoEnded={this.onVideoEnded} />
              { this.state.showImage ?
                <img className={classes.Marvel} src={Marvels} alt="Marvels" />
                : <Video src={"//www.w3schools.com/html/movie.mp4"} ref={this.refVideo2} />
              }                            
              </div>
              : <img className={classes.Marvel} src={Marvels} alt="Marvels" />
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