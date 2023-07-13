import React from "react";
import { Link } from "react-router-dom";
import {  BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      {/* <footer className="py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h4 className="mb-0 text-white">Sign Up for Newsletter</h4>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-2">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  EX Markerting <br />Kandy Road <br /> Mawanella <br />
                  
                </address>
                <a
                  href="tel:+9 +94 775432498"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +94 77 54 32 498
                </a>
                <a
                  href="mailto:dineshchathuranga@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  dineshchathuranga@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-2">
                  <a className="text-white" href="#">
                    <BsFacebook className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                 
                  <a className="text-white" href="whatsapp://send?text=&phonHie=+94775432498">
                    <BsWhatsapp className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-1">Information</h4>
              <div className="footer-link d-flex flex-column">
              
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link className="text-white py-1 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-2">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-1 mb-1" href="#" >About Us</Link>
                <Link className="text-white py-1 mb-1" href="#">Faq</Link>
                <Link className="text-white py-1 mb-1" href="#">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-2">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-1 mb-1" href="#">Laptops</Link>
                <Link className="text-white py-1 mb-1" href="#">Headphones</Link>
                <Link className="text-white py-1 mb-1" href="#">Tablets</Link>
                <Link className="text-white py-1 mb-1" href="#">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
               Copyright Ex Markerting (Pvt) Ltd  &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
