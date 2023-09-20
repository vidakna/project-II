import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import Container from "../components/Container";
import {authService} from "../features/user/userService";
import {productService} from "../features/products/productService";
import {OrderHistoryConponent} from "../components/orderHistoryConponent";



const Cart = () => {

  const [orderHistory , setOrderHistory] = useState([]);
  const [loading , setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token") == null){
      navigate('/login');
    }
  })

  useEffect(() => {
    // load orders
    if (loading) {
      getOrders();
    }
  }, []);

  // useEffect(() => {
  //   console.log(orderHistory);
  // }, [orderHistory]);

  const getOrders = () => {
    authService.getOrders().then((wi) => {
      setOrderHistory(wi);
      setLoading(false);
    }).catch((e)=>{
      console.log(e)
    });
  };

  const [cart , setCart] = useState(null)
  const [isCartLoading , setIsCartLoading] = useState(true)
  useEffect(()=>{
      getCartInfo();
  } , [])


  const [totalPrice, setTprice] = useState(0);
  const getCartInfo = () => {
    if (isCartLoading) {
      const cart1 = localStorage.getItem("cart")
      const cartJSON = JSON.parse(cart1);
      setCart(cartJSON);
      if (cart) {
        var p = 0;
        cartJSON.map((k) => {
          p = p + (k.selectedQty * k.price)

        })

        setTprice(p)
        setLoading(false);
      }
    }
  }

  let b = 0;
  const test = (a) =>{
    b = b +a;
    localStorage.setItem('cartPrice' , b);
    return a;
  }

  const removeItems = (id) => {
    console.log(id);
    const cart1 = localStorage.getItem("cart");
    const cartJSON = JSON.parse(cart1);

    const updatedCartJSON = cartJSON.filter(item => item._id !== id);

    const cartString = JSON.stringify(updatedCartJSON);
    localStorage.setItem('cart', cartString);
    window.location.reload();
  }


  if(!loading) {
    return (
        <>
          <Meta title={"Cart"}/>
          <BreadCrumb title="Cart"/>
          <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>

                {cart && cart.map((obj) =>{
                  return (
                      <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                          <div className="w-25">
                            {obj && obj.images && obj.images.length > 0 ? (
                                <img src={obj.images[0]} className="img-fluid" alt="product image" />
                            ) : (
                                <span>No product image available</span>
                            )}
                          </div>
                          <div className="w-75">
                            <p>{obj.title}</p>
                            <p>{obj.brand}</p>
                            {/*<p>Color: Red</p>*/}
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">{obj.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input
                                disabled={true}
                                className="form-control"
                                type="number"
                                name=""
                                value={obj.selectedQty}
                                min={1}
                                max={10}
                                id=""
                            />
                          </div>
                          <div>
                            <AiFillDelete onClick={()=>removeItems(obj._id)} className="text-danger "/>
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">{test(obj.price * obj.selectedQty)}</h5>
                        </div>
                      </div>
                  )
                })}


              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/product" className="button">
                    Continue To Shopping
                  </Link>
                  <div className="d-flex flex-column align-items-end">
                    <h4>SubTotal: {b}</h4>
                    <p>shipping calculated at checkout</p>
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            <h3>My Order History</h3>

            {orderHistory.map((e) =>{
              return (
                  <div className="card mb-2">
                    <div className="card-body">
                      <h5 className="card-title">{e.orderStatus}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{e.paymentIntent.currency} : {e.paymentIntent.amount}</h6>
                      {e.products.map((r)=>{
                        return <OrderHistoryConponent props={r}></OrderHistoryConponent>;
                      })}
                    </div>
                  </div>
              )
            })}
          </Container>
        </>
    );
  }else{
    return (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    )
  }
};

export default Cart;
