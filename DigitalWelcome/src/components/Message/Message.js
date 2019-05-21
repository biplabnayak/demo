import React from 'react';
import classes from './Message.css';

const message = props => (
  <div className={classes.Message}>
    {props.message}
  </div>
 )

export default message;