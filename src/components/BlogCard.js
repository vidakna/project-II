import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">7 july, 2023</p>
        <h5 className="title">එළිදැක්වීමට නියමිත Google Pixel 8 සහ Pixel 8 Proහි තොරතුරු කිහිපයක් අන්තර්ජාලයට නිකුත් වෙයි</h5>
        <p className="desc">
        Google සමාගම විසින් නිකුත් කිරීමට නියමිත නවතම Google Pixel 8 Pro ජංගම දුරකතනයේ ඡායාරූපයක් Google සමාගම සමඟ අනුබද්ධ අයෙක් විසින් Redditහි පළකර තිබෙනවා. මෙහි පිටුපස "for test/evaluation only" ලෙස Sticker එකක් අලවා ඇති අතර එහි "Zuma - B1" ලෙසද කේතයක් සඳහන් වනවා.
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
