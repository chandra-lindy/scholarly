// CustomSignIn.jsx
import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("useNavigate: ", useNavigate);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log("Successfully signed in", user);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error signing in", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg">
        <Link to="/">
          <img src={logo} alt="Scholarly Logo" className="max-w-md mb-12" />
        </Link>
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
