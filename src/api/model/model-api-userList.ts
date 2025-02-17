import { USERLIST } from '../type/type-api-userList';

export const userListModel = (data: USERLIST['Result']) => {
    if (data) {
        return data.map(user => {
            const { id, name, email, phone } = user;
            return { id, name, email, phone };
        });
    }

    return [];
};
