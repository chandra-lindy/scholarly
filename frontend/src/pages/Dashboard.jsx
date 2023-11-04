import NavBarDash from "../components/NavBarDash";
import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import ChatIcon from "../components/ChatIcon";
import ChatInterface from "../components/ChatInterface";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const chatRef = useRef(null);

  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (chatRef.current && !chatRef.current.contains(e.target)) {
      setIsOpen(false);
      console.log("clicked outside");
    }
  };
  useEffect(() => {
    console.log("isOpen: ", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container flex flex-col m-auto">
      <NavBarDash />
      <div className="relative flex h-[calc(100vh-3.65rem)] mt-[3.65rem]">
        <LeftPanel setSelectedFile={setSelectedFile} />
        <MainPanel selectedFile={selectedFile} />
        {isOpen ? (
          <ChatInterface chatRef={chatRef} />
        ) : (
          <ChatIcon handleIconClick={() => setIsOpen(true)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
