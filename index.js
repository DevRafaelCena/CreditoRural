const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { authorization } = require("./src/middlewares/authMiddleware");
const emprestimoController = require("./src/controllers/emprestimoController");

app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});


app.use(bodyParser.json());

app.post("/emprestimo",authorization, emprestimoController.realizarEmprestimo)
app.get("/emprestimo",authorization, emprestimoController.retornaEmprestimos)


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
