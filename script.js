// Select form and movie list container
const form = document.getElementById("movie-form");
const movieList = document.getElementById("movie-list");

// Movie array to store movie objects
let movies = [];

// Function to render all movies
function renderMovies() {
    movieList.innerHTML = ""; // Clear previous list

    movies.forEach((movie, index) => {
        const movieCard = document.createElement("div");

        movieCard.style.color = "white";
        movieCard.style.backgroundColor = "#000";
        movieCard.style.padding = "10px";
        movieCard.style.margin = "10px 0";
        movieCard.style.borderRadius = "5px";

        movieCard.className = "movie-card";

        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Status:</strong> ${movie.watched ? " Watched" : " Not Watched"}</p>
            <button class="toggle" data-index="${index}">${movie.watched ? "Mark as Unwatched" : "Mark as Watched"}</button>
            <button class="delete" data-index="${index}">Delete</button>
            <hr>
        `;

        movieList.appendChild(movieCard);
    });
}

// Add movie on form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");

    const newMovie = {
        title: titleInput.value.trim(),
        genre: genreInput.value.trim(),
        watched: false
    };

    if (newMovie.title && newMovie.genre) {
        movies.push(newMovie);
        renderMovies();
        form.reset(); // Clear form inputs
    } else {
        alert("Please enter both title and genre!");
    }
});

// Handle toggle and delete actions
movieList.addEventListener("click", function (e) {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("toggle")) {
        movies[index].watched = !movies[index].watched;
        renderMovies();
    }

    if (e.target.classList.contains("delete")) {
        movies.splice(index, 1);
        renderMovies();
    }
});

function fetchAnimeQuote() {
    fetch("https://animechan.xyz/api/random")
        .then(res => res.json())
        .then(quote => {
            const quoteBox = document.createElement("div");
            quoteBox.className = "quote-box";
            quoteBox.style.backgroundColor = "#000";
            quoteBox.style.color = "#fff";
            quoteBox.style.padding = "10px";
            quoteBox.style.margin = "10px 0";
            quoteBox.style.borderRadius = "10px";

            quoteBox.innerHTML = `
                <blockquote>"${quote.quote}"</blockquote>
                <button id="new-quote" onclick="fetchAnimeQuote()">Get New Quote</button>
                <p>— ${quote.character} (${quote.anime})</p>
            `;

            movieList.prepend(quoteBox);
        })
        .catch(error => {
            console.error("Error fetching anime quote:", error);
        });
}
