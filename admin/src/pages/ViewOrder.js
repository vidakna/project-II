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

  if(!loading && orderState) {
    return (
        <div>
          <h3 className="mb-4 title">{orderState?.orderStatus}</h3>
          <div className="card">
            <h5 className="card-header">RS : {orderState?.paymentIntent.amount} {orderState?.paymentIntent.status}</h5>
            <div className="card-body">
              {orderState?.products.map((e)=>{
                return(
                    <div>{e.product}</div>
                )
              })}
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
