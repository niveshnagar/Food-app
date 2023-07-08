import { LOGO_URL } from "../utils/constants";
import { CART_URL } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

// header fn component;
const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="header">
      <div className="icon-name">
        <img className="logo" src={LOGO_URL} />
        <span className="name">Nivi's</span>
      </div>
      <ul className="nav-bar">
        <Link className="link" to="/">
          <li className="nav-items nowrap">Home</li>
        </Link>
        <Link className="link" to="/about">
          <li className="nav-items nowrap">About Us</li>
        </Link>
        <Link className="link" to="/contact">
          <li className="nav-items nowrap">Contact Us</li>
        </Link>
        <Link className="link" to="/cart">
          <li className="nav-items">
            <img src={CART_URL} />
            <span>{cartItems.length}-items</span>
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
