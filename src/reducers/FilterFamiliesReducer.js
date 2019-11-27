const INITIAL_STATE = { filterFamilies : [], key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFilterFamilies':{
            return {
                filterFamilies: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

