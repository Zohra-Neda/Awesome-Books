import Book from './store.js';

const createBook = document.querySelector('#addBook');
class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  collectBooks(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(title, author) {
    const index = this.books.findIndex((book) => book.title === title && book.author === author);
    if (index !== -1) {
      this.books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.showBooks();
    }
  }

  showBooks() {
    const booksDiv = document.querySelector('#books');
    booksDiv.innerHTML = '';
    if (Array.isArray(this.books)) {
      this.books.forEach((book) => {
        const booksContainer = document.createElement('div');
        booksContainer.classList.add('books-container');
        const list = document.createElement('div');
        list.classList.add('book-item');
        const item1 = document.createElement('p');
        item1.classList.add('book-item-name');
        const item2 = document.createElement('p');
        item2.classList.add('book-item-author');
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove');
        item1.innerText = `"${book.title.charAt(0).toUpperCase() + book.title.slice(1)}"`;
        item2.innerText = `by ${book.author.charAt(0).toUpperCase() + book.author.slice(1)}`;
        document.createElement('hr');
        list.appendChild(item1);
        list.appendChild(item2);
        booksContainer.appendChild(list);
        booksContainer.appendChild(removeButton);
        removeButton.addEventListener('click', () => {
          this.removeBook(book.title, book.author);
        });
        booksDiv.appendChild(booksContainer);
      });
    }
  }
}
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const validationMessage = document.querySelector('.message');

const newBook = new Library();

function clearValidationMessage() {
  validationMessage.innerHTML = '';
  validationMessage.classList.remove('active');
}

createBook.addEventListener('click', (event) => {
  event.preventDefault();
  if (titleInput.value && authorInput.value) {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const title = titleInput.value;
    const author = authorInput.value;
    newBook.collectBooks(title, author);
    validationMessage.innerHTML = 'Your book has been added successfully';
    validationMessage.classList.add('active');
    setTimeout(clearValidationMessage, 3000);
    titleInput.value = '';
    authorInput.value = '';
  } else {
    validationMessage.innerHTML = 'All field should be inserted';
    validationMessage.classList.add('active');
    setTimeout(clearValidationMessage, 3000);
  }
});
newBook.showBooks();

const formButton = document.querySelector('#form');
const booksButton = document.querySelector('#list');
const contactButton = document.querySelector('#contact');
const booksSection = document.querySelector('.display-books');
const formSection = document.querySelector('.form-section');
const contactSection = document.querySelector('.contact-section');

function showForm() {
  booksSection.classList.add('hide');
  formSection.classList.remove('hide');
  contactSection.classList.add('hide');
}

function showBooks() {
  booksSection.classList.remove('hide');
  formSection.classList.add('hide');
  contactSection.classList.add('hide');
}

function showContact() {
  booksSection.classList.add('hide');
  contactSection.classList.remove('hide');
  formSection.classList.add('hide');
}

booksButton.addEventListener('click', showBooks);
formButton.addEventListener('click', showForm);
contactButton.addEventListener('click', showContact);

// Date and Time
const dateTime = document.querySelector('#date-time');
const currentDateTime = new Date();
const displayDateTime = currentDateTime.toLocaleString(dateTime.DATETYPE_MED_WITH_SECONDS);
dateTime.innerHTML = displayDateTime;

// HAMBURGER

const hamburgerMenu = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const menuItems = document.querySelectorAll('.menu-items li');

hamburgerMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
  const hamburgerIcon = document.querySelector('#closeButton');
  hamburgerIcon.classList.toggle('bi-list');
  hamburgerIcon.classList.toggle('bi-x');
});

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const hamburgerIcon = document.querySelector('#closeButton');
    hamburgerIcon.classList.add('bi-list');
    hamburgerIcon.classList.remove('bi-x');
    nav.classList.remove('active');
  });
});
