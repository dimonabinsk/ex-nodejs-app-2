document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    removeNote(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "change") {
    const id = event.target.dataset.id;
    const title = event.target.closest("li").childNodes[0];
    changeNote(id, title.textContent.trim()).then((res) => {
      if (res) {
        title.textContent = res;
      }
    });
  }
});

async function removeNote(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function changeNote(id, text) {
  const title = prompt("Enter a new note value", text);
  if (title) {
    const bodyObj = {
      title,
    };
    await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyObj),
    });
    return title;
  } else {
    alert("Enter a new note value");
  }
}
