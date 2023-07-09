import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">එළිදැක්වීමට නියමිත Google Pixel 8 සහ Pixel 8 Proහි තොරතුරු කිහිපයක් අන්තර්ජාලයට නිකුත් වෙයි</h3>
              <img src={blog} className="img-fluid w-50 my-4 "  alt="blog" />
              <p>
              මෙම වසරේ පැමිණීමට නියමිත Google Pixel 8 සහ Pixel 8 Pro Camera සඳහා Samsung ISOCELL GN2 Sensor එක භාවිතා කරනු ලබනවා. මෙය ISOCELL GN1 Sensor එකට වඩා විශාලවන අතර 35% වඩා වැඩි අඩු ආලෝකයක් සහිත ඡායාරූප ග්‍රහණය කළ හැක. මෙයින් 8K/30fps දක්වා Video Record කිරීමේ හැකියාවද පවතිනවා.
              Google Pixel 8 Pro හි පිටුපස මදක් විශාල Sensorවලින් යුත් Camera තුනකින් සමන්විත බව මෙම ඡායාරූපයේ දැක්වෙනවා. Pixel 7Pro හි Telephoto Lens එක වෙන් වෙන් වශයෙන් පැවතියද Pixel 8 Proහි ඕවලාකාර හැඩයෙන් යුත් සම්පූර්ණ තනි වීදුරුවකින් Camara තුනම ආවරණය කර ඇති අතර දැනට පවතින තොරතුරුවලට අනුව 50MP Main Sensor, 64MP Ultra-Wide, සහ 5x Telephoto Lens එකකින් සමන්විත වනවා.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
