const INITIAL_STATE = { productPrices : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProductPrices':{
            return {
                productPrices: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
