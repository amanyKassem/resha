const INITIAL_STATE = { confirmChangePassword : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getConfirmChangePassword':{
            return {
                confirmChangePassword: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
