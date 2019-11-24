const INITIAL_STATE = { checkForgetCode : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCheckForgetCode':{
            return {
                checkForgetCode: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
