const form = document.querySelector(".form");
const newTitleInput = document.querySelector(".title-input");
const newAuthorInput = document.querySelector(".author-input");
const newPagesInput = document.querySelector(".pages-input");
const newReadStatusInput = document.querySelector(".status-check");
const newRatingInput = document.querySelector(".rating-input");
let ratingNum = document.querySelector(".rating-number");
let bookId = 0; // Initialize a variable to keep track of book IDs

// Object constructor
function Book(title, author, pages, status, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.rating = rating;
    this.id = bookId++; // Assign a unique ID to each book
}

//Submit event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = newTitleInput.value;
    const author = newAuthorInput.value;
    const pages = newPagesInput.value;
    const status = newReadStatusInput.checked;
    const rating = newRatingInput.value;
    const newBook = new Book(title, author, pages, status, rating);

    addNewBook(newBook);
});

function addNewBook(newBook) {
    const bookShelf = document.querySelector(".books");

    const statusClass = newBook.status === true ? "read" : "unread";
    const statusText = newBook.status === true ? "Read" : "Unread";

    const bookCard = document.createElement('div'); // Setting up the base to create a new card
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', newBook.id); // Keeping track of book IDs

    bookCard.innerHTML = `
        <h2 class="book-card-title">${newBook.title}</h2>
        <h3 class="book-card-author">${newBook.author}</h3>
        <p class="book-card-pages">${newBook.pages}</p>
        <button class="book-card-read ${statusClass}">${statusText}</button>
        <label>
            <input type="number" class="book-card-rating" placeholder="None" min="0" max="5" value="${newBook.status ? newBook.rating : ''}">
        </label>
        <button class="remove-btn">Delete</button>
    `;

    bookShelf.appendChild(bookCard); // Adding the newly created book card to the bookshelf

    // Resetting everything once book has been added
    form.reset();
    ratingNum.textContent = "Slide to rate";
    newRatingInput.disabled = true;
    ratingNum.style.color = "#b7b7b7";

    attachEventListeners(bookCard); // Attach event listeners to the new book card
}

function attachEventListeners(bookCard) {
    const statusButton = bookCard.querySelector('.book-card-read');
    const deleteButton = bookCard.querySelector('.remove-btn');

    statusButton.addEventListener('click', () => {
        if (statusButton.textContent === "Unread") {
            statusButton.style.backgroundColor = '#c3e8c3';
            statusButton.textContent = 'Read';
        } else {
            statusButton.style.backgroundColor = '#cecece';
            statusButton.textContent = 'Unread';
        }
    });

    deleteButton.addEventListener('click', () => {
        const bookId = bookCard.getAttribute('data-id');
        removeBook(bookId);
    });
}

function removeBook(bookId) { // Finding and removing the book relating to the remove button clicked
    const bookCard = document.querySelector(`.book-card[data-id='${bookId}']`);
    if (bookCard) {
        bookCard.remove();
    }
}

// Attaching event listeners to existing books
document.querySelectorAll('.book-card').forEach(bookCard => {
    bookCard.setAttribute('data-id', bookId++); // Assign a unique ID to each manually added book
    attachEventListeners(bookCard);
});

// Making the rating number currently selected show up
newRatingInput.addEventListener('change', () => {
    ratingNum.textContent = newRatingInput.value.toString();
});

// Functionality for disabling and enabling the rating section depending on having read or not
newReadStatusInput.addEventListener('change', () => {
    newRatingInput.disabled = !newReadStatusInput.checked;

    if (newReadStatusInput.checked) {
        ratingNum.style.color = "black";
        ratingNum.textContent = newRatingInput.value.toString();
    } else {
        ratingNum.style.color = "#b7b7b7";
        ratingNum.textContent = "Slide to rate";
    }
});

function attachedStatusEventListeners() {
    const statusButtons = document.querySelectorAll(".book-card-read");
    statusButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent === "Unread") {
                btn.style.backgroundColor = '#c3e8c3';
                btn.textContent = 'Read';
            } else {
                btn.style.backgroundColor = '#cecece';
                btn.textContent = 'Unread';
            }
        });
    });
}

attachedStatusEventListeners();
