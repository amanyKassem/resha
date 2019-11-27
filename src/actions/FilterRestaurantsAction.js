import axios from "axios";
import CONST from "../consts";


export const getFilterRestaurants = (lang , latitude , longitude , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'filter-restaurants',
            method: 'POST',
            data: {lang , latitude , longitude },
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFilterRestaurants', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('searchRestResult', { searchResult : response.data.data } );
            }
        })

    }
};
