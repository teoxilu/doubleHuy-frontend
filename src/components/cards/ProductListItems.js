import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductListItems = ({ product }) => {
  const { price, category, subs, brand, quantity, sold } =
    product;
    const sizes = [
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
        "36",
    ]
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill float-right">
          {price} VND
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill float-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Cagetories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill float-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}


      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill float-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available{" "}
        {quantity < 0 ? (<span className="label label-default label-pill float-right">
          0
        </span>) : (<span className="label label-default label-pill float-right">
        {quantity}
        </span>)}
        
      </li>

      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill float-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
