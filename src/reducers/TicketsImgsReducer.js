const INITIAL_STATE = { key : 0 , tickets:[] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTicketsImgs':{
            return {
                tickets: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
