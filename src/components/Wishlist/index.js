import { useContext } from "react";
import WishlistContext from "../../context/WishlistContext";
import Header from "../Header";
import "./index.css";
import EmptyWishlistView from "../EmptyWishlistView";

const Wishlist = () => {
  const { wishlist, removeAllFromWishlist } = useContext(WishlistContext);

  return (
    <>
      <Header />

      <div className="wishlist-container">
        <h1 className="wishlist-heading">My Wishlist</h1>
        <div className="clearBtnContainer">
          {wishlist.length > 0 && (
            <button
              type="button"
              className="clear-wishlist-button"
              onClick={removeAllFromWishlist}
            >
              Clear Wishlist
            </button>
          )}
        </div>
        {wishlist.length === 0 ? (
          <EmptyWishlistView />
        ) : (
          <ul className="wishlist-list">
            {wishlist.map((item) => (
              <li key={item.id} className="wishlist-item">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="wishlist-img"
                />
                <div className="wishlist-details">
                  <h2>{item.title}</h2>
                  <p>Brand: {item.brand}</p>
                  <p>Price: Rs {item.price}/-</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Wishlist;
