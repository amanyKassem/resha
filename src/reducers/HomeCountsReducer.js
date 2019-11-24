const INITIAL_STATE = { resturants : null ,families : null ,food_trucks : null ,events : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getHomeCounts':{
            return {
                resturants: action.payload.data.resturants,
                families: action.payload.data.families,
                food_trucks: action.payload.data.food_trucks,
                events: action.payload.data.events,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
