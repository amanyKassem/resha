const INITIAL_STATE = { filterEvents : [], key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFilterEvents':{
            return {
                filterEvents: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};

