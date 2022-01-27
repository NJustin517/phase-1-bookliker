document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000";
  // DOM Selectors
  const booksList = document.querySelector("#list");
  const showPanel = document.querySelector("#show-panel");

  // Fetches
  function getAllBooks() {
    fetch(baseURL + "/books")
      .then((resp) => resp.json())
      .then(renderBooksList);
  }

  // Helper Functions
  function renderBooksList(books) {
    books.forEach((book) => renderOneBook(book));
  }

  function renderOneBook(book) {
    const li = document.createElement("li");
    li.addEventListener("click", (e) => handleClick(book));
    li.textContent = book.title;
    booksList.appendChild(li);
  }

  function handleClick(book) {
    showPanel.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = book.description;
    const image = document.createElement("img");
    image.src = book.img_url;
    const ul = document.createElement("ul");
    ul.id = "likes";
    showPanel.appendChild(image);
    showPanel.appendChild(p);
    showPanel.appendChild(ul);
    const userLikes = document.querySelector("#likes");
    book.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.username;
      userLikes.appendChild(li);
    });
  }

  // Intializers
  getAllBooks();
});
