import classes from "./OrderedItem.module.css";

const OrderedItem = (props) => {
  const item = props.itemvalue;
  const count = item.count;

  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>${item.price}</div>
          <div className={classes.amount}>Count: {count}</div>
          <div className={classes.date}>
            Date Of Order: {item.date.slice(0, 25)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderedItem;
