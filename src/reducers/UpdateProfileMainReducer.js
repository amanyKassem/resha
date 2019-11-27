const INITIAL_STATE = { updateProfileMain : null ,  updateProfileSocial : null , updateCarProfileMain : null ,  updateCarProfileSocial : null , updateFamilyProfileMain : null ,  updateFamilyProfileSocial : null , key : 0 };

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
                key: action.payload.key,
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
                key: action.payload.key,
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
                key: action.payload.key,
            };
        }

        default:
            return state;
    }
};
