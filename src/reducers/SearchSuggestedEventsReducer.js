const INITIAL_STATE = { searchSuggestedEvents : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSearchSuggestedEvents':{
            return {
                searchSuggestedEvents: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
