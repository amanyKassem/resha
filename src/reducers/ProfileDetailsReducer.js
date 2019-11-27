const INITIAL_STATE = { profileDetails : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProfileDetails':{
            return {
                profileDetails: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
