import {Book, Library} from './library.js'

let library = new Library;

const addBtn = document.querySelector('.addBtn');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const form = document.querySelector('form');
const content = document.querySelector('.content');


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