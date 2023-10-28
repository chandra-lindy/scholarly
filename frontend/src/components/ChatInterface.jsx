import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import chatIcon from "../assets/chat.png";
import PropTypes from "prop-types";

const ChatInterface = ({ chatRef }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatDisplayRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setMessages([...messages, { source: "user", text: userInput }]);
      setUserInput("");
    }
  };

  useEffect(() => {
    // send message to backend
    console.log("messages: ", messages);
  }, [messages]);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  });

  return (
    <div
      className="absolute bottom-0 right-0 flex flex-col w-1/2 h-full mt-[3.75] text-brand-paper"
      ref={chatRef}
    >
      <div
        className="bg-brand-main h-full w-full h-11/12 rounded-xl p-4 overflow-y-auto"
        ref={chatDisplayRef}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            source={message.source}
            message={message.text}
          />
        ))}
      </div>
      <div className="flex bg-brand-main w-full h-1/12 rounded-xl my-1">
        <input
          className="w-full mr-4 bg-brand-main p-2 pl-4 rounded-xl"
          type="text"
          id="chat input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e);
            }
          }}
        />
        <div className="p-2" onClick={handleSendMessage}>
          <img src={chatIcon} alt="Chat Icon" />
        </div>
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  chatRef: PropTypes.object.isRequired,
};

export default ChatInterface;
