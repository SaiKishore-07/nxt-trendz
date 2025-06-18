import  { useContext } from 'react'
import CartContext from '../../context/CartContext'
import './index.css'
import CartItem from '../CartItem'

const CartListView = () => {
    const {cartList} = useContext(CartContext)
  return (
    <ul className='cart-list'>
      {cartList.map(eachCartItem =>(
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem}/>
      ))}
    </ul>
  )
}

export default CartListView
