import axios from "axios";
import { PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
      PRODUCT_LIST_FAIL,
       PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS, 
        UPDATE_COUNT_IN_STOCK}
         from "../constants/productConstants";

const list = async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
    const {data} = await axios.get(`/api/products`);
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch (err){
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message});
    }
}

const details = async (dispatch,productId) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST});
    try{
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch (err){
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message});
    }
}

const update = async (dispatch,id,qty) =>{
    await axios.post('/api/products/updateProducts');
    dispatch({type: UPDATE_COUNT_IN_STOCK})
}
export {list,details}

