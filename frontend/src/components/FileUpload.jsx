import openBook from "../assets/open-book.png";

const FileUpload = () => {
  return (
    <div className="flex bg-brand-aux-2 w-full opacity-25 border-4 border-black rounded-lg border-dashed">
      <div className="w-1/2 p-10 lg:p-5">
        <img src={openBook} alt="Icon - Opened Book" />
      </div>
      <div className="w-1/2 lg:p-1 lg:py-6 lg:pr-4 lg:text-xs">
        <div className="text-center text-base text-white">
          Drag and drop .pdf files to upload
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
