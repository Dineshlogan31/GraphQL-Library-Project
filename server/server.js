const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://dineshlogan31:dinesh98.@cluster0.myntaep.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("DataBase is connected && Server is listening in port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
