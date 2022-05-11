import { useReducer, useCallback } from "react";
const reducer = (prevState, action) => {
  if (action.type === "INPUTBLUR")
    return { input: action.input, inputIsTouched: true };
  if (action.type === "RESET") return { input: "", preinputIsTouched: false };
};
const UseValid = (validationLogic) => {
  const [state, dispatcherState] = useReducer(reducer, {
    input: "",
    inputIsTouched: false,
  });

  const inputIsInValid = state.inputIsTouched && !validationLogic(state.input);
  const inputIsValid = validationLogic(state.input);

  const checkValidaton = useCallback((newInput) => {
    dispatcherState({ type: "INPUTBLUR", input: newInput });
  }, []);
  const reset = useCallback(() => {
    dispatcherState({ type: "RESET" });
  }, []);
  return {
    value: state.input,
    inputIsValid,
    inputIsInValid,
    checkValidaton,
    reset,
  };
};
export default UseValid;
