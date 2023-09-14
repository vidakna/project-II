import axios from "axios";
import {base_url} from "../../utills/axiosConfig";


export const addToCartLocal = (product , count) =>{

    // get localstorage
    const cart = localStorage.getItem("cart")
    if(cart){

        // Convert the JSON string back to an object
        const retrievedCart = JSON.parse(cart);

        retrievedCart.push(product)

        const cartJSON = JSON.stringify(retrievedCart);

        // Save it to localStorage
        localStorage.setItem('cart', cartJSON);
    }else{
        const cart = [product]

        const cartJSON = JSON.stringify(cart);

        // Save it to localStorage
        localStorage.setItem('cart', cartJSON);
    }

}