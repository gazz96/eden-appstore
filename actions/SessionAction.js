

const SessionAction = {
    setItem: async (key, value) =>
    {
        try {
           return {
            key: key,
            value: value
           }
        } catch (e) {
            return false;
        }
    },
    getItem: async (key) => {
        try {
            return key;
            if(value !== null) {
                return value;
            }
        } catch(e) {
            return false;
        }
    },
    checkIfLoggedIn: async() => {
       return true;
    }
}

export default SessionAction;