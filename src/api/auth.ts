import { SignInResponse } from '../@types/api/response';
import { SignInDto } from '../@types/dto/auth/signin.dto';
import { SignUpDto, SignUpWithoutPassDto } from '../@types/dto/auth/signup.dto';
import { baseApi } from './base-api';

const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation<SignInResponse, SignInDto>({
            query: payload => ({
                url: '/auth/login',
                body: payload,
                method: 'POST',
            }),
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
        }),

        refresh: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),

        signUp: builder.mutation<{ accessToken: string; }, SignUpDto | SignUpWithoutPassDto>({
            query: dto => ({
                url: '/auth/register',
                body: dto,
                method: 'POST',
            }),
        }),

    }),
});

export const {
    useSignInMutation,
    useSignOutMutation,
    useRefreshMutation,
    useSignUpMutation
} = authApi;

export default authApi;
