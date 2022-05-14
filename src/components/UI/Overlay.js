import classes from "./Overlay.module.css";
import { useDispatch } from "react-redux";
import { hideModalCart } from "../../store/modal-slice";
import { hideModalorder } from "../../store/modalorders-slice";

const OverlayCart = (props) => {
  const dispatch = useDispatch();
  const hideModalCartHandler = () => {
    dispatch(hideModalCart());
    dispatch(hideModalorder());
  };
  return (
    <div className={classes.backdrop} onClick={hideModalCartHandler}></div>
  );
};
export default OverlayCart;
