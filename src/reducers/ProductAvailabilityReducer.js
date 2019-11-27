const INITIAL_STATE = { productAvailability : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProductAvailability':{
            return {
                productAvailability: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
