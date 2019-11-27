const INITIAL_STATE = { stopNotification : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getStopNotification':{
            return {
                stopNotification: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
