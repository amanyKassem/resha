const INITIAL_STATE = { changePassword : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getChangePassword':{
            return {
                changePassword: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
