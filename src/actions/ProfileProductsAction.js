import axios from "axios";
import CONST from "../consts";



export const getProfileProducts = (lang ,user_id) => {
    return (dispatch) => {
        ProfileProducts(lang, user_id, dispatch)
    }
};
//
// export const getDeleteProduct = (lang , product_id , token , user_id) => {
//     return (dispatch) => {
//
//         axios({
//             url: CONST.url + 'delete-product',
//             method: 'POST',
//             data: {lang , product_id},
//             headers: {Authorization: token}
//         }).then(response => {
//             ProfileProducts(lang , user_id , dispatch)
//         })
//
//     }
// };




const ProfileProducts = (lang , user_id , dispatch ) => {
    axios({
        url: CONST.url + 'profile-products',
        method: 'POST',
        data: {lang , user_id}
    }).then(response => {
        dispatch({type: 'getProfileProducts', payload: response.data})
    })
};

