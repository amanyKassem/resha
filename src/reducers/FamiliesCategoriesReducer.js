const INITIAL_STATE = { categories : [] , desc: '' ,count: '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFamiliesCategories':{
            return {
                categories: action.payload.data.categories,
                desc: action.payload.data.text,
                count: action.payload.data.count,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
