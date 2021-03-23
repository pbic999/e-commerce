import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, ERROR, REMOVE_CART, REQUEST } from "../constants/cartConstants";
import store from "../store";

const addToCart = async (dispatch,email,productId,qty) => {
    dispatch({type: REQUEST});
    try{
    const {data} = await axios.post(`/api/user/addToCart`,{email,productId,qty});
    dispatch({type: CART_ADD_ITEM,payload: data});
    localStorage.setItem('userSignIn', JSON.stringify(store.getState().userSignIn.userInfo));
    }
    catch (err){
        dispatch({type: ERROR , payload: err.message})
    }
}

const removeFromCart = async (dispatch,email,productId) => {
    try{
        const {data} = await axios.post('/api/user/removeFromCart',{email,productId})
         dispatch({type: CART_REMOVE_ITEM,payload: data});
         localStorage.setItem('userSignIn', JSON.stringify(store.getState().userSignIn.userInfo));
}
    catch (err) {
        dispatch({type: ERROR , payload: err.message})
    }
}

const removeCart = async (dispatch,email) => {
    try{
        const {data} = await axios.post('/api/user/removeCart',{email})
         dispatch({type: REMOVE_CART,payload: data});
         localStorage.setItem('userSignIn', JSON.stringify(store.getState().userSignIn.userInfo));
}
    catch (err) {
        dispatch({type: ERROR , payload: err.message})
    }
}

export {addToCart,removeFromCart,removeCart};