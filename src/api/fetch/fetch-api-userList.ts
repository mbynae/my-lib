import Axios from '../instance';
import type { USERLIST } from '../type/type-api-userList';

export async function fetchUsersList(params?: USERLIST['Params']) {
    const result = await Axios.GET<USERLIST['Result']>('https://jsonplaceholder.typicode.com/users', {
        params: params,
    });
    return result.data;
}
