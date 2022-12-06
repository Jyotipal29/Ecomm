import React from "react";
import "./category.css";
import img1 from "../image/w-2.png";
import img2 from "../image/men-1.png";
import img3 from "../image/kids-1.png";
import { Link } from "react-router-dom";
const Category = () => {
  return (
    <div className="cat-container">
      <h2 className="cat-heading">Categories</h2>
      <div className="cat-wrapper">
        <div className="cat-row">
          <Link to="/products" style={{ color: "inherit" }}>
            <div className="cat-col-3">
              <img src="https://m.media-amazon.com/images/I/61QWC057X0L._UX679_.jpg" />
              <p className="cat-nm">WoMen</p>
            </div>
          </Link>
          <Link to="/products" style={{ color: "inherit" }}>
            <div className="cat-col-3">
              <img src="https://m.media-amazon.com/images/I/71WmwSot-vL._UY879_.jpg" />
              <p className="cat-nm">Men</p>
            </div>
          </Link>
          <Link to="/products" style={{ color: "inherit" }}>
            <div className="cat-col-3">
              <img src="https://m.media-amazon.com/images/I/611JZO5fsEL._UX679_.jpg" />
              <p className="cat-nm">kids</p>
            </div>
          </Link>

          {/* <div className="cat-col-3">
            <img src={img1} />
            <p className="cat-nm">WoMen</p>
          </div>
          <div className="cat-col-3">
            <img src={img3} />
            <p className="cat-nm">Kids</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Category;
