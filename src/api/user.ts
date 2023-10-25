import { baseApi } from './base-api';
import { BaseUser } from '../@types/entities/BaseUser';
import { GetMeDto } from '../@types/dto/users/getMe.dto';

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
    getMe: builder.query<BaseUser, GetMeDto>({
      query: dto => ({
        url: '/user/me',
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + dto.token || '',
        },
      }),
      providesTags: ['CurrentUser'],
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useGetMeQuery
} = userApi;

export default userApi;
