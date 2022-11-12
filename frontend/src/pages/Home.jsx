import React from "react";
import Banner from "../components/banner/Banner";
import Products from "../components/products/Products";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
// import Products from "../components/Products";
import Slider from "../components/Slider";
import Category from "../components/category/Category";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <Category />
    </div>
  );
};

export default Home;
