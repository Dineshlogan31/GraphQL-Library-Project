import { useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const [getBook, setGetBook] = useState("");
  const client = useApolloClient();
  console.log();
  const getBookDetails = () => {
    client
      .query({
        query: getBookQuery,
        variables: {
          id: bookId,
        },
      })
      .then((data) => {
        console.log(data);
        setGetBook(data.data.book);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, [getBook]);
  if (bookId) {
    getBookDetails();
  }
  if (getBook) {
    return (
      <div id="book-details">
        <h1>{getBook && getBook.name}</h1>
        <p>
          <span color="black">Genre:</span>
          {getBook && getBook.genre}
        </p>
        <p>{getBook && getBook.author.name}</p>
        <p>All Books by this author</p>
        <ul>
          {getBook &&
            getBook.author.books.map((book, index) => {
              return <li key={book.id}>{book.name}</li>;
            })}
        </ul>
      </div>
    );
  } else {
    return (
      <div id="book-details">
        <h3>No Book Selected......</h3>
      </div>
    );
  }
};

export default BookDetails;
