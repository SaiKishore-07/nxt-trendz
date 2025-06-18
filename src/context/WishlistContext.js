import React from "react";

const WishlistContext = React.createContext({
  wishlist: [],
  toggleWishlist: () => {},
  removeAllFromWishlist: () => {},
});

export default WishlistContext;
