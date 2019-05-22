import React, { Component } from 'react';
import axios from 'axios';
import classes from './Messenger.css';

class Messenger extends Component {
  state = {
    message: ''
  }

  handleSubmit = (e) => {    
   const message = JSON.stringify(this.state.message);
    axios.post('http://52.32.34.54:8080/message', message ,  {
      headers: {
          'Content-Type': 'application/json'
      }
    })
     .then ( res => {
       this.setState({ message: ''});
     })
     .catch( err => {
       console.log('Something went worng', err);
     })
  };

  handleChange = (e) => {
    this.setState({ message: e.target.value});
  }

  render () {
    
    return (
      <div className={classes.messege}>
        <div className={classes.rmg_logo} />		
		    <div className={classes.welcome_text}> 
		      <textarea
            className={classes.Messege}
            value={this.state.message}
            onChange={this.handleChange}/>
	    	</div>		  
        <div className={classes.btn_wrapper}>
          <button className={classes.submit_btn} onClick={this.handleSubmit}>Send</button>
        </div>
	  </div>
    )
  }
}

export default Messenger;
