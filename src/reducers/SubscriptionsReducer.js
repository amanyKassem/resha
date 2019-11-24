const INITIAL_STATE = { subscriptions : [] , desc: '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSubscriptions':{
            return {
                subscriptions: action.payload.data.subscriptions,
                desc: action.payload.data.text,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
