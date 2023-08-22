import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from "react-redux";
// import { getUserCart, getWishlist } from "../../../backendII/controller/userCtrl";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";

const wishlistSelector = state =>
  state?.auth?.user?.wishlist?.wishlist || [];

const memoizedWishlistSelector = createSelector(
  wishlistSelector,
  wishlist => wishlist
);

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const  getWishlistFromDb =() =>{
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector(memoizedWishlistSelector);

  const removeFromWishlist = id => {
    dispatch(addToWishlist(id)).then((action) => {
      if (addToWishlist.fulfilled.match(action)) {
        dispatch(getUserProductWishlist());
      }
    });
  }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">{
          wishlistState && wishlistState.length=== 0 && <div className="text-center fs-3">
            No Data
            </div>
        }{
          wishlistState && wishlistState?.map((item,index) =>{
            return(
              <div className="col-3" key={index}>
              <div className="wishlist-card position-relative">
                <img onClick={()=>{removeFromWishlist(item?._id);
                }}
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image bg-white">
                <img
  src={item?.images[0]?.url}
  // onError={(e) => {
  //   e.target.src = "images/watch.jpg"; // Fallback image in case of an error
  // }}
  className="img-fluid d-block mx-auto"
  width={160}
  alt="watch"
/>
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                  {item?.title}
                  </h5>
                  <h6 className="price">Rs.{item?.price}</h6>
                </div>
              </div>
            </div>
            )
          })
        }
         
         
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
