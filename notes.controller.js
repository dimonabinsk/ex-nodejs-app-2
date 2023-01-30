const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  //   const notes = require("./db.json");
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));

  // const buffer = await fs.readFile(notesPath);
  // const notes = Buffer.from(buffer).toString("utf-8");
  console.log(chalk.bgGreen("Заметка была добавлена!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Вот список заметок:"));
  notes.forEach((note) => {
    console.log(chalk.greenBright(`ID:${note.id}, "${note.title}"`));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  if (notes.length > 0) {
    const newNotesList = notes.filter((note) => {
      if (note.id === id) {
        console.log(chalk.bgRed(`Заметка '${note.title}'  была удалена!`));
      }
      return note.id !== id;
    });
    await fs.writeFile(notesPath, JSON.stringify(newNotesList));
  } else {
    console.log(chalk.bgRed("Вы ещё не создали заметку!"));
  }
}

async function editNote(id, newTitle) {
  const notes = await getNotes();
  if (notes.length > 0) {
    const newNotesList = notes.map((note) => {
      if (note.id === id) {
        console.log(
          chalk.yellowBright(
            `Заметка '${note.title}' была заменена на '${newTitle}'!`
          )
        );
        return {
          ...note,
          title: newTitle,
        };
      }
      return note;
    });
    await fs.writeFile(notesPath, JSON.stringify(newNotesList));
  }
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
