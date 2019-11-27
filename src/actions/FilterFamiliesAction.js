import axios from "axios";
import CONST from "../consts";


export const getFilterFamilies = (lang , keyword , latitude , longitude , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'filter-families',
            method: 'POST',
            data: {lang , keyword , latitude , longitude },
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFilterFamilies', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('searchFamiliesResult', { searchResult : response.data.data } );
            }
        })

    }
};
