import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.error || "";

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      navigate("/confirm", { state: { email } });
    } catch (error) {
      navigate("/register", { state: { error: error.message } });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        signUp();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [signUp]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <Link to="/">
          <img src={logo} alt="Scholarly Logo" className="max-w-md mb-4" />
        </Link>

        <p
          className="p-2 my-4 text-red-600 text-xs"
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
        >
          {errorMessage || "Error message if any"}
        </p>

        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Email"
            className="p-2 mb-4 border border-brand-main rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-4 border border-brand-main rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={signUp}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
