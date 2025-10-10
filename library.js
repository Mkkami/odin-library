export class Library {

    constructor() {
        this.books = [];
        this.size = 0;
    }

    addBook(book) {
        this.books.push(book);
        this.size++;
    }

    removeBook(id) {
        for (let i = 0; i < this.size; i++) {
            if (this.books[i].id == id) {
                this.books.splice(i, 1);
                break;
            }
        }
        this.size--;
    }
}

export class Book {

    id = this.generateID();

    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = isRead;
    }

    generateID() {
        return crypto.randomUUID();
    }

    readToggle() {
        this.read = !this.read;
    }   
}