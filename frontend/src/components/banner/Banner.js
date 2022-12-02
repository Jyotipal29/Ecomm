import React from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import "./banner.css";
import img from "../image/dress-2.png";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="banner-row">
      <div className="banner-col-2">
        <img src={img} />
      </div>
      <div className="banner-col-2">
        <h2>
          Exlusive Sales are <br></br>
          now
          <span className="banner-br"> live</span>
        </h2>
        <p>Shop only @499</p>
        <button className="banner-btn">
          <Link to="/products" style={{ color: "inherit" }}>
            Shop Now
          </Link>

          {/* <ArrowForwardOutlinedIcon className="banner-ar" /> */}
        </button>
      </div>
    </div>
  );
};

export default Banner;
