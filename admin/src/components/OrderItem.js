import React, {useEffect, useState} from "react";
import axios from "axios";
import {base_url} from "../utils/baseUrl";
import {config} from "../utils/axiosconfig";

const OrderItem = ({productId , color , qty}) =>{

    const [item , setItem]  = useState(null);
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        if(loading){
            getItem();
        }
    },[])

    const getItem = () =>{
        axios
            .get(`${base_url}product/${productId}`, config)
            .then((re) => {
                setItem(re.data); // Make sure to extract the data from the response
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if(loading){
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (<div>
        <div className="card mb-2">
            <div className="card-header">
                {item?.title}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{item?.category}</li>
                <li className="list-group-item">{item?.description && item.description.replace(/<[^>]+>/g, '')}</li>
                <li className="list-group-item">{item?.price} x {qty}</li>
                <li className="list-group-item" ><span style={{backgroundColor:color , color:"transparent"}}>{color}</span></li>
            </ul>
        </div>
    </div>)

}

export default OrderItem;