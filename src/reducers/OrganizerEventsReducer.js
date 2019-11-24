const INITIAL_STATE = { organizerEvents : null  , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrganizerEvents':{
            return {
                organizerEvents: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
