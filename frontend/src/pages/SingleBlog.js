import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const blogState = useSelector((state) => state.blog.blog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getABlog(getBlogId));
  }, [dispatch, getBlogId]);

  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              
              <h3 className="title">{blogState?.title}</h3>
              {blogState?.imageURL && (
                <img
                  src={blogState.imageURL} // Use the imageURL from the Redux store
                  className="img-fluid w-50 my-4"
                  alt="blog"
                />
              )}
              
              {/* Properly formatting the dangerouslySetInnerHTML */}
              <p dangerouslySetInnerHTML={{ __html: blogState?.description }}></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
