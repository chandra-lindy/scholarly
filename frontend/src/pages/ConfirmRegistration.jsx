import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

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
      <input
        type="text"
        placeholder="Email"
        className="p-2 mb-4 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Confirmation code"
        className="p-2 mb-4 border rounded"
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="p-2 text-white bg-blue-500 rounded"
        onClick={confirmSignUp}
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRegistration;
