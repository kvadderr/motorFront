import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import userApi from '../../api/user'
import { RootState } from '../store';
import { readCookie } from '../../utils/cookie';

import { Root } from '../../@types/entities/Root';
import { BaseUser } from '../../@types/entities/BaseUser';

type AuthState = {
  isAuthorized: boolean;
  token: string | null;
  accesses: string[];
  currentUser?: BaseUser;
  currentFranchisor?: number | null;
  currentFranchisee?: number | null;
  currentEmployee?: number | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    token: null,
    accessToken: null,
    accesses: [],
    currentFranchisor: null,
    currentFranchisee: null,
    currentEmployee: null
  } as AuthState,
  reducers: {
    setCurrentFranchisor: (state, action) => {
      console.log('dispatch', action)
      state.currentFranchisor = action.payload
    },
    setCurrentFranchisee: (state, action) => {
      state.currentFranchisee = action.payload
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem('token', payload.accessToken);
          state.token = payload.accessToken;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchFulfilled,
        (state, { payload }) => {
          state.token = readCookie('AccessToken');
          state.currentUser = payload;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          state.isAuthorized = false;
        },
      )
      .addMatcher(authApi.endpoints.signOut.matchRejected, (state) => {
        localStorage.removeItem('token');
        state.isAuthorized = false;
      });
  },
});

export const selectUserAccesses = (state: RootState): string[] =>
  state.authSlice.accesses;
export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;
export const selectCurrentUser = (
  state: RootState,
): Root | undefined => state.authSlice.currentUser;
export const selectAccessToken = (state: RootState): string | null =>
  state.authSlice.token;
export const selectCurrentFranchisor = (state: RootState): number | null | undefined =>
  state.authSlice.currentFranchisor;
export const selectCurrentFranchisee = (state: RootState): number | null | undefined =>
  state.authSlice.currentFranchisee;
export const selectCurrentEmployee = (state: RootState): number | null | undefined =>
  state.authSlice.currentEmployee;

export const { setCurrentFranchisor, setCurrentFranchisee, setCurrentEmployee } = slice.actions;

export default slice.reducer;
