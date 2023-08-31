import React, {useEffect, useState} from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import authService from "../features/auth/authServices";
import axios from "axios";
import {config} from "../utils/axiosconfig"
import {base_url} from "../utils/baseUrl";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const[ orderState , setOrderStatus] = useState([]);
  const[ loading , setLoading] = useState(true);
  useEffect(() => {
    // dispatch(getOrders());
  if(loading){
    getOrders();
  }
  }, [loading]);

  const getOrders = () => {
    authService.getOrders().then((wi) => {
      setOrderStatus(wi);
      setLoading(false);
    });
  };

  const deleteOrder = (id) =>{
    console.log(id)
    axios.get(`${base_url}user/deleteOrder/${id}` , config).then((f) =>{
      alert("delete complete")
      setLoading(true)
    }).catch((e)=>{
      console.log(e)
    })
  }

  // const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];

  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.orderby?.firstname,
      
      product: (
        <Link to={`/admin/order/${orderState[i]?.orderby?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status:orderState[i].orderStatus,
      action: (
        <>
          <Link to={`../order/${orderState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button style={{background : "none" , border : "none"}} onClick={() => deleteOrder(orderState[i]?._id)} className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  if(!loading) {
    return (
        <div>
          <h3 className="mb-4 title">Orders</h3>
          <div>{<Table columns={columns} dataSource={data1}/>}</div>
        </div>
    );
  }
};

export default Orders;