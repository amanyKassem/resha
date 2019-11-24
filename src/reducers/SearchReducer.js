const INITIAL_STATE = { searchResult : [], key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSearchResult':{
            return {
                searchResult: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

