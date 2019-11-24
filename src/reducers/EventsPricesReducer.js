const INITIAL_STATE = { eventsPrices : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getEventsPrices':{
            return {
                eventsPrices: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
