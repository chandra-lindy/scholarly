import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import chatIcon from "../assets/chat.png";
import PropTypes from "prop-types";
import { getSocket } from "../utils/utils";

const ChatInterface = ({ chatRef }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatDisplayRef = useRef(null);
  const socketRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      const user_message = { source: "user", text: userInput };
      const newMessages = [...messages, user_message];

      try {
        socketRef.current.send(JSON.stringify(newMessages));
      } catch (err) {
        console.error("Error sending message: ", err);
      }

      setMessages(newMessages);
      setUserInput("");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const setupSocket = async () => {
      const socketInstance = await getSocket();
      if (!isMounted) return;

      socketRef.current = socketInstance;

      socketInstance.addEventListener("open", (e) => {
        console.log("connected to server", e);
      });

      socketInstance.addEventListener("message", (e) => {
        console.log("Received from server: ", e.data);
        const ai_message = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, ai_message]);
        console.log("messages: ", messages);
      });
    };

    setupSocket();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        console.log("cleaning up websocket connection");
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="absolute bottom-0 right-0 flex flex-col w-4/5 h-full mt-[3.75] text-brand-paper px-4 pb-4 bg-brand-paper"
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
