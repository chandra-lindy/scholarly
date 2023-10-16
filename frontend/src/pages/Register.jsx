import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      console.log("User signed up:", user);
      navigate("/confirm");
    } catch (error) {
      console.log("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col bg-white p-8">
        <Link to="/">
          <img src={logo} alt="Scholarly Logo" className="max-w-md mb-12" />
        </Link>
        <div className="flex flex-col item-center">
          <input
            type="text"
            placeholder="Email"
            className="p-2 mb-4 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-4 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={signUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
