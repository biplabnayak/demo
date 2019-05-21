import React from 'react';
import classes from './Message.css';

const message = (props) => (
  <div className={classes.Typewriter}>
    <p>{props.message}</p>
  </div>
 )

export default message;