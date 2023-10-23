import { combineReducers } from 'redux';
import authApi from '../api/auth';
import userApi from '../api/user';
import franchisorApi from '../api/franchaisor';
import workspaceApi from '../api/workspace';
import franchiseeApi from '../api/franchaisee';

import userReducer from './slices/user';
import authSlice from './slices/authSlice';
import franchiserSlice from './slices/franchiser';
import franchiseeSlice from './slices/franchisee';
import workspaceSlice from './slices/workspace';
import modalSlice from './slices/modal';



export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [franchisorApi.reducerPath]: franchisorApi.reducer,
  [franchiseeApi.reducerPath]: franchiseeApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
  user: userReducer,
  authSlice: authSlice,
  franchiserSlice: franchiserSlice,
  workspaceSlice: workspaceSlice,
  modalSlice: modalSlice,
  franchiseeSlice: franchiseeSlice
});
