import { useSelector } from "react-redux";
import { removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalBill = cartItems.reduce(
    (sum, item) => sum + (item.price || item.defaultPrice),
    0
  );
  const dispatch = useDispatch();

  const removeBillItem = (index) => dispatch(removeItem(index));

  return (
    <div className="cart-container">
      {cartItems.length ? (
        <div className="order-info">
          <p className="order-header"> Order info </p>
          <div className="order-item-container">
            {cartItems.map((item, index) => (
              <div className="order-item">
                <p>
                  {index + 1}. {item.name}
                </p>
                <div className="item-price">
                  <p>&#8377;{item.price / 100 || item.defaultPrice / 100}</p>
                  <button onClick={() => removeBillItem(index)}>
                    <img
                      className="collapse-item"
                      src="https://cdn-icons-png.flaticon.com/128/2723/2723639.png"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <p>Total bill:</p>
            <p>&#8377;{totalBill / 100}</p>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p className="empty-cart-message">Cart is empty!</p>
        </div>
      )}
    </div>
  );
};
export default Cart;
