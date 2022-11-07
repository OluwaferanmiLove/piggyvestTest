import {createSlice} from '@reduxjs/toolkit';
import {revertAll} from '../sharedAction';
import {Meal} from './meal';

interface initialStateType {
  order: order[];
}

interface order {
  quantity: number;
  item: Meal;
}

const initialState: initialStateType = {
  order: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    addOrder: (state, action) => {
      state.order = [...state.order, action.payload];
    },
  },
});

export const {addOrder} = cartSlice.actions;

export default cartSlice.reducer;
