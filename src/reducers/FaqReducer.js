const INITIAL_STATE = { ques : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFaq':{
            return {
                ques: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
