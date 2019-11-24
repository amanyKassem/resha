const INITIAL_STATE = { rateProduct : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRateProduct':{
            return {
                rateProduct: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
