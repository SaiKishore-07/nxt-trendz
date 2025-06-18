import { Link } from "react-router-dom";
import orderSuccess from "../../assets/order_success.jpg";
import "./index.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <img src={orderSuccess} alt="order success" className="success-image" />
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with Nxt Trendz.</p>
      <Link to="/products">
        <button type="button" className="shop-again-btn">
          Shop Again
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
