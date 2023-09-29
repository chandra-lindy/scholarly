import chatIcon from "../assets/chat.png";
// import PropTypes from "prop-types";

// ChatIcon.propTypes = {
//   handleIconClick: PropTypes.func.isRequired,
// };

const ChatIcon = ({ handleIconClick, iconRef }) => {
  return (
    <div
      className="absolute bg-brand-main hover:bg-brand-aux-2 p-2 mb-1 bottom-0 right-0 rounded-xl transition duration-300"
      onClick={handleIconClick}
    >
      <img className="w-[1.75rem]" src={chatIcon} alt="Chat Icon" />
    </div>
  );
};

export default ChatIcon;
