import React, { useRef, useImperativeHandle, useState } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [error, serError] = useState(false);
  const getValue = () => {
    return inputRef.current.value === "" ? 0 : inputRef.current.value;
  };
  const getfocused = () => {
    serError(true);
    inputRef.current.focus();
  };
  const getReset = () => {
    serError(false);
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
    <>
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.lable}</label>
        <input ref={inputRef} {...props.input}></input>
      </div>
      {error && <div className={classes.error}> Insert correct amount !</div>}
    </>
  );
});
export default Input;
