const INITIAL_STATE = { eventTickets : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getEventTickets':{
            return {
                eventTickets: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
