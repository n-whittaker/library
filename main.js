const submit = document.querySelector(".submit");
const newTitleInput = document.querySelector(".title-input");
const newAuthorInput = document.querySelector(".author-input");
const newPagesInput = document.querySelector(".pages-input");
const newReadStatusInput = document.querySelector(".read-input");
const newRatingInput = document.querySelector(".rating-input");

function Book(title, author, pages, status, rating) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.rating = rating;
}


submit.addEventListener('click', (event) => {
    event.preventDefault();

    const title = newTitleInput.value;
    const author = newAuthorInput.value;
    const pages = newPagesInput.value;
    const status = newReadStatusInput.value;
    const rating = newRatingInput.value;

    const newBook = new Book(title, author, pages, status, rating);

     console.log(newBook);

     addNewBook(newBook);

});


function addNewBook(newBookObject) {
    const bookShelf = document.querySelector(".books");
    const newBook = newBookObject;

    bookShelf.innerHTML += `
        <div class="book-card">
            <h2 class="book-card-title">${newBook.title}</h2>
            <h3 class="book-card-author">${newBook.author}</h3>
            <p class="book-card-pages">${newBook.pages}</p>
            <button class="book-card-read">${newBook.status}</button>
            <label>
                <input type="number" class="book-card-rating" placeholder="None" min="0" max="5" value="${newBook.rating}">
            </label>
            <button class="remove-btn">Delete</button>
        </div>
    
    `;
}

