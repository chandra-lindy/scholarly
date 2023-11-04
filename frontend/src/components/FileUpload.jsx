import openBook from "../assets/open-book.png";
import PropTypes from "prop-types";

const FileUpload = ({ handleFileChange }) => {
  return (
    <div className="relative flex bg-brand-aux-2 w-full opacity-25 border-4 border-black rounded-lg border-dashed">
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="w-1/2 p-5">
        <img src={openBook} alt="Icon - Opened Book" />
      </div>
      <div className="w-1/2 xl:pt-6 xl:pr-4 xl:text-xs 2xl:pt-10 2xl:pr-4">
        <div className="text-center text-base text-white">
          Drag and drop .pdf files to upload
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
};

export default FileUpload;
