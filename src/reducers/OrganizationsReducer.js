const INITIAL_STATE = { organizations : [] , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrganizations':{
            return {
                organizations: action.payload.data,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
