import FileUpload from "./FileUpload";
import Card from "../utils/Card";
import { useState, useEffect } from "react";
import { uploadFile, getBookList, getBook } from "../utils/utils";
import PropTypes from "prop-types";

const LeftPanel = ({ setSelectedFile }) => {
  const [file, setFile] = useState(null);
  const [books, setBooks] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  // debug code
  console.log("file", file);
  console.log("uplaodStatus", uploadStatus);

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
      const message = await uploadFile(formData);
      setUploadStatus(message);
      setBooks((prevBooks) => [
        ...prevBooks,
        { id: prevBooks.length, type: "book", title: file.name, file: file },
      ]);
      setSelectedFile(file);
    } catch (err) {
      console.error("There was an error uploading the file!", err);
      setUploadStatus("File upload failed.");
    }
  };

  const handleSelectFile = async (book) => {
    if (book.file) {
      console.log("handleSelectFile called with file");
      console.log("book: ", book);
      console.log("file: ", book.file);
      setSelectedFile(book.file);
    } else {
      console.log("handleSelectFile called without file");
      console.log("book: ", book);
      console.log("file: ", book.file);
      // TODO: handle this case
      const file = await getBook(book.title);
      const newBooks = books.map((b) => {
        if (b.title === book.title) {
          return { ...b, file: file };
        }
        return b;
      });
      setBooks(newBooks);
      setSelectedFile(file);
    }
  };

  const bookCards = books.map((book) => (
    <Card
      key={book.id}
      type={book.type}
      title={book.title}
      handleSelectFile={() => handleSelectFile(book)}
    ></Card>
  ));

  useEffect(() => {
    async function setup() {
      try {
        const bookList = await getBookList();
        setBooks(bookList);
      } catch (err) {
        console.error("There was an error getting the book list!", err);
      }
    }
    if (books.length === 0) setup();
  }, []);

  return (
    <div className="flex-none shrink-0 w-1/5 mt-2">
      <FileUpload handleFileChange={handleFileChange} />
      {bookCards}
    </div>
  );
};

LeftPanel.propTypes = {
  setSelectedFile: PropTypes.func.isRequired,
};

export default LeftPanel;
