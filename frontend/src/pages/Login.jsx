import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.error || "";
  const emailFromConfirm = location.state?.email || "";

  useEffect(() => {
    setEmail(emailFromConfirm);
  }, []);

  const signIn = async () => {
    try {
      await Auth.signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      navigate("/login", { state: { error: error.message } });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        signIn();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg">
        <Link to="/">
          <img src={logo} alt="Scholarly Logo" className="max-w-md mb-4" />
        </Link>

        {/* error message display */}
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
          <button className="btn" onClick={signIn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
