import { createSlice } from '@reduxjs/toolkit';

import { Franchaisor } from '../../@types/entities/Franchaisor';
import { createCookie, eraseCookie } from '../../utils/cookie';
import franchisorApi from '../../api/franchaisor';
import { RootState } from '../store';

type FranchaiserState = {
  data: Franchaisor | null;
  franchaiserList: Franchaisor[];
};

const initialState: FranchaiserState = {
  data: null,
  franchaiserList: [],
};

const FranchiserSlice = createSlice({
  name: 'franchiser',
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        franchisorApi.endpoints.allFranchaisor.matchFulfilled,
        (state, { payload }) => {
          state.franchaiserList = payload
        },
      )
  }
});

export const { setUserData } = FranchiserSlice.actions;
export const selectFranchaiserList = (state: RootState): Franchaisor[] | null =>
  state.franchiserSlice.franchaiserList;
export default FranchiserSlice.reducer;
