import { baseApi } from './base-api';
import { Workspace } from '../@types/entities/Workspace';
import { GetAllWorkSpaceDto } from '../@types/dto/workspace/get-all.dto';

const workspaceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    allWorkspace: builder.query<Workspace[], GetAllWorkSpaceDto>({
      query: dto => ({
        url: `/spacework/${dto.id}`,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') || '',
        },
        providesTags: ['Workspace'],
      }),
    }),
    createWorkspace: builder.mutation<void, Workspace>({
      query: dto => ({
          url: '/spacework',
          body: dto,
          method: 'POST',
      }),
  }),
  }),
});

export const {
  useAllWorkspaceQuery,
  useCreateWorkspaceMutation
} = workspaceApi;

export default workspaceApi;
