
// Book Class: Represents a Book

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI Class: Handle UI Tasks

    function displayBooks() {
        const StoredBooks = [];

        const books = StoredBooks;
        books.forEach((book) => addBookToList(book));
    }

    function addBookToList(book) {
        const List = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td><br>
        <td>${book.author}</td><br>
        <td><a href="#" class="btn btn-danger btn-lg delete">X</a></td>
        `;

        List.appendChild(row);
    }


    function deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    function clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';

    }

// Store Class: Handles Storage


// Events: Display Books
document.addEventListener('DOMContentLoaded', displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;


    // Instatiate book
    const book = new Book(title, author);
    // console.log(book);

    // Add Book to UI
    addBookToList(book);

    // Clear fields
    clearFields();

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    deleteBook(e.target)

});
