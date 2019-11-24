const INITIAL_STATE = { favouriteEvents : [] ,favouriteFamilies : [] , favouriteRestaurants : [] ,favouriteFoodTrucks : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFavouriteEvents':{
            return {
                favouriteEvents: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getFavouriteFamilies':{
            return {
                favouriteFamilies: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getFavouriteRestaurants':{
            return {
                favouriteRestaurants: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getFavouriteFoodTrucks':{
            return {
                favouriteFoodTrucks: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

