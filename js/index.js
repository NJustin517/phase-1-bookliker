document.addEventListener("DOMContentLoaded", function () {
  const showPanel = document.querySelector("#show-panel");
  let currentUsers;

  function getUsers() {
    fetch("http://localhost:3000/users")
      .then((resp) => resp.json())
      .then((users) => {
        currentUsers = users;
      });
  }

  fetch("http://localhost:3000/books")
    .then((resp) => resp.json())
    .then((json) => renderBooks(json));

  function renderBooks(books) {
    books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = book.title;
      li.addEventListener("click", (e) => {
        showPanel.innerHTML = `
        <div>
          <img src="${book.img_url}" alt="">
        </div>
        <div>
          <p>${book.description}</p>
        </div>
        <div>
          <ul id="users">
          </ul>
        </div>
        <div>
          <form id="addUsername">
            <input type="text" id="username" placeholder="Enter your username" />
            <input type="submit" value="Like The Book" />
        </div>`;
        const form = showPanel.querySelector("#addUsername");
        book.users.forEach((user) => {
          const li = document.createElement("li");
          li.textContent = user.username;
          showPanel.querySelector("#users").appendChild(li);
        });
        form.addEventListener("submit", (e) => {
          likeABook(e, book);
          form.reset();
        });
      });
      document.querySelector("#list").appendChild(li);
    });
  }

  function likeABook(e, book) {
    e.preventDefault();
    const enteredUsername = e.target.username.value;
    currentUsers.forEach((user) => {
      if (enteredUsername === user.username) {
        console.log("a match!");
      } else {
        console.log("Not a match");
      }
    });
  }
  getUsers();
});
