import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const client = useApolloClient();
  //local states
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });
  //data fetch from graphql server
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const handleBookSubmit = (e) => {
    e.preventDefault();
    client
      .mutate({
        mutation: addBookMutation,
        variables: {
          name: book.name,
          genre: book.genre,
          authorId: book.authorId,
        },
        refetchQueries: [{ query: getBooksQuery }],
      })
      .then((data) => {
        console.log("mutation return value", data);
      })
      .catch((err) => {
        console.log("Mutate Error", err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <form id="add-book" onSubmit={(e) => handleBookSubmit(e)}>
      <div className="field">
        <label>BookName:</label>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => setBook({ ...book, authorId: e.target.value })}
        >
          <option>Select Author</option>
          {data &&
            data.authors.map((author, index) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
};

export default AddBook;
