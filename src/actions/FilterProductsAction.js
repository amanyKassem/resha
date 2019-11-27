import axios from "axios";
import CONST from "../consts";


export const getFilterProducts = (lang , user_id , keyword , category_id , price , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'filter-products',
            method: 'POST',
            data: {lang , user_id , keyword , category_id , price },
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFilterProducts', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('searchProductsResult', { searchResult : response.data.data , user_id } );
            }
        })

    }
};
