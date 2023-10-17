import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const ConfirmRegistration = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      console.log("User confirmed");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error confirming user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg">
        <Link to="/">
          <img src={logo} alt="Scholarly logo" className="max-w-md mb-12" />
        </Link>
        <input
          type="text"
          placeholder="Email"
          className="p-2 mb-4 border border-brand-main rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirmation code"
          className="p-2 mb-4 border border-brand-main rounded"
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn" onClick={confirmSignUp}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
