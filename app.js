const $cardContainer = document.querySelector('.cardContainer');
const $searchForm = document.querySelector('.searchForm');
const $input = document.querySelector('.searchForm__input');
const $btn = document.querySelector('.searchForm__btn');
const $header = document.querySelector('.header > h1');
const $uptoBtn = document.querySelector('.uptoBtn');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
    },
};

document.addEventListener('DOMContentLoaded', () => $input.focus());
$header.addEventListener('click', () => {
    window.location.reload();
});
$uptoBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

$searchForm.addEventListener('submit', handleForm);
function handleForm(e) {
    e.preventDefault();
    let text = e.target[0].value;

    if (text.trim() === '') return; // 빈 검색어 제거

    const $cards = document.querySelectorAll('.card');
    $cards.forEach((card) => {
        let search = card.children[1].textContent.toLowerCase();
        if (search.includes(text.toLowerCase())) card.style.display = 'block';
        else card.style.display = 'none';
    });
}

// MockData
// function getMovies() {
//     return fetch('./popularMovies.json')
//         .then((response) => response.json())
//         .then((response) => {
//             return response.results;
//         })
//         .catch((err) => console.error(err));
// }

// API
function getMovies() {
    return fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
    )
        .then((response) => response.json())
        .then((response) => {
            return response.results;
        })
        .catch((err) => console.error(err));
}

getMovies().then((movies) => {
    // console.log(movies);
    movies.forEach((movie) => {
        const { backdrop_path: imgSrc, title, overview: content, id } = movie;
        createMovieCard(imgSrc, title, content, id);
    });
});

const createMovieCard = (imgSrc, title, content, id) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = id;

    // imgUrl = baseURl + fileSize + filepath
    //https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original/${imgSrc}`;
    img.alt = '영화이미지';
    img.classList.add('movieImg');

    const titleElem = document.createElement('h2');
    titleElem.textContent = title;
    titleElem.classList.add('movieTitle');

    const contentElem = document.createElement('p');
    contentElem.textContent = content;
    contentElem.classList.add('movieContent');

    card.appendChild(img);
    card.appendChild(titleElem);
    card.appendChild(contentElem);

    $cardContainer.appendChild(card);

    card.addEventListener('click', clickCard);
};

const clickCard = (e) => {
    alert(e.currentTarget.id);
};
