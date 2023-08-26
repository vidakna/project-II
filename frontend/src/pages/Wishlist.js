import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {createSelector} from 'reselect';
import {useDispatch, useSelector} from "react-redux";
// import { getUserCart, getWishlist } from "../../../backendII/controller/userCtrl";
import {getUserProductWishlist} from "../features/user/userSlice";
import {addToWishlist} from "../features/products/productSlice";
import {authService} from "../features/user/userService";

const wishlistSelector = state =>
    state?.auth?.user?.wishlist?.wishlist || [];

const memoizedWishlistSelector = createSelector(
    wishlistSelector,
    wishlist => wishlist
);

const Wishlist = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [wishlistState , setWishlistState] = useState([])
    const [reload , setReload] = useState(false)

    useEffect(() => {
        // getWishlistFromDb();
        if (loading) {
            getWishlistFromDbNew();
        }
    }, [reload]);

    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist());
    };
    // let wishlistState = [];

    const removeFromWishlist = id => {
        dispatch(addToWishlist(id)).then((action) => {
            if (addToWishlist.fulfilled.match(action)) {
                dispatch(getUserProductWishlist());
            }
            setLoading(true);
            setReload(!reload);

        });
    }

    const getWishlistFromDbNew = () => {
        authService.getUserWishlist().then((wi) => {
          setWishlistState( wi.wishlist);
            setLoading(false)
        })
    }


    if (loading) {
        return <div className="text-center fs-3">No Data</div>;
    }

    // Once isLoading becomes false, the actual component content will be rendered
    return (
        <div>
          <Meta title={"Wishlist"} />
          <BreadCrumb title="Wishlist" />
          <Container class1="wishlist-wrapper home-wrapper-2 py-5">
            {wishlistState.map((item, index) => (
                    <div className="col-3" key={index}>
                        <div className="wishlist-card position-relative">
                            <img onClick={() => {
                                removeFromWishlist(item?._id);
                            }}
                                 src="images/cross.svg"
                                 alt="cross"
                                 className="position-absolute cross img-fluid"
                            />
                            <div className="wishlist-card-image bg-white">
                                <img
                                    src={item?.images[0]?.url}
                                    onError={(e) => {
                                      e.target.src = "images/watch.jpg"; // Fallback image in case of an error
                                    }}
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
            ))}
          </Container>
        </div>
    );
};

export default Wishlist;
