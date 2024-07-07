const form = document.querySelector(".form");
const newTitleInput = document.querySelector(".title-input");
const newAuthorInput = document.querySelector(".author-input");
const newPagesInput = document.querySelector(".pages-input");
const newReadStatusInput = document.querySelector(".status-check");
const newRatingInput = document.querySelector(".rating-input");

let ratingNum = document.querySelector(".rating-number")

function Book(title, author, pages, status, rating) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.rating = rating;
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = newTitleInput.value;
    const author = newAuthorInput.value;
    const pages = newPagesInput.value;
    const status = newReadStatusInput.checked;
    const rating = newRatingInput.value;

    const newBook = new Book(title, author, pages, status, rating);

     console.log(newBook);

     addNewBook(newBook);

});


function addNewBook(newBook) {
    const bookShelf = document.querySelector(".books");

    const statusClass = newBook.status === true ? "read" : "unread";
    const statusText = newBook.status === true ? "Read" : "Unread";

    bookShelf.innerHTML += `
        <div class="book-card">
            <h2 class="book-card-title">${newBook.title}</h2>
            <h3 class="book-card-author">${newBook.author}</h3>
            <p class="book-card-pages">${newBook.pages}</p>
            
 
            <button class="book-card-read ${statusClass}">${statusText}</button>

            <label>
                <input type="number" class="book-card-rating" placeholder="None" min="0" max="5" value="${newReadStatusInput.checked ? newBook.rating : undefined}">
            </label>
            <button class="remove-btn">Delete</button>
        </div>
        
    `;

    form.reset();
    ratingNum.textContent = "Slide to rate";
    newRatingInput.disabled = true;
    ratingNum.style.color = "#b7b7b7";
    attachedStatusEventListeners(); // This makes sure all, including the new book, have event listeners on their read buttons.


}


newRatingInput.addEventListener('change', () => {
    ratingNum.textContent = newRatingInput.value.toString();
})


newReadStatusInput.addEventListener('change', () => {
    newRatingInput.disabled = !newReadStatusInput.checked;

    if (newReadStatusInput.checked) {
        ratingNum.style.color = "black";
        ratingNum.textContent = newRatingInput.value.toString();
    } else {
        ratingNum.style.color = "#b7b7b7";
        ratingNum.textContent = "Slide to rate";

    }
})



function attachedStatusEventListeners() {
    const statusButtons = document.querySelectorAll(".book-card-read");
    // query selector all creates a list


    // Have to iterate over that list, giving each button its own listener
    statusButtons.forEach(btn => { //for each will run through the list with a function within the brackets
        btn.addEventListener('click', () => {

            if (btn.textContent === "Unread") {
                btn.style.backgroundColor = '#c3e8c3';
                btn.textContent = 'Read'
            } else {
                btn.style.backgroundColor = '#cecece';
                btn.textContent = 'Unread'
            }



        })
    })

}


attachedStatusEventListeners(); // this gives all the buttons their initial event listener


