
const INITIAL_STATE = {user: null, key: 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('login_user') :
            return ({...state, key: 1});
        case ('login_failed') :
            return ({...state, key: 0, user: action.error });
        case ('login_success') :
            return ({...state, key: 0, user: action.data });
        case ('user_logout') :
            return ({...state, user: null});
        case ('temp_auth') :
            return ({...state, user: null});
        default :
            return state;
    }

}