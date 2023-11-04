import { useState, useEffect, useRef } from "react";
import ChatIcon from "../components/ChatIcon";
import ChatInterface from "../components/ChatInterface";

const ChatWrapper = () => {
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

  return isOpen ? (
    <ChatInterface chatRef={chatRef} />
  ) : (
    <ChatIcon handleIconClick={() => setIsOpen(true)} />
  );
};

export default ChatWrapper;
