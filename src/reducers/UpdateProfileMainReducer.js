const INITIAL_STATE = { updateProfileMain : null ,  updateProfileSocial : null , updateCarProfileMain : null
    ,  updateCarProfileSocial : null , updateFamilyProfileMain : null ,  updateFamilyProfileSocial : null , key : 0 , msg:''};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUpdateProfileMain':{
            return {
                updateProfileMain: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getUpdateProfileSocial':{
            return {
                updateProfileSocial: action.payload.data,
                keyRest: action.payload.key,
                msg: action.payload.msg,
            };
        }
        case 'getUpdateCarProfileMain':{
            return {
                updateCarProfileMain: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getUpdateCarProfileSocial':{
            return {
                updateCarProfileSocial: action.payload.data,
                keyCar: action.payload.key,
                msg: action.payload.msg,
            };
        }
        case 'getUpdateFamilyProfileMain':{
            return {
                updateFamilyProfileMain: action.payload.data,
                key: action.payload.key,
            };
        }
        case 'getUpdateFamilyProfileSocial':{
            return {
                updateFamilyProfileSocial: action.payload.data,
                keyFamily: action.payload.key,
                msg: action.payload.msg,
            };
        }

        default:
            return state;
    }
};
