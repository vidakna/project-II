import React, {useEffect, useState , useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import logo from "../images/logo.png";
import axios from "axios";
import {base_url} from "../utills/axiosConfig";
import view from "../images/view.svg";
const Header = () => {

  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const dropdownRef = useRef(null);
  const [isToken , setIsToken] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("token") == null){
      setIsToken(false);
    }else {
      setIsToken(true)
      setCartPrice(parseInt(localStorage.getItem("cartPrice") == null ? 0 : localStorage.getItem("cartPrice")))
    }
  })


  const [products , setproducts] = useState([]);


  useEffect(()=>{
    axios.get(`${base_url}product`).then((res) =>{
      setproducts(res.data)
    })
  } , [])


  // Function to filter products based on user input
  const filterProducts = (input) => {
    const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
    );
    if(input != "") {
      setFilteredProducts(filtered);
    }else{
      setFilteredProducts([])
    }
  };

  // Event handler for input changes
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    filterProducts(inputValue);
  };

  const clearInput = () => {
    searchInput("")
  }

  const logout = () =>{
    localStorage.removeItem("token")
    window.location.reload(true)
  }


  return (
    <>
     
      <header className="header-upper py-3">
         <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
            <Link
                    to="/"
                    className="d-flex align-items-center gap-10 text-white "
                  >
            <img class="logo" src={logo} alt="Logo" />
            </Link>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={searchInput}
                  onChange={handleInputChange}
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
              {filteredProducts.length > 0 && (
                  <ul className="list-group mt-2" style={{ zIndex: 100 , position: 'absolute'}}>
                    {filteredProducts.map((product) => (
                        <li key={product.id} className="list-group-item">
                          <Link to={'/product/'+product?._id} className="border-0 bg-transparent event" onClick={clearInput}>
                            {product.title}
                          </Link>
                        </li>
                    ))}
                  </ul>
              )}

            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  {isToken && (
                      <>

                        <div onClick={logout}>
                          <Link
                              to={"/login"}
                              className="d-flex align-items-center gap-10 text-white"
                          >
                          <img src={user} alt="user" />
                          <p className="mb-0">
                            Log out <br /> My Account
                          </p>
                          </Link>
                        </div>

                      </>
                  )}

                  {!isToken && (
                      <>
                        <Link
                            to="/login"
                            className="d-flex align-items-center gap-10 text-white"
                        >
                          <img src={user} alt="user" />
                          <p className="mb-0">
                            Log in <br /> My Account
                          </p>
                        </Link>
                      </>
                  )}

                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      {/*<span className="badge bg-white text-dark">0</span>*/}
                      {/*<p className="mb-0">Rs {cartPrice}</p>*/}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
        
      </header>
     
      
    </>
  );
};

export default Header;
