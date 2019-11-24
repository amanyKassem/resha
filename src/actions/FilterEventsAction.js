import axios from "axios";
import CONST from "../consts";


export const getFilterEvents = (lang , price , latitude , longitude , category_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'filter-events',
            method: 'POST',
            data: {lang , price , latitude , longitude , category_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getFilterEvents', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('searchResult', { searchResult : response.data.data } );
            }
        })

    }
};
