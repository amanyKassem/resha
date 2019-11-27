const INITIAL_STATE = { storeProduct : null ,updateProduct : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getStoreProduct':{
            return {
                storeProduct: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getUpdateProduct':{
            return {
                updateProduct: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
