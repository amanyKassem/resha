const INITIAL_STATE = { trucks : [] , desc: '' ,count: '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFoodTrucks':{
            return {
                trucks: action.payload.data.trucks,
                desc: action.payload.data.text,
                count: action.payload.data.count,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
