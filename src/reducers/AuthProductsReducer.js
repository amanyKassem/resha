const INITIAL_STATE = { authProducts : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAuthProducts':{
            return {
                authProducts: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
