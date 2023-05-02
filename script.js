class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function displayBooks() {
  let storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks === null) {
    storedBooks = [];
  }
  const books = storedBooks;
  // eslint-disable-next-line no-use-before-define
  books.forEach((book) => addBookToList(book));
}

function addBookToList(book) {
  const list = document.querySelector('#book-list');
  const ul = document.createElement('ul');
  ul.innerHTML = `
          <li>${book.title}</li>
          <li>${book.author}</li>
          <li><button class="delete">Delete</button></li>
          `;
  list.appendChild(ul);
}

function deleteBook(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
    let storedBooks = JSON.parse(localStorage.getItem('books'));
    const title = el.parentElement.previousElementSibling.previousElementSibling.textContent;
    const author = el.parentElement.previousElementSibling.textContent;
    storedBooks = storedBooks.filter(
      (book) => book.title !== title || book.author !== author,
    );
    localStorage.setItem('books', JSON.stringify(storedBooks));
  }
}

function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
}

document.addEventListener('DOMContentLoaded', displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  let storedBooks = JSON.parse(localStorage.getItem('books'));

  if (storedBooks === null) {
    storedBooks = [];
  }

  if (title === '' || author === '') {
    // eslint-disable-next-line no-alert
    alert('All filed should be filed');
  } else {
    const book = new Book(title, author);
    storedBooks.push(book);
    localStorage.setItem('books', JSON.stringify(storedBooks));
    addBookToList(book);
    clearFields();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  deleteBook(e.target);
});
