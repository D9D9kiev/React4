import React from "react";
import { useSelector } from "react-redux";

import ProductList from "../../components/productList";
import { selectCart } from "../../store/selectors";

import "./Cart.scss";

const Cart = ({ removeFromCartModal, addToFavourite, favouriteItems }) => {
  const cartItems = useSelector(selectCart);

  return (
    <>
      {cartItems.length > 0 ? (
        <ProductList
          items={cartItems}
          onClickBtn={removeFromCartModal}
          addToFavourite={addToFavourite}
          favouriteItems={favouriteItems}
          btnContent={{ backGroundColor: "blue", title: "Remove from Cart" }}
        />
      ) : (
        <div className="products__list--empty">No products in cart</div>
      )}
    </>
  );
};

export default Cart;
