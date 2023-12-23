import React from "react";
import ModalImage from "react-modal-image";
import unknown from "../../images/unknown.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const sizes = [
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "42.5",
    "43",
    "44",
    "40.5",
    "41.5",
    "43.5",
  ];

  const dispatch = useDispatch();

  const handleSizeChange = (e) => {
    console.log("size changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].size = e.target.value;
        }
      });

      //   console.log("cart updated size", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);

    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", heigth: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={unknown} large={unknown} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>{p.price} VND</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleSizeChange}
            name="size"
            className="form-control"
          >
            {p.size ? (
              <option value={p.size}>{p.size}</option>
            ) : (
              <option>Select</option>
            )}
            {sizes
              .filter((s) => s !== p.size)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control-plaintext"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
