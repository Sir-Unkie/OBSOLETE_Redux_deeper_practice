import classes from './CartButton.module.css';
import { uiAction } from '../../Store/ui-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CartButton = props => {
  const dispatch = useDispatch();
  const itemsAmount = useSelector(state => state.cartStore.totalQuantity);
  const cartHandler = () => {
    dispatch(uiAction.toggleView());
  };
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsAmount}</span>
    </button>
  );
};

export default CartButton;
