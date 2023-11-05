import { useState, useEffect, useRef, useCallback } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-no-slogan.png";
import { Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.error || "";
  const emailFromConfirm = location.state?.email || "";
  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    setEmail(emailFromConfirm);
  }, [emailFromConfirm]);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      navigate("/login", { state: { error: error.message } });
    }
  }, [email, password, navigate]);

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
  }, [signIn]);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    } else {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading ? (
        <Bars
          height="80"
          width="80"
          color="#c8532c"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg">
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
              name="email"
              placeholder={emailFromConfirm || "Email"}
              disabled={emailFromConfirm}
              className="p-2 mb-4 border border-brand-main rounded"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 mb-4 border border-brand-main rounded"
              onChange={(e) => setPassword(e.target.value)}
              ref={emailFromConfirm ? passwordInputRef : null}
            />
            <button className="btn" onClick={signIn}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
