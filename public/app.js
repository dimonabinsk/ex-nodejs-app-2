document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    console.log("remove", id);
    removeNote(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function removeNote(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
