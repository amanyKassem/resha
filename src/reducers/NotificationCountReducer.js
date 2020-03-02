const INITIAL_STATE = { notificationCount : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNotificationCount':{
            return {
                notificationCount: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
