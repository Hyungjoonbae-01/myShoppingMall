import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={() => showProduct(item._id)}>
      <div className="product-image-wrapper">
        <img src={item?.image} alt={item?.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{item?.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
