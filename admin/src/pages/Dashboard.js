import React, {useEffect, useState} from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import axios from "axios";
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
  // {
  //   title: "Product",
  //   dataIndex: "product",
  // },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Shehan De Silva ${i}`,
//     product: 32,
//     staus: `Kandy Road,Peradeniya. ${i}`,
//   });
// }
const Dashboard = () => {
  // const data = [
  //   {
  //     type: "Jan",
  //     sales: 38,
  //   },
  //   {
  //     type: "Feb",
  //     sales: 52,
  //   },
  //   {
  //     type: "Mar",
  //     sales: 61,
  //   },
  //   {
  //     type: "Apr",
  //     sales: 145,
  //   },
  //   {
  //     type: "May",
  //     sales: 48,
  //   },
  //   {
  //     type: "Jun",
  //     sales: 38,
  //   },
  //   {
  //     type: "July",
  //     sales: 38,
  //   },
  //   {
  //     type: "Aug",
  //     sales: 38,
  //   },
  //   {
  //     type: "Sept",
  //     sales: 38,
  //   },
  //   {
  //     type: "Oct",
  //     sales: 38,
  //   },
  //   {
  //     type: "Nov",
  //     sales: 38,
  //   },
  //   {
  //     type: "Dec",
  //     sales: 38,
  //   },
  // ];
  const [data1 , setData1] = useState([])
  const [data , setDate] = useState([])
  const [isloadin , setIsloading] = useState(true)
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#5F336C";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };


  useEffect(()=>{
      if(isloadin) {
        getIncomeChartData();
        getLatestOrder();
      }
  },[])
  const getIncomeChartData  = () =>{
    axios.get(`${base_url}user/getMonthWiseOrder`).then((res)=>{
      setDate(res.data)
      setIsloading(false)
    })
  }

  const getLatestOrder = () =>{
    axios.get(`${base_url}user/get-all-orders`).then((res)=>{
      const a = []
      res.data.map((obj , key)=>{
        a.push({
          key: key,
          name: obj.orderby.firstname,
          product: 32,
          staus: obj.paymentIntent.status,
        });
      })

      setData1(a)
    })
  }

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {/*<div className="d-flex justify-content-between align-items-center gap-3">*/}
      {/*  <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">*/}
      {/*    <div>*/}
      {/*      <p className="desc">Total</p>*/}
      {/*      <h4 className="mb-0 sub-title">Rs. 1100</h4>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex flex-column align-items-end">*/}
      {/*      <h6>*/}
      {/*        <BsArrowDownRight /> 32%*/}
      {/*      </h6>*/}
      {/*      <p className="mb-0  desc">Compared To July 2023</p>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">*/}
      {/*    <div>*/}
      {/*      <p className="desc">Total</p>*/}
      {/*      <h4 className="mb-0 sub-title">Rs. 1100</h4>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex flex-column align-items-end">*/}
      {/*      <h6 className="red">*/}
      {/*        <BsArrowDownRight /> 32%*/}
      {/*      </h6>*/}
      {/*      <p className="mb-0  desc">Compared To August 2023</p>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">*/}
      {/*    <div>*/}
      {/*      <p className="desc">Total</p>*/}
      {/*      <h4 className="mb-0 sub-title">Rs. 1100</h4>*/}
      {/*    </div>*/}
      {/*    <div className="d-flex flex-column align-items-end">*/}
      {/*      <h6 className="green">*/}
      {/*        <BsArrowDownRight /> 32%*/}
      {/*      </h6>*/}
      {/*        <p className="mb-0  desc">Compared To July 2023</p>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
