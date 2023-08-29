import watch from "../images/watch.jpg";
import Color from "./Color";
import React from "react";


export function CompareCard({item, keyC}) {

    console.log(keyC)

    const removeItem = (keyR) =>{
        localStorage.removeItem(keyR)
        const elem = document.getElementById(keyC);
        elem.classList.add("d-none")
    }

    if(item != null) {
        return (
            <div className="compare-product-card position-relative prodCardDis" id={keyC}>
                <img
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                    onClick={() => removeItem(keyC)}
                />
                <div className="product-card-image">
                    <img style={{height: "100px"}} src={item?.images[0]?.url} alt="watch"/>
                </div>
                <div className="compare-product-details">
                    <h5 className="title" style={{height: "150px"}}
                        dangerouslySetInnerHTML={{__html: item?.description}}>
                    </h5>
                    <h6 className="price mb-3 mt-3">Rs. {item?.price}</h6>

                    <div>
                        <div className="product-detail">
                            <h5>Brand:</h5>
                            <p>{item?.brand}</p>
                        </div>
                        <div className="product-detail">
                            <h5>Type:</h5>
                            <p>{item?.category}</p>
                        </div>
                        <div className="product-detail">
                            <h5>Availablity:</h5>
                            {item?.quantity > 0 ? (<p>In Stock</p>) : <p>Out Stock</p>}

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

