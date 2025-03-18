import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.listen(2108, () => {
  console.log("HTTP Server Running on http://localhost:2108! 😊");
});
