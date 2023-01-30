const express = require("express");
const chalk = require("chalk");
// const fs = require("fs/promises");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  changeNote,
} = require("./notes.controller");

const port = 3000;
const staticScript = path.join(__dirname, "public");
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.json());
app.use(express.static(staticScript));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  // console.log("params",req.params.id);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await changeNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Сервер запущен на порте: ${port}`));
});
