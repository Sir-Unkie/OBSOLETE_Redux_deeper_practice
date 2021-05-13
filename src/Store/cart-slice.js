import { createSlice } from '@reduxjs/toolkit';
import { uiAction } from './ui-slice';

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: [
      {
        id: 2,
        name: 'Dummy',
        price: 6,
        description: 'dummy description',
        qty: 4,
      },
    ],
    totalQuantity: 4,
  },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const itemIndex = state.items.findIndex(elem => elem.id === item.id);
      //   1.Check if the item is already in the cart
      if (itemIndex === -1) {
        //   2.if not: Just add new item
        state.items.push(action.payload);
        state.totalQuantity += action.payload.qty;
      } else {
        //   3.if yes: update the item
        state.items[itemIndex].qty += action.payload.qty;
        state.totalQuantity += action.payload.qty;
      }
    },
    removeItem(state, action) {
      const item = action.payload;
      const itemIndex = state.items.findIndex(elem => elem.id === item.id);
      // check if its the last item
      if (state.items[itemIndex].qty === 1) {
        //   if the last item - remove from the array
        state.items.splice(itemIndex, 1);
        state.totalQuantity--;
      } else {
        //   if not-decrease the q-ty
        state.items[itemIndex].qty--;
        state.totalQuantity--;
      }
    },
  },
});

export const sendCartData = cartState => {
  return async dispatch => {
    dispatch(
      uiAction.showNotification({
        title: 'Sending...',
        message: 'Sending request...',
        status: 'pending',
      })
    );
    const sendRequest = async () => {
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
    };
    try {
      await sendRequest();
      dispatch(
        uiAction.showNotification({
          title: 'Success...',
          message: 'Cart is sent successfuly...',
          status: 'success',
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          title: 'Error...',
          message: 'Error...',
          status: 'error',
        })
      );
    }
  };
};

export const cartAction = cartSlice.actions;

export default cartSlice;
