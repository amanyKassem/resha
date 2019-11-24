const INITIAL_STATE = { saveTicket : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSaveTicket':{
            return {
                saveTicket: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
