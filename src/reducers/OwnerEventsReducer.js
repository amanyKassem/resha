const INITIAL_STATE = { ownerEvents : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOwnerEvent':{
            return {
                ownerEvents: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
