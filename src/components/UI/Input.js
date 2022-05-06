import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const getValue = () => {
    return inputRef.current.value === "" ? 0 : inputRef.current.value;
  };
  const getfocused = () => {
    inputRef.current.focus();
  };
  const getReset = () => {
    inputRef.current.value = 1;
  };
  useImperativeHandle(ref, () => {
    return {
      currentvalue: getValue,
      onFocus: getfocused,
      reset: getReset,
    };
  });
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.lable}</label>
      <input ref={inputRef} {...props.input}></input>
    </div>
  );
});
export default Input;
