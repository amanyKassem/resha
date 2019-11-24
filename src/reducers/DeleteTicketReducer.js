const INITIAL_STATE = { deleteTicket : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getDeleteTicket':{
            return {
                deleteTicket: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
