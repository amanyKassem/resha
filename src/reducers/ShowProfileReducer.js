const INITIAL_STATE = { showProfile : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getShowProfile':{
            return {
                showProfile: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
