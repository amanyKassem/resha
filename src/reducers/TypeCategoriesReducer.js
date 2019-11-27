const INITIAL_STATE = { typeCategories : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTypeCategories':{
            return {
                typeCategories: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
