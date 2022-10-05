const showFormBtn = document.querySelector('#showForm');
const form = document.querySelector('#form');
const closeForm = document.querySelector('#closeForm');
const submitBtn = document.querySelector('#submit');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                pages: 295,
                read: true
            },
            {
                title: 'Nineteen Eighty-Four',
                author: 'George Orwell',
                pages: 254,
                read: false
            },
        ];

        const books = StoredBooks;

        books.forEach(book => UI.addBookToList(book))
    };

    static addBookToList(book) {
        const bookSelf = document.querySelector('#bookSelf');

        bookSelf.innerHTML += `
        <div id="book-${book.title}" class="book-card">
            <div class="book-title-wrapper">
                <h3>${book.title}</h3>
            </div>
            <div class="book-desc">
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
            </div>
            <div class="read-status ${book.read ? 'read' : 'not-read'}">
                <strong>${book.read ? 'You have read the book <i class="fa-solid fa-check"></i>' : 'You haven&#39;t read book <i class="fa-solid fa-xmark"></i>'}</strong>
            </div>
            <div class="options">
                <button class="delete" id="removeBook" data-id="${book.title}"><i class="fa-solid fa-xmark"></i></button>
                <button class="status" id="toggleRead" data-id="${book.title}"><i class="fa-brands fa-readme"></i></button>
                <button class="update" id="updateBook" data-id="${book.title}"><i class="fa-solid fa-pen"></i></button>
            </div>
        </div>
        `;
    };

    static bookOptions(el) {

        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
        else if(el.classList.contains('status')) {
            console.log(el.parentElement.parentElement.previousSibling);
        }
        else if(el.classList.contains('update')) {
            console.log(el.parentElement.parentElement.previousSibling);
        }
    };

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#read').value = '';
    };

    static showForm() {
        document.querySelector('#form-wrapper').style.display = 'flex';
    };

    static hideForm() {
        document.querySelector('#form-wrapper').style.display = 'none';
    };

    static showAlert(message, classname) {
        const div = document.createElement('div');
        div.className = `${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.form-header')
        container.appendChild(div);

        setTimeout(() => {
            document.querySelector('.error').remove();
        }, 1800);
    }
}

showFormBtn.addEventListener('click', () => {
    UI.showForm()
});

submitBtn.addEventListener('click', (event) => {

    event.preventDefault();

    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const pagesInput = document.querySelector('#pages').value;
    const readSelection = document.querySelector('#read').value;

    if(titleInput === '' || authorInput === '' || pagesInput === '') {
        UI.showAlert('Please fill all fields', 'error');
    }
    else {
        const book = new Book(titleInput, authorInput, pagesInput, readSelection);

        UI.addBookToList(book);

        UI.clearFields();

        UI.hideForm();
    }
});

class Store {

    static getBooks() {
        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
    };

    static addBooks() {

    };

    static removeBooks() {

    };
}

closeForm.addEventListener('click', () => {
    formWrap.style.display = 'none';
});

document.querySelector('#bookSelf').addEventListener('click', e => {
    UI.bookOptions(e.target);
});

document.addEventListener('DOMContentLoaded', UI.displayBooks);

/*
// Listen events and handle them
function listenOptionButtons() {
    const removeBookBtns = document.querySelectorAll('#removeBook');
    const toggleReadBtns = document.querySelectorAll('#toggleRead');
    const updateBookBtns = document.querySelectorAll('#updateBook');

    removeBookBtns.forEach((removeBookBtn) => {
        removeBookBtn.addEventListener('click', (event) => {
            myLibrary.splice(event.target.getAttribute('data-id'),1);
            refreshBookSelf();
        })
    });

    toggleReadBtns.forEach((readBtn) => {
        readBtn.addEventListener('click', (event) => {
            if(myLibrary[event.target.getAttribute('data-id')].read === true) {
                myLibrary[event.target.getAttribute('data-id')].read = false;
            }
            else {
                myLibrary[event.target.getAttribute('data-id')].read = true;
            }
            refreshBookSelf();
        })
    });

    updateBookBtns.forEach((updateBookBtn) => {
        updateBookBtn.addEventListener('click', (event) => {
            console.log(event)
            formWrap.style.display = 'flex';
            titleInput.value = myLibrary[event.target.getAttribute('data-id')].title;
            authorInput.value = myLibrary[event.target.getAttribute('data-id')].author;
            pagesInput.value = myLibrary[event.target.getAttribute('data-id')].pages;
            myLibrary[event.target.getAttribute('data-id')].title = titleInput.value;
            myLibrary[event.target.getAttribute('data-id')].author = authorInput.value;
            myLibrary[event.target.getAttribute('data-id')].pages = pagesInput.value;
            myLibrary.splice(event.target.getAttribute('data-id'),1);
            refreshBookSelf();
        })
    });
};

*/