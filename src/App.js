import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistContext from "./context/WishlistContext";
import Wishlist from "./components/Wishlist";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductItemDetails from "./components/ProductItemDetails";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";
import OrderSuccess from "./components/OrderSuccess";
import toasted from "react-hot-toast";

function App() {
  const [cartList, setCartList] = useState([]);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const removeAllFromWishlist = useCallback(() => {
    setWishlist([])
  },[])

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find((item) => item.id === product.id);

    if (isInWishlist) {
      toasted.success("Item removed from WishList!", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== product.id)
      );
    } else {
      toasted.success("Item added to WishList!", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };

  const removeAllCartItems = useCallback(() => {
    setCartList([]);
    toast.info("Cart cleared!");
  }, []);

  const addCartItem = useCallback(
    (product) => {
      const isAlreadyInCart = cartList.find((each) => each.id === product.id);

      if (isAlreadyInCart) {
        toast.warning("Already in cart, increasing quantity!");

        setCartList((prevCartList) =>
          prevCartList.map((each) =>
            each.id === product.id
              ? { ...each, quantity: each.quantity + product.quantity }
              : each
          )
        );
      } else {
        toast.success("Product added to cart!");

        setCartList((prevCartList) => [...prevCartList, product]);
      }
    },
    [cartList]
  );

  const removeCartItem = useCallback((id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((each) => each.id !== id)
    );
    toast.info("Item removed from cart!");
  }, []);

  const incrementCartItemQuantity = useCallback((id) => {
    setCartList((prevCartList) =>
      prevCartList.map((each) => {
        if (each.id === id) {
          return { ...each, quantity: each.quantity + 1 };
        }
        return each;
      })
    );
  }, []);

  const decrementCartItemQuantity = useCallback((id) => {
    setCartList((prevCartList) => {
      const product = prevCartList.find((each) => each.id === id);

      if (product.quantity > 1) {
        return prevCartList.map((each) => {
          if (each.id === id) {
            return { ...each, quantity: each.quantity - 1 };
          }
          return each;
        });
      } else {
        return prevCartList.filter((each) => each.id !== id);
      }
    });
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeAllFromWishlist }}>
      <CartContext.Provider
        value={{
          cartList,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            <Route path="/login" element={<LoginForm />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductItemDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route exact path="/order-success" element={<OrderSuccess />} />
              <Route path="/not-found" component={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </WishlistContext.Provider>
  );
}

export default App;
