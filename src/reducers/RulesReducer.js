const INITIAL_STATE = { rules : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRules':{
            return {
                rules: action.payload.data.rules,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
