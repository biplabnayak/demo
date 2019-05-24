import React from 'react';
import classes from './Message.css';

const message = (props) => {
  const message = props.message;
  let i =0 ;
  let jsxArray = [];
  for(i=0; i<message.length;i++) {
    jsxArray.push(message[i]);
  }
  return (
    <div className={classes.Message}>
      {jsxArray}
    </div>
  )
}
export default message;