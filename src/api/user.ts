import { baseApi } from './base-api';
import { BaseUser } from '../@types/entities/BaseUser';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    currentUser: builder.query<BaseUser, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
      }),
      providesTags: ['CurrentUser'],
    }),
  }),
});

export const {
  useCurrentUserQuery,
} = userApi;

export default userApi;
