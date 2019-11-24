const INITIAL_STATE = { notifications : null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNotifications':{
            return {
                notifications: action.payload,
                // key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
