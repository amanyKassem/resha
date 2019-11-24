const INITIAL_STATE = { profileProducts : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProfileProducts':{
            return {
                profileProducts: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
