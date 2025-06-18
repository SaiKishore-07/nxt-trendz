import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartSummary = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const onCheckout = () => {
    const order = {
      orderId: Date.now(),
      items: cartList,
      total,
      date: new Date().toLocaleString(),
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    previousOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(previousOrders));

    navigate("/order-success");
  };

  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span> Rs {total}/-
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>

        <button
          type="button"
          className="checkout-button d-sm-none"
          onClick={onCheckout}
        >
          Checkout
        </button>
        <button
          type="button"
          className="checkout-button d-lg-none"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartSummary;
