import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

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
      <div className="w-1/3">
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
        <button className="p-2 text-white bg-blue-500 rounded" onClick={signUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
