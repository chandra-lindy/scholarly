import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await Auth.signOut();
      console.log("User signed out");
      navigate("/");
    } catch (error) {
      console.log("Error signing out user", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-paper z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Scholarly logo" className="w-48 mt-2" />
        </Link>
        <div>
          <button
            onClick={logout}
            className="text-brand-aux-1 hover:text-brand-aux-2 text-l"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
