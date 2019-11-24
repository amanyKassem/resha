const INITIAL_STATE = { ownerEventsDetails : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOwnerEventsDetails':{
            return {
                ownerEventsDetails: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
