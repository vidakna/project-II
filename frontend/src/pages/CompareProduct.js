import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import {CompareCard} from "../components/CompareCard";

const CompareProduct = () => {

  const [selectedProduct1 , setSelectedProduct1] = useState(null);
  const [selectedProduct2 , setSelectedProduct2] = useState(null);

  const loadLocalProduct = () => {
      setSelectedProduct1(JSON.parse(localStorage.getItem("item1")))
      setSelectedProduct2(JSON.parse(localStorage.getItem("item2")))
    console.log(selectedProduct1,selectedProduct2)
  }

  useEffect(() =>{
    loadLocalProduct();
  } , [])

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
         
          <div className="col-3">
            {/*<div className="compare-product-card position-relative">*/}
            {/*  <img*/}
            {/*    src="images/cross.svg"*/}
            {/*    alt="cross"*/}
            {/*    className="position-absolute cross img-fluid"*/}
            {/*  />*/}
            {/*  <div className="product-card-image">*/}
            {/*    <img src={watch} alt="watch" />*/}
            {/*  </div>*/}
            {/*  <div className="compare-product-details">*/}
            {/*    <h5 className="title">*/}
            {/*    The Haylou RS4 Plus with a 368*448 Pixel’s unprecedented visual clarity.*/}
            {/*    </h5>*/}
            {/*    <h6 className="price mb-3 mt-3">Rs.15500</h6>*/}

            {/*    <div>*/}
            {/*      <div className="product-detail">*/}
            {/*        <h5>Brand:</h5>*/}
            {/*        <p>Haylou</p>*/}
            {/*      </div>*/}
            {/*      <div className="product-detail">*/}
            {/*        <h5>Type:</h5>*/}
            {/*        <p>Watch</p>*/}
            {/*      </div>*/}
            {/*      <div className="product-detail">*/}
            {/*        <h5>Availablity:</h5>*/}
            {/*        <p>In Stock</p>*/}
            {/*      </div>*/}
            {/*      <div className="product-detail">*/}
            {/*        <h5>Color:</h5>*/}
            {/*        <Color />*/}
            {/*      </div>*/}
            {/*      <div className="product-detail">*/}
            {/*        <h5>Size:</h5>*/}
            {/*        <div className="d-flex gap-10">*/}
            {/*          <p>S</p>*/}
            {/*          <p>M</p>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <CompareCard item = {selectedProduct1} keyC = "item1"></CompareCard>
          </div>
            
          <div className="col-3">
            <CompareCard item = {selectedProduct2} keyC = "item2"></CompareCard>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
