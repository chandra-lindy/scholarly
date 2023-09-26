import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import profileIcon from "../assets/profile.png";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-paper z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-brand-aux-1 font-bold text-2xl">
          <img className="h-[3.75rem] w-auto inline-block" src={logo} alt="" />
          <Link to="/">Scholarly</Link>
        </div>
        <div>
          <div>
            <img src={profileIcon} alt="Profile Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
