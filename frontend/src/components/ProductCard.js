// import React from "react";
// import ReactStars from "react-rating-stars-component";
// import { Link, useLocation } from "react-router-dom";
// import prodcompare from "../images/prodcompare.svg";
// import wish from "../images/wish.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch1.jpg";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";

// const ProductCard = (props) => {
//   const { grid, data } = props;
//   console.log(data);
//   let location = useLocation();

//   // Check if data is truthy and an array
//   if (!data || !Array.isArray(data)) {
//     return null; // Or return an error message or placeholder component
//   }

//   return (
//     <>
//       {data.map((item, index) => {
//         // Add a check to ensure item has a description property
//         const description = item?.description || "";
//         const imageUrl = item?.images?.length > 0 ? item.images[0].url : "";

//         return (
//           <div
//             key={index}
//             className={` ${
//               location.pathname === "/product" ? `gr-${grid}` : "col-3"
//             } `}
//           >
//             <Link
//               to={
//                 location.pathname === "/"
//                   ? "/product/:id"
//                   : location.pathname === "/product/:id"
//                   ? "/product/:id"
//                   : ":id"
//               }
//               className="product-card position-relative"
//             >
//               <div className="wishlist-icon position-absolute">
//                 <button className="border-0 bg-transparent">
//                   <img src={wish} alt="wishlist" />
//                 </button>
//               </div>
//               <div className="product-image">
//                 <img src={item?.images[0].url} className="img-fluid  mx-auto" alt="product image" width={160} />
//                 {/* <img src={watch2} className="img-fluid  mx-auto" alt="product image" width={160} /> */}
//               </div>
//               <div className="product-details">
//                 <h6 className="brand"> {item?.brand}</h6>
//                 <h5 className="product-title">
//                 {item?.title}
//                 </h5>
//                 <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700" />
//                 <p
//                   className={`description ${
//                     grid === 12 ? "d-block" : "d-none"
//                   }`}dangerouslySetInnerHTML={{ __html: description }}
//                 >
                 
//                 </p>
//                 <p className="price">RS.{item?.price}</p>
//               </div>
//               <div className="action-bar position-absolute">
//                 <div className="d-flex flex-column gap-15">
//                   <button className="border-0 bg-transparent">
//                     <img src={prodcompare} alt="compare" />
//                   </button>
//                   <button className="border-0 bg-transparent">
//                     <img src={view} alt="view" />
//                   </button>
//                   <button className="border-0 bg-transparent">
//                     <img src={addcart} alt="addcart" />
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ProductCard;

import React, {useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch1.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;


  const removeOver = () =>{
    const modalBackdrop = document.querySelector(".modal-backdrop.show");
    if (modalBackdrop !== null) {
      modalBackdrop.classList.remove("show");
      modalBackdrop.classList.add("d-none")
    }
  }

  console.log(data);
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish= (id) =>{
    // alert(id);
    dispatch(addToWishlist(id));
  };

  // Check if data is truthy and an array
  if (!data || !Array.isArray(data)) {
    return null; // Or return an error message or placeholder component
  }

  return (
    <>
      {data.map((item, index) => {
        // Add checks to ensure item.images exists and contains at least one image
        const imageUrl = item?.images?.length > 0 ? item.images[0].url : "";

        return (
          <div
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div
            
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e)=>{addToWish(item?._id);
                }}>
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="img-fluid mx-auto"
                    alt="product image"
                    width={300}
                  />
                )}
               <img src={imageUrl} className="img-fluid mx-auto" alt="product image" width={300} />
              </div>
              <div className="product-details">
                <h6 className="brand"> {item?.brand}</h6>
                <h5 className="product-title">{item?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">RS.{item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <Link to={'/product/'+item?._id} className="border-0 bg-transparent event" onClick={removeOver}>
                    <img src={view} alt="view" />
                  </Link>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;