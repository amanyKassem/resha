const INITIAL_STATE = { sendForgetCode : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSendForgetCode':{
            return {
                sendForgetCode: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
