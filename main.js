const addBtn = document.querySelector('.addBtn');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('#confirmBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const form = document.querySelector('form');
const content = document.querySelector('.content');

const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.id = crypto.randomUUID();
}

Book.prototype.readToggle = function() {
    this.read = !this.read;
}

let aiw = new Book('Alice in Wonderland', 'Lewis Carroll',352);
aiw.readToggle();
console.log(aiw);
myLibrary.push(aiw);
createBookCard(aiw);


addBtn.addEventListener('click', () => {
    dialog.showModal();
})


// confirmBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//     }
//     handleSubmit();
// })

cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
})

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages);
    if (isRead) {
        newBook.readToggle();
    }
    myLibrary.push(newBook);
}

function handleSubmit(e) {
    
    let formdata = new FormData(form);
    addBookToLibrary(
        formdata.get('title'),
        formdata.get('author'),
        formdata.get('pages'),
        formdata.get('isRead')
    );
    createBookCard(myLibrary.at(-1));

    form.reset();
    dialog.close();

    console.log(myLibrary);
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

    const img = document.createElement('img');
    img.src = book.read ? 'img/checkbox-outline.svg' : 'img/close-box-outline.svg';
    read.classList.add('readStatus');
    read.appendChild(img);

    const readBtn = createElem('button', 'Read')
    readBtn.addEventListener('click', () => {
        book.readToggle();
        img.src = book.read ? 'img/checkbox-outline.svg' : 'img/close-box-outline.svg';
    })

    const removeBtn = createElem('button', 'Remove')
    removeBtn.addEventListener('click', (e) => {
        card.remove();
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === book.id) {
                myLibrary.splice(i, 1);
                break;
            }
        }
    })
    card.append(title, author, pages, read, readBtn, removeBtn);
    content.appendChild(card);
}