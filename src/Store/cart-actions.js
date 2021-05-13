import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartAction } from './cart-slice';
import { uiAction } from './ui-slice';

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://oval-time-307222-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const cartData = await fetchData();
      console.log('cartData: ', cartData);
      if (!cartData.items) {
        cartData.items = [];
      }
      cartData.items.forEach(item => {
        dispatch(cartAction.initialAdd(item));
      });
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          title: 'Error...',
          message: 'Failed to Load CArt data...',
          status: 'error',
        })
      );
    }
  };
};

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
      console.log('sending data');
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
