import axios from "axios";
import CONST from "../consts";


export const getFavouriteEvents = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite-events',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFavouriteEvents', payload: response.data})
        })

    }
};

export const getFavouriteFamilies = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite-families',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFavouriteFamilies', payload: response.data})
        })

    }
};

export const getFavouriteRestaurants = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite-restaurants',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFavouriteRestaurants', payload: response.data})
        })

    }
};

export const getFavouriteFoodTrucks = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite-food-trucks',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFavouriteFoodTrucks', payload: response.data})
        })

    }
};

