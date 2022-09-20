const bookSelf = document.querySelector('#bookSelf');
let myLibrary = [];
const showForm = document.querySelector('#showForm');
const form = document.querySelector('#form');
const closeForm = document.querySelector('#closeForm');
const formWrap = document.querySelector('#form-wrapper');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readSelection = document.querySelector('#read');
const submitBtn = document.querySelector('#submit');

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

showForm.addEventListener('click', () => {
    formWrap.style.display = 'flex';
});

form.addEventListener('click', (event) => {
    event.preventDefault();
});

submitBtn.addEventListener('click', () => {
    addBookToLibrary(new Book(titleInput.value, authorInput.value, pagesInput.value, readSelection.value));
    refreshBookSelf()
    formWrap.style.display = 'none';
});

closeForm.addEventListener('click', () => {
    formWrap.style.display = 'none';
});

// Displays Books
function refreshBookSelf() {
    let output = '';
    for(bookIndex in myLibrary) {
        output +=
        `
        <div id="book-${bookIndex}" class="book-card">
            <h3>${myLibrary[bookIndex].title}</h3>
            <div class="book-desc">
                <p>Author: ${myLibrary[bookIndex].author}</p>
                <p>Pages: ${myLibrary[bookIndex].pages}</p>
                <p>Read: ${myLibrary[bookIndex].read}</p>
            </div>
            <div class="options">
                <i id="removeBook" data-id="${bookIndex}" class="fa-solid fa-xmark"></i>
                <i id="toggleRead" data-id="${bookIndex}" class="fa-brands fa-readme"></i>
                <i id="updateBook" data-id="${bookIndex}" class="fa-solid fa-pen"></i>
            </div>
        </div>
        `;
    }
    bookSelf.innerHTML = output;
    listenOptionButtons()
};

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

// Load preset
window.addEventListener('load', () => {
    const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
    const NineteenEightyFour = new Book ('Nineteen Eighty-Four', 'George Orwell', 254, false);
    const jsAndJquery = new Book ('JavaScript & JQuery: Interactive Front-End Web Development', 'Jon Duckett', 640, false);
    const JavaScriptTheGoodParts = new Book ('JavaScript: The Good Parts', 'Douglas Crockford', 172, false);
    const eloquentJs = new Book ('Eloquent JavaScript: A Modern Introduction to Programming', 'Marjin Haverbeke', 472, false);
    addBookToLibrary(theHobbit);
    addBookToLibrary(NineteenEightyFour);
    addBookToLibrary(jsAndJquery);
    addBookToLibrary(JavaScriptTheGoodParts);
    addBookToLibrary(eloquentJs);
    refreshBookSelf();
});

function addBookToLibrary(book) {
    myLibrary.push(book);
};