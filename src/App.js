import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { uiAction } from './Store/ui-slice';
import Notification from './components/UI/Notification';

let initial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisibleState = useSelector(state => state.uiStore.cartIsVisible);
  const notificationState = useSelector(state => state.uiStore.notification);
  const cartState = useSelector(state => state.cartStore);
  useEffect(() => {
    async function Fetch() {
      if (initial) {
        initial = !initial;
        return;
      }
      try {
        dispatch(
          uiAction.showNotification({
            title: 'Sending...',
            message: 'Sending request...',
            status: 'pending',
          })
        );
        const response = await fetch(
          'https://oval-time-307222-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cartState),
          }
        );
        if (!response.ok) {
          throw new Error('failed to upload');
        }
        dispatch(
          uiAction.showNotification({
            title: 'Success...',
            message: 'Cart is sent successfuly...',
            status: 'success',
          })
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        dispatch(
          uiAction.showNotification({
            title: 'Error...',
            message: 'Error...',
            status: 'error',
          })
        );
      }
    }
    Fetch();
  }, [cartState, dispatch]);
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
