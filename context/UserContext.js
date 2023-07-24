import { hookstate, useHookstate } from '@hookstate/core';

const userState = hookstate({});

const UserContext = () => {
    const user = useHookstate(userState);
    return user;
}

export default UserContext;