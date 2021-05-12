import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = props => {
  const cartItemsState = useSelector(state => state.cartStore);
  const CartItems = () => {
    return cartItemsState.items.map(elem => {
      return (
        <CartItem
          key={elem.id}
          item={{
            id: elem.id,
            title: elem.name,
            quantity: elem.qty,
            total: elem.qty * elem.price,
            price: elem.price,
            description: elem.description,
          }}
        />
      );
    });
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItems></CartItems>
      </ul>
    </Card>
  );
};

export default Cart;
