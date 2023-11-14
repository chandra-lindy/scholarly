import { useState, useEffect, useRef } from "react";
import ChatIcon from "../components/ChatIcon";
import ChatInterface from "../components/ChatInterface";
import Proptypes from "prop-types";

const ChatDisplay = ({ selectedFile }) => {
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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return isOpen ? (
    <ChatInterface selectedFile={selectedFile} chatRef={chatRef} />
  ) : (
    <ChatIcon handleIconClick={() => setIsOpen(true)} />
  );
};

ChatDisplay.propTypes = {
  selectedFile: Proptypes.object.isRequired,
};

export default ChatDisplay;
