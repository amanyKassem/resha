const INITIAL_STATE = { about : null , key : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAboutApp':{
            return {
                about: action.payload.data.about,
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
