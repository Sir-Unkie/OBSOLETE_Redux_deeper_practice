import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './Store/cart-actions';

let initial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisibleState = useSelector(state => state.uiStore.cartIsVisible);
  const notificationState = useSelector(state => state.uiStore.notification);
  const cartState = useSelector(state => state.cartStore);

  useEffect(() => {
    if (initial) {
      dispatch(fetchCartData());
      initial = !initial;
      return;
    }
    if (cartState.isChanged) {
      dispatch(sendCartData(cartState));
    }
  }, [cartState, dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, []);
  return (
    <Fragment>
      {notificationState && (
        <Notification
          status={notificationState.status}
          title={notificationState.title}
          message={notificationState.message}
        ></Notification>
      )}
      <Layout>
        {cartVisibleState && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
