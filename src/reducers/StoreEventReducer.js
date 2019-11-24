const INITIAL_STATE = { storeEvent : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getStoreEvent':{
            return {
                storeEvent: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
