const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const newBookButton = document.querySelector('.newbook-button');

const bookName = document.querySelector('#book-name');
const authorName = document.querySelector('#author-name');
const readStatus = document.querySelector('#read-status');

const listBooks = document.querySelector('.list-books');

function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
}

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.setAttribute('book-id', myLibrary.indexOf(book));
    bookElement.classList.add('book');

    const bookNameDiv = document.createElement('div');
    bookNameDiv.textContent = book.name;

    const bookAuthorDiv = document.createElement('div');
    bookAuthorDiv.textContent = book.author;

    const readButton = document.createElement('button');
    if (book.read === 'read') {
        readButton.textContent = 'Read';
    } else {
        readButton.textContent = 'Not Read';
        readButton.classList.add('book-not-read');
    }
    readButton.addEventListener('click', toggleReadButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteBook(myLibrary.indexOf(book));
    });

    function toggleReadButton() {
        if (book.read === 'read') {
            readButton.textContent = 'Not Read';
            book.read = 'not-read';
            readButton.classList.add('book-not-read');
        } else {
            readButton.textContent = 'Read';
            book.read = 'read';
            readButton.classList.remove('book-not-read');
        }
        updateLocalStorage();
    }

    bookElement.appendChild(bookNameDiv);
    bookElement.appendChild(bookAuthorDiv);
    bookElement.appendChild(readButton);
    bookElement.appendChild(deleteButton);

    listBooks.appendChild(bookElement);
    updateLocalStorage();
}

function addBookToLibrary(e) {
    e.preventDefault();
    newbook = new Book(bookName.value, authorName.value, readStatus.value);
    myLibrary.push(newbook);
    createBookElement(newbook);
    updateLocalStorage();

    bookName.value = '';
    authorName.value = '';
    readStatus.value = '';
}

function deleteBook(index) {
    const elemen = document.querySelector(`[book-id="${index}"]`);
    elemen.remove();
    myLibrary.splice(index, 1);
    updateLocalStorage();
}

newBookButton.addEventListener('click', addBookToLibrary);

document.addEventListener('DOMContentLoaded', function () {
    myLibrary.forEach((item) => {
        createBookElement(item);
    });
});
