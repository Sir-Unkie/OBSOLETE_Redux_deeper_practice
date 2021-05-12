import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

import store from './Store/index';

function App() {
  const cartVisibleState = useSelector(state => state.uiStore.cartIsVisible);

  return (
    <Layout>
      {cartVisibleState && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
