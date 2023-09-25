import FileUpload from "./FileUpload";
import Card from "../utils/Card";

const books = [
  { id: 0, type: "book", title: "Gulag Archipelago" },
  { id: 1, type: "book", title: "Python for Dummies" },
  { id: 2, type: "book", title: "Machine Learning Concepts" },
  { id: 3, type: "book", title: "Cloud Computing" },
];

const LeftPanel = () => {
  const bookCards = books.map((book) => (
    <Card key={book.id} type={book.type} title={book.title}></Card>
  ));

  return (
    <div className="flex-none shrink-0 w-1/5">
      <FileUpload />
      {bookCards}
    </div>
  );
};

export default LeftPanel;
