import {Book, Library} from './library.js'

let library = new Library;

const addBtn = document.querySelector('.addBtn');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const form = document.querySelector('form');
const content = document.querySelector('.content');

const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const pageInput = document.querySelector("input[name='pages']")


function validateTitle(value) {
    if (!value.trim()) return "Title must not be empty";
    return "";
}

function validateAuthor(value) {
    if (!value.trim()) return "Don't forget about the author";
    return "";
}

function validatePages(value) {
    const val = value.trim();
    if (!val) return "How many pages does this book have?";
    if (isNaN(val)) return "I need a number";
    return "";
}

function addValidator(inputElement, validator) {
    const errorMessage = inputElement.parentNode.querySelector(".error-message");

    const val = function runValidation() {
        const errorText = validator(inputElement.value);
        errorMessage.textContent = errorText;
        errorMessage.classList.toggle("visible", !!errorText);
    }

    val();

    inputElement.addEventListener('input', val);

    return val;
}

const val1 = addValidator(titleInput, validateTitle);
const val2 = addValidator(authorInput, validateAuthor);
const val3 = addValidator(pageInput, validatePages);


function init() {
    let book = new Book('Alice in Wonderland', 'Lewis Carroll', 352, true);
    library.addBook(book);
    createBookCard(book);
}
init();

addBtn.addEventListener('click', () => {
    dialog.showModal();
})

cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    val1();     //somehow it works
    val2();
    val3();

    const hasError = form.querySelector(".error-message.visible");

    if (hasError) {
        return;
    }

    handleSubmit();
})

function extractFormData(formdata) {
    return [
        formdata.get('title'),
        formdata.get('author'),
        formdata.get('pages'),
        formdata.get('isRead')
    ];
}

function handleSubmit(e) {
    let formdata = new FormData(form);
    
    let book = new Book(...extractFormData(formdata));
    library.addBook(book);
    createBookCard(book);

    form.reset();
    dialog.close();
}

function createElem(type, text) {
    const elem = document.createElement(type);
    elem.textContent = text;
    return elem;
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = createElem('p', `Title: ${book.title}`)
    const author = createElem('p', `Author: ${book.author}`)
    const pages = createElem('p', `Pages: ${book.pages}`)
    const read = createElem('p', 'Read: ');
    const img = document.createElement('p');
    img.classList.add('image');

    img.setAttribute('read', book.read ? 'true' : 'false');
    img.addEventListener('click', () => {
        book.readToggle();
        if (book.read) {
            img.setAttribute('read', 'true');
        } else {
            img.setAttribute('read', 'false');
        }
    })
    read.classList.add('readStatus');
    read.appendChild(img);

    const removeBtn = createElem('button', 'Remove')
    removeBtn.addEventListener('click', (e) => {
        card.remove();
        library.removeBook(book.id);
    })

    card.append(title, author, pages, read, removeBtn);
    content.appendChild(card);
}