import React from 'react';
import ParcelLogo  from '../../assets/images/Logo.svg';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={ParcelLogo} alt="parcelforce" />
  </div>
)
export default logo;