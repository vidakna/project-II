import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import axios from "axios";
import {base_url, config} from "../utills/axiosConfig";

const Checkout = () => {

  const [cart , setCart] = useState(null)
  const [cartPrice , setCartPrice] = useState(0)
  const [isCartLoading , setIsCartLoading] = useState(true)

  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [address , setAddress] = useState("")
  const [phone , setPhone] = useState("")
  const [city , setCity] = useState("")
  const [zip , setZip ] = useState("")
  const [coupon , setCoupon ] = useState("")

  useEffect(()=>{
    getCartInfo();
  } , [])


  const getCartInfo = () =>{
    if(isCartLoading) {
      const cart1 = localStorage.getItem("cart")
      const cartJSON = JSON.parse(cart1);
      setCart(cartJSON);
      setCartPrice(parseInt(localStorage.getItem('cartPrice')));
      setIsCartLoading(false)
    }
  }

  const applyCoupon = (e) =>{
    e.preventDefault();
    // get coupon
    axios.get(`${base_url}coupon/getByName/${coupon}`).then((res)=>{
      const c = res.data.discount;
      setCartPrice(cartPrice * ((100 - c) / 100))
      alert("YOUR COUPON APPLIED")
    }).catch((e)=>{
      alert("YOUR COUPON IS INVALID")
    })
  }


  const placeOrder = (e) =>{
    e.preventDefault()
    const cartA = []
    cart.map((obj)=>{
      const o = {
        _id : obj._id,
        count : obj.selectedQty,
        color : obj.color,
      }

      cartA.push(o)
    })

    const body = {
      cart : cartA
    }

    console.log(cartA)

    axios.post(`${base_url}user/cart` , body ,config).then((res)=>{
      console.log("ok")
      localStorage.removeItem("cart")
      placeOrder()
    }).catch((e)=>{
      console.log(e)
      alert("ORDER PLACE ERROR")
    })

    const placeOrder = () =>{
      const body =
          {
            COD: true,
            couponApplied: true,
            firstName : firstName,
            lastName : lastName,
            address : address,
            phone : phone,
            city : city,
            zip : zip,
            orderPrice : cartPrice
          }

      axios.post(`${base_url}user/cart/cash-order` , body , config).then((res)=>{
        console.log("ok")
        alert("ORDER PLACE SUCCESS")

        setFirstName("")
        setLastName("")
        setAddress("")
        setPhone("")
        setCity("")
        setZip("")
        localStorage.setItem("cartPrice" , 0)
        // window.location.reload()
      }).catch((e)=>{
        console.log(e)
        alert("ORDER PLACE ERROR")
      })
    }

  }

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Exmarkerting</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Tharindu irugalbandara (madurangairugalbandara@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <h5>Your cart price : RS {cartPrice}</h5>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                {/* <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                  </select>
                </div> */}
                <div className="flex-grow-1">
                  <input
                      value={firstName}
                      onChange={(e)=>{setFirstName(e.target.value)}}
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e)=>{setLastName(e.target.value)}}
                    placeholder="Last Name"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                      value={address}
                      onChange={(e)=>{setAddress(e.target.value)}}
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                    placeholder="Telephone number"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                    placeholder="City"
                    className="form-control"
                  />
                </div>
                {/* <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                  </select>
                </div> */}
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={zip}
                    onChange={(e)=>{setZip(e.target.value)}}
                    placeholder="Zipcode"
                    className="form-control"
                  />
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                        style={{width:"200px"}}
                        type="text"
                        value={coupon}
                        onChange={(e)=>{setCoupon(e.target.value)}}
                        placeholder="coupon"
                        className="form-control"
                    />
                    <button className="button" onClick={applyCoupon}>
                      Apply coupon
                    </button>
                  </div>
                </div>


                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button className="button" onClick={placeOrder}>
                      Check Out
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            {/*<div className="border-bottom py-4">*/}
            {/*  <div className="d-flex gap-10 mb-2 align-align-items-center">*/}
            {/*    <div className="w-75 d-flex gap-10">*/}
            {/*      <div className="w-25 position-relative">*/}
            {/*        <span*/}
            {/*          style={{ top: "-10px", right: "2px" }}*/}
            {/*          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"*/}
            {/*        >*/}
            {/*          1*/}
            {/*        </span>*/}
            {/*        <img className="img-fluid" src={watch} alt="product" />*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        <h5 className="total-price">Haylou RS4 Plus</h5>*/}
            {/*        /!* <p className="total-price">s / #agfgfd</p> *!/*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="flex-grow-1">*/}
            {/*      <h5 className="total">Rs.12000</h5>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="border-bottom py-4">*/}
            {/*  <div className="d-flex justify-content-between align-items-center">*/}
            {/*    <p className="total">Subtotal</p>*/}
            {/*    <p className="total-price">Rs.12000</p>*/}
            {/*  </div>*/}
            {/*  <div className="d-flex justify-content-between align-items-center">*/}
            {/*    <p className="mb-0 total">Shipping</p>*/}
            {/*    <p className="mb-0 total-price">Rs.500</p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="d-flex justify-content-between align-items-center border-bootom py-4">*/}
            {/*  <h4 className="total">Total</h4>*/}
            {/*  <h5 className="total-price">Rs.12500</h5>*/}
            {/*</div>*/}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
