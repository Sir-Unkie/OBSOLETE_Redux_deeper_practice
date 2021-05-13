import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/cart-slice';

const CartItem = props => {
  const { title, quantity, total, price, description, id } = props.item;
  // const cartItemsState = useSelector(state => state.cartStore);
  const dispatch = useDispatch();

  const addItemHandler = () => {
    const item = {
      id: id,
      name: title,
      price: price,
      qty: 1,
      description: description,
    };
    dispatch(cartAction.addItem(item));
  };

  const removeItemHandler = () => {
    const item = {
      id: id,
      name: title,
      price: price,
      qty: 1,
      description: description,
    };
    dispatch(cartAction.removeItem(item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
