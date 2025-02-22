import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { fetchUsersList } from '../fetch/fetch-api-userList';

import type { UseMutationOption, UseQueryOption } from '../type/common-query-type';
import type { USERLIST } from '../type/type-api-userList';

export const USERLIST_KEYS = {
    userList: 'userList',
    todos: 'todos',
    post: 'post',
    comment: 'comment',
};

export const useUserListQuery = <T = USERLIST['Result']>(params?: USERLIST['Params'], options?: UseQueryOption<USERLIST['Result'], T>) => {
    const queryData = useQuery({
        queryKey: ['userList', { ...params }],
        queryFn: () => fetchUsersList(params),
        staleTime: 30000,
        refetchOnWindowFocus: false,
        ...options,
    });

    return queryData;
};

export const useExampleMutate = (options?: UseMutationOption<USERLIST['Result'], USERLIST['Params']>) => {
    const queryData = useMutation({
        // mutationKey: [],
        mutationFn: (params) => fetchUsersList(params),
        ...options,
    });

    return queryData;
};

export const userListQuery = <T = USERLIST['Result']>(params: USERLIST['Params'], options: UseQueryOption<USERLIST['Result'], T>) => {
    return queryOptions({
        queryKey: [USERLIST_KEYS.userList, { ...params }],
        queryFn: () => fetchUsersList(params),
        ...options,
    });
};
