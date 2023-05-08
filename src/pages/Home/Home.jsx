import React from "react";
import { useSelector } from "react-redux";

import ProductList from "../../components/productList";
import { selectProducts } from "../../store/selectors";

const Home = ({ addToCartModal, addToFavourite, favouriteItems }) => {
  const items = useSelector(selectProducts);
  console.log(items);

  return (
    <>
      <ProductList
        items={items}
        onClickBtn={addToCartModal}
        addToFavourite={addToFavourite}
        favouriteItems={favouriteItems}
        btnContent={{ backGroundColor: "red", title: "Add to Cart" }}
      />
    </>
  );
};

export default Home;
