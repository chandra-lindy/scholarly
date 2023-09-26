import PropTypes from "prop-types";
import bookIcon from "../assets/open-book.png";

const Card = ({ type, title }) => {
  const icon =
    type === "book" ? (
      <img className="h-[1.5rem] pr-4" src={bookIcon} alt="Icong - Open Book" />
    ) : (
      "???"
    );

  return (
    <div className=" flex bg-brand-main mt-2 p-4 rounded-lg hover:bg-brand-aux-2 transition duration-300">
      {icon}
      {title}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
