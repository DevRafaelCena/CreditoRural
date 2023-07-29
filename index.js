const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const emprestimoController = require("./src/controllers/emprestimoController");

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});


app.use(bodyParser.json());

app.post("/emprestimo", emprestimoController.realizarEmprestimo)
app.get("/emprestimo", emprestimoController.retornaEmprestimos)


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
