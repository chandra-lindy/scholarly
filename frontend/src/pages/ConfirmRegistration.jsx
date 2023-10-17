import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";

const ConfirmRegistration = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.error || "";

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      navigate("/dashboard");
    } catch (error) {
      navigate("/confirm", { state: { error: error.message } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg">
        <Link to="/">
          <img src={logo} alt="Scholarly logo" className="max-w-md mb-12" />
        </Link>
        <p
          className="p-2 my-4 text-red-600 text-xs text-center"
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
        >
          {errorMessage || "Error message if any"}
        </p>
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
