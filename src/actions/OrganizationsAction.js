import axios from "axios";
import CONST from "../consts";


export const getOrganizations = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'organizations',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getOrganizations', payload: response.data})
        })

    }
};
