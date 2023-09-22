import React, {useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import {base_url, config} from "../utills/axiosConfig";
const Forgotpassword = () => {

  const [email , setEmail] = useState("");

  const reset = (e) =>{
    e.preventDefault()

    const body  = {
      "email" : email
    }

    axios.post(`http://localhost:5000/api/user/password-reset`, body)
        .then((res) => {
          alert("PASSWORD CHANGED");
        })
        .catch((e) => {
          console.log(e);
          alert("SOMETHING WENT WRONG");
        });


  }


  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={reset} action="" className="d-flex flex-column gap-15">
                <CustomInput value={email} onChange ={(e)=>setEmail(e.target.value)} type="email" required = {true} name="email" placeholder="Email" />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit" >
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
