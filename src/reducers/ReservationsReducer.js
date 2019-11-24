const INITIAL_STATE = { reservations : null  , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getReservations':{
            return {
                reservations: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
