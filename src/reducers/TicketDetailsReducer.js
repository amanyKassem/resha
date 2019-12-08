const INITIAL_STATE = { ticketDetails : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTicketDetails':{
            return {
                ticketDetails: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
