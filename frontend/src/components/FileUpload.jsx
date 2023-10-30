import openBook from "../assets/open-book.png";
import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND_URL } from "../utils/constants";
import { fetchToken } from "../utils/utils";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = await fetchToken();
      const response = await axios.post(
        `${HTTP_BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadStatus(response.data.info);
    } catch (err) {
      console.error("There was an error uploading the file!", err);
      setUploadStatus("File upload failed.");
    }
  };

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

export default FileUpload;
