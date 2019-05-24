import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClass = [classes.inputElement];

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClass.push(classes.Invalid);
  }

  switch(props.elementType) {
    case('input'):
      inputElement = <input
        className={inputClass.join(' ')}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case('textarea'):
      inputElement = <textarea
        className={inputClass}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case('radio'):
      inputElement = <input
        type='radio'
        className={inputClass}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case('checkbox'):
      inputElement = <input
        type='checkbox'
        className={inputClass}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />
      break;
    case('select'):
      inputElement = <select
        className={inputClass}
        onChange={props.changed}
        value={props.value}>
        {props.elementConfig.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.displayName}</option>
        ))}        
      </select>
      break;
    default:
      inputElement =<input className={classes.inputElement} onChange={props.changed} />;
      break;
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
}

export default input;