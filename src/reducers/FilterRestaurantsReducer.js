const INITIAL_STATE = { filterRestaurants : [], key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFilterRestaurants':{
            return {
                filterRestaurants: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

