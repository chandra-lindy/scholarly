// import NavBar from "../components/NavBar";
import NavBarDash from "../components/NavBarDash";
import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import ChatIcon from "../components/ChatIcon";
import ChatInterface from "../components/ChatInterface";
import { useState, useEffect, useRef } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const handleClickOutside = (e) => {
    if (chatRef.current && !chatRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container flex flex-col m-auto">
      <NavBarDash />
      <div className="relative flex h-[calc(100vh-3.75rem)] mt-[3.75rem]">
        <LeftPanel />
        <MainPanel />
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
