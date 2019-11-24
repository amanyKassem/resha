const INITIAL_STATE = { sendComplaint : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSendComplaint':{
            return {
                sendComplaint: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
