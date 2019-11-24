const INITIAL_STATE = { restaurants : [] , desc: '' ,count: '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRestaurants':{
            return {
                restaurants: action.payload.data.restaurants,
                desc: action.payload.data.text,
                count: action.payload.data.count,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
