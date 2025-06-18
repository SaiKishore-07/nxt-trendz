import Empty_Wishlist from "../../assets/empty_wishlist.png";
import './index.css'

const EmptyWishlistView = () => {
  return (
    <div className="empty_wishlist_container">
      <img
        src={Empty_Wishlist}
        alt="empty-wishlist"
        className="empty_wishlist_img"
      />
      <p className="empty-wishlist-text">
        Wishlist is lonely… give it some love 💌
      </p>
    </div>
  );
};

export default EmptyWishlistView;
