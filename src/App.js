import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import AppRoutes from "./appRoutes";
import Header from "./components/header";
import Modal from "./components/modal";

import {
  selectCart,
  selectFavourites,
  selectModalContent,
  selectIsModalOpened,
  selectIsProductsLoaded,
} from "./store/selectors";

import {
  changeCartList,
  changeFavList,
  changeModalBool,
  changeModalContent,
  fetchProducts,
} from "./store/actions";

const getHistoryFromLS = (itemArr) => {
  const lsHistory = localStorage.getItem(itemArr);
  if (!lsHistory) {
    return [];
  }
  try {
    const value = JSON.parse(lsHistory);
    return value;
  } catch (error) {
    return [];
  }
};

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsProductsLoaded);
  const cart = useSelector(selectCart);
  const favourites = useSelector(selectFavourites);
  const isModalOpened = useSelector(selectIsModalOpened);
  const modalContent = useSelector(selectModalContent);

  useEffect(() => {
    dispatch(changeCartList(getHistoryFromLS("Cart")));
    dispatch(changeFavList(getHistoryFromLS("Favourites")));
    dispatch(fetchProducts("Apple.json"));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [cart, favourites]);

  const showModal = () => {
    dispatch(changeModalBool(true));
  };

  const addToCartModal = (item, nameOfProduct) => {
    dispatch(
      changeModalContent({
        header: "Confirmation",
        text: `Add ${nameOfProduct} to cart?`,
        actions: (
          <>
            <button
              type="button"
              className="modal__content__btn"
              onClick={(event) => addToCart(item)}
            >
              Yes
            </button>
            <button
              type="button"
              className="modal__content__btn"
              onClick={closeModal}
            >
              No
            </button>
          </>
        ),
      })
    );
    showModal();
  };

  const removeFromCartModal = (item, nameOfProduct) => {
    dispatch(
      changeModalContent({
        header: "Confirmation",
        text: `Remove ${nameOfProduct} from cart?`,
        actions: (
          <>
            <button
              type="button"
              className="modal__content__btn"
              onClick={(event) => removeFromCart(item)}
            >
              Yes
            </button>
            <button
              type="button"
              className="modal__content__btn"
              onClick={closeModal}
            >
              No
            </button>
          </>
        ),
      })
    );
    showModal();
  };

  const closeModal = () => {
    dispatch(changeModalBool(false));
  };

  const addToCart = (item) => {
    const newCart = [...cart, item];
    dispatch(changeCartList(newCart));
    closeModal();
  };

  const addToFavourite = (item) => {
    if (!favourites.find((favourite) => favourite.article === item.article)) {
      const newFavourites = [...favourites, item];
      dispatch(changeFavList(newFavourites));
    } else {
      removeFromFavorite(item);
    }
  };

  const removeFromCart = (item) => {
    const indexOfItem = cart.findIndex(
      (cartItem) => cartItem.article === item.article
    );
    const newCart = [...cart];
    console.log(newCart);
    newCart.splice(indexOfItem, 1);
    dispatch(changeCartList(newCart));
    closeModal();
  };

  const removeFromFavorite = (item) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.article !== item.article
    );
    dispatch(changeFavList(newFavourites));
  };

  return (
    <>
      <Header
        productsInCartLength={cart.length}
        productsInFavouriteLength={favourites.length}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AppRoutes
          addToCartModal={addToCartModal}
          removeFromCartModal={removeFromCartModal}
          addToFavourite={addToFavourite}
          favouriteItems={favourites}
          cartItems={cart}
        />
      )}
      {isModalOpened && <Modal content={modalContent} close={closeModal} />}
    </>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool,
  products: PropTypes.array,
  cart: PropTypes.array,
  favourites: PropTypes.array,
  isModalOpened: PropTypes.bool,
  modalContent: PropTypes.object,
};

export default App;
