import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from '../../Store/cart-slice';

const ProductItem = props => {
  const { title, price, description } = props;
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cartStore);

  const addToCartHandler = () => {
    const item = {
      id: 1,
      name: title,
      price: price,
      description: description,
      qty: 1,
    };
    console.log(cartStore);
    dispatch(cartAction.addItem(item));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
