import axios from "axios";
import CONST from "../consts";

export const getStoreProduct = (lang , name , price , category_id , details , images , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'store-product',
            method: 'POST',
            data: {lang ,  name , price , category_id , details , images },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getStoreProduct', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('restProducts');
            }
        })

    }
};
export const getUpdateProduct = (lang , product_id , name , price , category_id , details , images , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-product',
            method: 'POST',
            data: {lang , product_id , name , price , category_id , details , images },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateProduct', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('restProductDetails');
            }
        })

    }
};