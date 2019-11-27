import axios from "axios";
import CONST from "../consts";



export const getAuthProducts = (lang , token) => {
    return (dispatch) => {
        AuthProducts(lang, token, dispatch)
    }
};

export const getDeleteProduct = (lang , product_id , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-product',
            method: 'POST',
            data: {lang , product_id},
            headers: {Authorization: token}
        }).then(response => {
            AuthProducts(lang , token , dispatch)
        })

    }
};




const AuthProducts = (lang , token , dispatch ) => {
    axios({
        url: CONST.url + 'auth-products',
        method: 'POST',
        data: {lang},
        headers: {Authorization: token}
    }).then(response => {
        dispatch({type: 'getAuthProducts', payload: response.data})
    })
};

