import { createSlice } from '@reduxjs/toolkit';
import { uiAction } from './ui-slice';

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: [],
    totalQuantity: 0,
    isChanged: false,
  },
  reducers: {
    addItem(state, action) {
      state.isChanged = true;
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
    initialAdd(state, action) {
      state.isChanged = false;
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
      state.isChanged = true;
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

export const cartAction = cartSlice.actions;

export default cartSlice;
