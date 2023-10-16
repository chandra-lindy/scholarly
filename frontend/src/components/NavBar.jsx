import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-paper z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-brand-aux-1 font-bold text-2xl">
          <img className="h-[3.75rem] w-auto inline-block" src={logo} alt="" />
          <Link to="/">Scholarly</Link>
        </div>
        <div>
          <button className="mr-14 text-brand-aux-1 hover:text-brand-aux-2 text-l">
            <Link to="/register">Register</Link>
          </button>
          <button className="text-brand-aux-1 hover:text-brand-aux-2 text-l">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
