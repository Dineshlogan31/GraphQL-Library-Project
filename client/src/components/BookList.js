import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <div>
      <ul id="book-list">
        {data &&
          data.books.map((book, index) => {
            return (
              <li key={index} onClick={() => setSelectedBook(book.id)}>
                {index + 1}.{book.name}
              </li>
            );
          })}
        <BookDetails bookId={selectedBook} />
      </ul>
    </div>
  );
};

export default BookList;
