// CustomSignIn.jsx
import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

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
        <button className="p-2 text-white bg-blue-500 rounded" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
