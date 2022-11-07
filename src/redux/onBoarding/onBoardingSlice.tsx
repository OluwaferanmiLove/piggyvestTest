import {createSlice} from '@reduxjs/toolkit';
import {revertAll} from '../sharedAction';

interface initialStateType {
  onBoarded: boolean;
}

const initialState: initialStateType = {
  onBoarded: false,
};

export const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    setOnBoarded: (state, action) => {
      state.onBoarded = action.payload;
    },
  },
});

export const {setOnBoarded} = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
