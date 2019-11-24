const INITIAL_STATE = { twitter : '' ,facebook : '' ,website : '' ,phone : '' , mobile : '' , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getContactUs':{
            return {
                twitter: action.payload.data.twitter,
                facebook: action.payload.data.facebook,
                website: action.payload.data.website,
                phone: action.payload.data.phone,
                mobile: action.payload.data.mobile,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
