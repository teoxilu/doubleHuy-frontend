import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  sizes: [
    "36",
    "37",
    "38",
    "39",
    "40",
    "40.5",
    "41",
    "41.5",
    "42",
    "42.5",
    "43",
    "43.5",
    "44",
  ],
  brands: [
    "Asics",
    "Bronze 56k",
    "Converse",
    "Vans",
    "Nike",
    "Last Resort AB",
    "Adidas",
    "Etnies",
    "Reebok",
  ],
  size: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  //state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      //load single product
      setValues({ ...values, ...p.data });
      //load single product category & subs
      if (p && p.data && p.data.category) {
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
      }
      //prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubIds((prev) => arr); //required for antd Select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title} "is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        toast.error(err.response.data.err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUBS OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });

    //if user clicks back to the original cagetory
    //show its subs cagetory by default
    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <br />

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
