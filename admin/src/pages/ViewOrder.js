import React, {useEffect, useState} from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import axios from "axios";
import {base_url} from "../utils/baseUrl";
import {config} from "../utils/axiosconfig";
import OrderItem from "../components/OrderItem";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  const [orderState , setOrderStatus] = useState(null)
  const [loading , setLoading] = useState(true)

  console.log(userId)
  useEffect(() => {
    if (loading) {
      getSingleOrder();
    }
  }, []);

  const getSingleOrder = () => {
    axios
        .get(`${base_url}user/getOrderById/${userId}`, config)
        .then((re) => {
          setOrderStatus(re.data); // Make sure to extract the data from the response
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    console.log(orderState);
  }, [orderState]);

  // const data1 = [];
  //
  //   data1.push({
  //     name: orderState?.product?.title,
  //     brand: orderState?.product?.brand,
  //     count: orderState?.count,
  //     amount: orderState?.product?.price,
  //     color: orderState?.product?.color,
  //     date: orderState?.product?.createdAt,
  //     action: (
  //       <>
  //         <Link to="/" className=" fs-3 text-danger">
  //           <BiEdit />
  //         </Link>
  //         <Link className="ms-3 fs-3 text-danger" to="/">
  //           <AiFillDelete />
  //         </Link>
  //       </>
  //     ),
  //   });

  const changeStatus = (r) =>{
    const data = {
      status:r
    }

    console.log(`${base_url}user/order/update-order/${orderState?._id}`)
    axios.put(`${base_url}user/order/update-order/${orderState?._id}` , data , config).then((res) =>{
      window.location.reload(true)
    }).catch((e)=>{
      console.error(e)
      alert("ORDER UPDATE FAIL")
    })
  }

  if(!loading && orderState) {
    return (
        <div>
          <h3 className="mb-4 title">{orderState?.orderStatus}</h3>
          <div className="card">
            <h5 className="card-header"> {orderState?.paymentIntent.status}</h5>
            <div className="card-body">
              {orderState?.products.map((e)=>{
                return(
                    <div>
                      <OrderItem productId={e.product} color={e.color} qty = {e.count}></OrderItem>
                    </div>
                )
              })}
              {/*{orderState?.paymentIntent.amount}*/}

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Rs : </div>
                <div style={{minWidth: "400px"}}>{orderState?.orderPrice}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Year : </div>
                <div style={{minWidth: "400px"}}>{orderState?.year}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Month : </div>
                <div style={{minWidth: "400px"}}>{orderState?.month}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>First name : </div>
                <div style={{minWidth: "400px"}}>{orderState?.firstName}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Last name : </div>
                <div style={{minWidth: "400px"}}>{orderState?.lastName}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Phone number : </div>
                <div style={{minWidth: "400px"}}>{orderState?.phone}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>City : </div>
                <div style={{minWidth: "400px"}}>{orderState?.city}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Zip : </div>
                <div style={{minWidth: "400px"}}>{orderState?.zipCode}</div>
              </div>

              <div style={{display: "flex", justifyContent: "space-between", width: "500px"}}>
                <div style={{minWidth: "100px"}}>Changed : </div>
                <div style={{minWidth: "400px"}}>
                  <select data-te-select-init name="test" id="test" onChange={(e) => changeStatus(e.target.value)} value={orderState?.orderStatus}>
                    <option value="Not Processed" >Not Processed</option>
                    <option value="Not Processed" >Not Processed</option>
                    <option value="Cash on Delivery" >Cash on Delivery</option>
                    <option value="Processing" >Processing</option>
                    <option value="Dispatched" >Dispatched</option>
                    <option value="Cancelled" >Cancelled</option>
                    <option value="Delivered" >Delivered</option>
                  </select>
                </div>
              </div>



            </div>
          </div>
        </div>
    );
  }else {
    <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }
};

export default ViewOrder;
