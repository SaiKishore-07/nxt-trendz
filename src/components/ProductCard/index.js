import { Link } from "react-router-dom";

import { useContext } from "react";
import WishlistContext from '../../context/WishlistContext'

import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, brand, imageUrl, rating, price, id } = productData;

  
  const {wishlist, toggleWishlist} = useContext(WishlistContext)

  const isWishlisted = wishlist.some(item => item.id === id)

  
  const onHeartClick = e => {
    e.preventDefault() // prevent navigation
    toggleWishlist(productData)
  }

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>
      <button
        className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={onHeartClick}
        title="Toggle Wishlist"
      >
        {isWishlisted ? '💖' : '🤍'}
      </button>
    </li>
  );
};
export default ProductCard;
