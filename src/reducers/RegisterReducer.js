const INITIAL_STATE = { register : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'register':{
            return {
                register: action.payload,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
