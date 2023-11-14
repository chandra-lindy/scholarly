import FileUpload from "./FileUpload";
import Card from "../utils/Card";
import { useState, useEffect } from "react";
import { uploadFile, getBookList, getBook } from "../utils/utils";
import PropTypes from "prop-types";

const LeftPanel = ({ setSelectedFile }) => {
  const [books, setBooks] = useState([]);

  const handleFileChange = (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData);
      setBooks((prevBooks) => [
        ...prevBooks,
        { id: prevBooks.length, type: "book", title: file.name, file: file },
      ]);
      setSelectedFile(file);
    } catch (err) {
      console.error("There was an error uploading the file!", err);
    }
  };

  const handleSelectFile = async (book) => {
    if (book.file) {
      setSelectedFile({ title: book.title, file: book.file });
    } else {
      const file = await getBook(book.title);
      const newBooks = books.map((b) => {
        if (b.title === book.title) {
          return { ...b, file: file };
        }
        return b;
      });
      setBooks(newBooks);
      setSelectedFile({ title: book.title, file: file });
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
        if (bookList.length > 0) {
          handleSelectFile(bookList[0]);
          setBooks(bookList);
        }
      } catch (err) {
        console.error("There was an error getting the book list!", err);
      }
    }
    if (books.length === 0) setup();
  }, []);

  useEffect(() => {
    if (books.length > 0 && !books[0].file) {
      handleSelectFile(books[0]);
    }
  });

  return (
    <div className="flex-none shrink-0 w-1/5 mt-2 overflow-y-auto hide-scrollbar">
      <FileUpload handleFileChange={handleFileChange} />
      {bookCards}
    </div>
  );
};

LeftPanel.propTypes = {
  setSelectedFile: PropTypes.func.isRequired,
};

export default LeftPanel;
