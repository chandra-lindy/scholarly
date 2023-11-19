import PropTypes from "prop-types";
import bookIcon from "../assets/open-book.png";

const Card = ({ type, title, handleSelectFile }) => {
  const icon =
    type === "book" ? (
      <img className="h-[1.5rem] pr-4" src={bookIcon} alt="Icong - Open Book" />
    ) : (
      "???" // other types goes here
    );

  return (
    <div
      className=" flex bg-brand-main mt-2 px-4 py-2 rounded-lg hover:bg-brand-aux-2 transition duration-300 whitespace-nowrap overflow-hidden text-fade"
      onClick={handleSelectFile}
    >
      {icon}
      <span className="">{title}</span>
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSelectFile: PropTypes.func.isRequired,
};

export default Card;
