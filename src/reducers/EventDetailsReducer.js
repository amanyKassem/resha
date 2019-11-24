const INITIAL_STATE = { eventDet : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getEventDetails':{
            return {
                eventDet: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
