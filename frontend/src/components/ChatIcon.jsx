import chatIcon from "../assets/chat.png";

const ChatIcon = () => {
  return (
    <div className="absolute bg-brand-main hover:bg-brand-aux-2 p-2 mb-1 bottom-0 right-0 rounded-xl transition duration-300">
      <img className="w-[1.75rem]" src={chatIcon} alt="Chat Icon" />
    </div>
  );
};

export default ChatIcon;
