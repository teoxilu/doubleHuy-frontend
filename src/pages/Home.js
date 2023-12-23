import React from "react";
import JumboTron from "../components/cards/JumboTron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-info h1 display-3 font-weight-bolder text-center">
        <JumboTron text={["DoubleHuy Shoes", "GIÁ HẤP DẪN", "CHÍNH HÃNG 100%"]} />
      </div>

      <h4 className="text-center p3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="text-center p3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>

      <BestSellers />

      <h4 className="text-center p3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>

      <CategoryList />

      <h4 className="text-center p3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>

      <SubList />

      <br/>
      <br/>
    </>
  );
};

export default Home;
