const INITIAL_STATE = { sendActivationCode : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSendActivationCode':{
            return {
                sendActivationCode: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
