import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import unknown from "../../images/unknown.jpg";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    //create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is in local storage, GET
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new products to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to localstorage
      localStorage.setItem("cart", JSON.stringify(unique));

      //show Tooltip
      setTooltip("Added!");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      //show cart item in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  //destructure
  const { images, title, description, slug, price } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No ratings yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : unknown}
            style={{ height: "230px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <button className="btn mb-2"
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined className="text-danger" /> <br />{" "}
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </button>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ${price} VND`}
          description={`${description && description.substring(0, 60)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
