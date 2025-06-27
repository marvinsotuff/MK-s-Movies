document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("movie-form");
    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");
    const movieList = document.getElementById("movie-list");

    // Load movies on page load
    fetchMovies();

    // Event Listener #1 - Submit Form
    form.addEventListener("submit", handleAddMovie);

    function fetchMovies() {
        fetch("http://localhost:3000/movies")
            .then(res => res.json())
            .then(data => renderMovies(data))
            .catch(err => console.error("Fetch failed:", err));
    }

    function renderMovies(movies) {
        movieList.innerHTML = "";
        movies.forEach(renderMovieCard); // Array iteration
    }

    function renderMovieCard(movie) {
        const card = document.createElement("div");
        card.style.border = "3px solid greenyellow";
        card.style.backgroundColor = "#333"
        card.style.color = "white"
        card.style.padding = "10px";
        card.style.margin = "10px 0";
        card.classList.add("movie-card");

        card.innerHTML = `
      <h3>${movie.title}</h3>
      <p>Genre: ${movie.genre}</p>
      <p>Status: <strong>${movie.watched ? " Watched" : " Not Watched"}</strong></p>
      <button class="toggle-watch">${movie.watched ? "Mark Unwatched" : "Mark Watched"}</button>
      <button class="delete">Delete</button>
    `;

        // Event Listener #2 - Toggle Watched
        card.querySelector(".toggle-watch").addEventListener("click", () => toggleWatched(movie));

        // Event Listener #3 - Delete Movie
        card.querySelector(".delete").addEventListener("click", () => deleteMovie(movie.id));

        movieList.appendChild(card);
    }

    function handleAddMovie(e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const genre = genreInput.value.trim();

        if (!title || !genre) {
            alert("Please fill in both fields.");
            return;
        }

        const newMovie = {
            title,
            genre,
            watched: false
        };

        fetch("http://localhost:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(() => {
                fetchMovies(); // Refresh list
                form.reset();  // Clear form
            });
    }

    function toggleWatched(movie) {
        fetch(`http://localhost:3000/movies/${movie.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ watched: !movie.watched })
        })
            .then(() => fetchMovies());
    }

    function deleteMovie(id) {
        fetch(`http://localhost:3000/movies/${id}`, {
            method: "DELETE"
        })
            .then(() => fetchMovies());
    }
});


function fetchAnimeQuote() {
    fetch("https://animechan.xyz/api/random")
        .then(res => res.json())
        .then(data => {
            const quoteBox = document.getElementById("quote-box");
            quoteBox.innerHTML = `
                <p>"${data.quote}"</p>
                <p><strong>- ${data.character}</strong> from <em>${data.anime}</em></p>
            `;
        })
        .catch(err => {
            const quoteBox = document.getElementById("quote-box");
            quoteBox.innerHTML = `<p>Oops! Could not load quote. Try again later.</p>`;
            console.error("Animechan API error:", err);
        });
}

