const INITIAL_STATE = { filterProducts : [], key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFilterProducts':{
            return {
                filterProducts: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

