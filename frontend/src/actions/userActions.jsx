import { ADD_USER_ADDRESS, ADD_USER_ADDRESS_FAIL, REMOVE_USER_ADDRESS, REMOVE_USER_ADDRESS_FAIL, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants";
import axios from 'axios';
import { ERROR, REMOVE_CART, REQUEST } from "../constants/cartConstants";
import store from "../store";

const userSignIn = async (dispatch, email, password) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        const {data} = await axios.post('/api/user/signin' , {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userSignIn', JSON.stringify(data));
    }
    catch (err){
        dispatch({type: USER_SIGNIN_FAIL, payload: err.message})
    }
}

const userSignUp = async (dispatch, name, email, password) => {
    dispatch({type: USER_SIGNUP_REQUEST});
    try {
        const {data} = await axios.post('/api/user/signup' , {name, email, password});
        dispatch({type: USER_SIGNUP_SUCCESS, payload: data});
        localStorage.setItem('userSignUp', JSON.stringify(data));
    }
    catch (err ){
        dispatch({type: USER_SIGNUP_FAIL, payload: err.message})
    }
}

const userSignOut = async (dispatch) =>{
    localStorage.removeItem('userSignIn');
    dispatch({type: USER_SIGNOUT});
    dispatch({type: REMOVE_CART});
}

const addUserAddress = async (dispatch, email, address)  =>{
   dispatch ({type: REQUEST})
   try{
       const {data} = await axios.post('api/user/addAddress',{email, address});
       dispatch({type: ADD_USER_ADDRESS, payload: data});
       localStorage.setItem('userSignIn', JSON.stringify(store.getState().userSignIn.userInfo));
   }
   catch (err ){
    dispatch({type: ERROR, payload: err.message})
}
}

const removeAddress = async (dispatch, email, address)  =>{
    dispatch ({type: REQUEST})
    try{
        const {data} = await axios.post('api/user/removeAddress',{email, address});
        dispatch({type: REMOVE_USER_ADDRESS, payload: data});
        localStorage.setItem('userSignIn', JSON.stringify(store.getState().userSignIn.userInfo));
    }
    catch (err ){
     dispatch({type: ERROR, payload: err.message})
 }
 }

export {userSignIn, userSignUp, userSignOut,addUserAddress,removeAddress};