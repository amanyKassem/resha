import axios from "axios";
import CONST from "../consts";
import {Toast} from 'native-base'



export const getUpdateProfileMain = (lang , name , details , latitude , longitude , category_id , address , avatar , token , props , backRoute ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-main',
            method: 'POST',
            data: {lang , name , details , latitude , longitude , category_id , address , avatar },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateProfileMain', payload: response.data })
            if (response.data.key == 1){
                props.navigation.navigate('myResturant', {backRoute});
            }
        })

    }
};

export const getUpdateProfileSocial = (lang , phone , mobile , website , facebook , twitter , token , props, backRoute) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-socials',
            method: 'POST',
            data: {lang , phone , mobile , website , facebook , twitter },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateProfileSocial', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('myResturant' , {backRoute});
            }
            Toast.show({
                text:response.data.msg,
                type: response.data.key ==1 ?"success" : "danger",
                duration: 3000
            });
        })

    }
};

export const getUpdateCarProfileMain = (lang , name , details , latitude , longitude , category_id , address , avatar , token , props, backRoute) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-main',
            method: 'POST',
            data: {lang , name , details , latitude , longitude , category_id , address , avatar },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateCarProfileMain', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('myCar', {backRoute});
            }
        })

    }
};

export const getUpdateCarProfileSocial = (lang , phone , mobile , website , facebook , twitter , token , props, backRoute) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-socials',
            method: 'POST',
            data: {lang , phone , mobile , website , facebook , twitter },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateCarProfileSocial', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('myCar', {backRoute});
            }
            Toast.show({
                text:response.data.msg,
                type: response.data.key ==1 ?"success" : "danger",
                duration: 3000
            });
        })

    }
};

export const getUpdateFamilyProfileMain = (lang , name , details , latitude , longitude , category_id , address , avatar , token , props, backRoute) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-main',
            method: 'POST',
            data: {lang , name , details , latitude , longitude , category_id , address , avatar },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateFamilyProfileMain', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('myFamily', {backRoute});
            }
        })

    }
};

export const getUpdateFamilyProfileSocial = (lang , phone , mobile , website , facebook , twitter , token , props, backRoute) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'update-profile-socials',
            method: 'POST',
            data: {lang , phone , mobile , website , facebook , twitter },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUpdateFamilyProfileSocial', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('myFamily', {backRoute});
            }
            Toast.show({
                text:response.data.msg,
                type: response.data.key ==1 ?"success" : "danger",
                duration: 3000
            });
        })

    }
};
