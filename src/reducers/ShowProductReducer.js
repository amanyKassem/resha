const INITIAL_STATE = { showProduct : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getShowProduct':{
            return {
                showProduct: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
