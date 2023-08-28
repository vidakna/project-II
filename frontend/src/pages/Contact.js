import React, {useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import axios from "axios";
import {base_url} from "../utills/axiosConfig";

const Contact = () => {

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [mobile , setMobile] = useState("");
  const [comment , setComment] = useState("");

  const nameHandler = (event) =>{
      setName(event.target.value)
  }

  const emailHandler = (event) =>{
    setEmail(event.target.value)
  }

  const mobileHandler = (event) =>{
    setMobile(event.target.value)
  }

  const commentHandler = (event) =>{
    setComment(event.target.value)
  }

  const formHandler = (event) =>{
    event.preventDefault();

    const data = {
      name : name,
      email : email,
      mobile : mobile,
      comment : comment
    }

    axios.post(`${base_url}enquiry` , data).then((res) =>{
      alert("Your enquiries submitted")
      setName("")
      setEmail("")
      setMobile("")
      setComment("")
    }).catch((error) =>{
      console.error(error)
    })

  }

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8809043036817!2d80.44319337486422!3d7.2543930927522755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae31560531a8585%3A0x4e0d52fd60f8d518!2sEx%20Marketing!5e0!3m2!1sen!2slk!4v1688978245397!5m2!1sen!2slk" width="600" height="450"  className="border-0 w-100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formHandler}>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      required="true"
                      onChange={nameHandler}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required="true"
                      value={email}
                      onChange={emailHandler}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      required="true"
                      value={mobile}
                      onChange={mobileHandler}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      required="true"
                      value={comment}
                      onChange={commentHandler}
                    ></textarea>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                      EX Markerting, Kandy Road, Mawanella
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+94 77 54 32 498">+94 77 54 32 498 </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:dineshchathuranga@gmail.com">
                      dineshchathuranga@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – sunday 10 AM – 7 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
