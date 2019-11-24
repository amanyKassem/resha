const INITIAL_STATE = { reservationDetails : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getReservationDetails':{
            return {
                reservationDetails: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
