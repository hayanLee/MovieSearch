const $main = document.querySelector('.main');

// MockData
function getMovies() {
    return fetch('./popularMovies.json')
        .then((response) => response.json())
        .then((response) => {
            return response.results;
        })
        .catch((err) => console.error(err));
}

const createMovieCard = (imgSrc, title, content) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // imgUrl = baseURl + fileSize + filepath
    //https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original/${imgSrc}`;
    img.alt = '영화이미지';
    img.classList.add('movieImg');

    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
    titleElem.classList.add('movieTitle');

    const contentElem = document.createElement('p');
    contentElem.textContent = content;
    contentElem.classList.add('movieContent');

    card.appendChild(img);
    card.appendChild(titleElem);
    card.appendChild(contentElem);

    $main.appendChild(card);
};

getMovies().then((movies) => {
    console.log(movies);
    movies.forEach((movie) => {
        const { backdrop_path: imgSrc, title, overview: content, id } = movie;
        createMovieCard(imgSrc, title, content);
    });
});
