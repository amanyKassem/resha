const INITIAL_STATE = { families : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFamilies':{
            return {
                families: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
