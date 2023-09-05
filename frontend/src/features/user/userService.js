import axios from "axios";
import {base_url, config} from "../../utills/axiosConfig";

const register=async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData);

    if(response.data){
        if (response.data){
            localStorage.setItem("customer",JSON.stringify(response.data));
        }
        
        return response.data;
    }
};
const login=async(userData)=>{
    const response = await axios.post(`${base_url}user/login`, userData);

    if(response.data){
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
};
const getUserWishlist = async () =>{
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if(response.data){
        console.log(response.data)
        return response.data;
    }
};

const getOrders = async () =>{
    const response = await axios.get(`${base_url}user/get-Orders`, config);

    if(response.data){
        return response.data;
    }

};

const getSingleUser= async (id) =>{
    const response = await axios.get(`${base_url}user/single/${id}`, config);

    if(response.data){
        return response.data;
    }

};

export const authService={
    register,
    login,
    getUserWishlist,
    getOrders,
    getSingleUser
};