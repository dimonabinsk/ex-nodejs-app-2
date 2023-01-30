const express = require("express");
const chalk = require("chalk");
// const fs = require("fs/promises");
// const path = require("path");
const { addNote, getNotes } = require("./notes.controller");

const port = 3000;
// const basePath = path.join(__dirname, "pages");
const app = express();
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes()
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Сервер запущен на порте: ${port}`));
});
