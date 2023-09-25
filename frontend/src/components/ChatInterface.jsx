import chatIcon from "../assets/chat.png";

const ChatInterface = () => {
  return (
    <div className="absolute bottom-0 right-0 flex flex-col w-1/2 h-full mt-[3.75]">
      <div className="bg-brand-main h-full w-full h-11/12 rounded-xl p-4 overflow-y-auto"></div>
      <div className="flex bg-brand-main w-full h-1/12 rounded-xl my-1">
        <input
          className="w-full mr-4 bg-brand-main p-2 pl-4 rounded-xl text-brand-paper"
          type="text"
        />
        <div className="p-2">
          <img src={chatIcon} alt="Chat Icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
