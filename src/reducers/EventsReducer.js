const INITIAL_STATE = { events : [] , desc: '' ,count: '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getEvents':{
            return {
                events: action.payload.data.events,
                desc: action.payload.data.text,
                count: action.payload.data.count,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
