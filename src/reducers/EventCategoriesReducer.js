const INITIAL_STATE = { eventCategories : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getEventCategories':{
            return {
                eventCategories: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
