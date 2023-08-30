import React, {useEffect, useState} from "react";
import {productService} from "../features/products/productService";

export function OrderHistoryConponent ({props}) {

    const [singleObj , setSingleObj] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            loadSingleProduct();
        }
    }, [loading]);

    const loadSingleProduct = () => {
        console.log(props.product)
        // productService.getSingleProduct(props.product).then((po) => {
        //     console.log(po);
        //     setSingleObj(po);
        //     setLoading(false);
        // });
        setSingleObj(props.product)
        setLoading(false)
    };

    if(!loading){
        return (
            <>
                <div className="card mb-2">
                    <div className="card-header">
                        {singleObj?.title}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{singleObj?.category}</li>
                        <li className="list-group-item">{singleObj?.description && singleObj.description.replace(/<[^>]+>/g, '')}</li>
                        <li className="list-group-item">{singleObj?.price} x {singleObj?.quantity}</li>
                    </ul>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }


}