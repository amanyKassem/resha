const INITIAL_STATE = { popularEvents : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getPopularEvents':{
            return {
                popularEvents: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
