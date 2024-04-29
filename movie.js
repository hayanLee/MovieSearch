//영화 정보를 가져와서 ui에 리스팅
const $cardContainer = document.querySelector('.cardContainer');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWNmOGYwMTA4YjcwODA3NDI0YWVhZjFkMDExMGY2NSIsInN1YiI6IjYyNTdiZjFmZDZkYmJhMDA5OGM0MGFlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee2ocg2kilfxcTv_uW6jbBUliMHyw6f59mBKiBICEx8',
    },
};

// API
// export function getMovies() {
//     return fetch(
//         'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
//         options
//     )
//         .then((response) => response.json())
//         .then((res) => res.results)
//         .then((movies) => {
//             movies.forEach((movie) => {
//                 const { backdrop_path: imgSrc, title, overview: content, id } = movie;
//                 createMovieCard(imgSrc, title, content, id);
//             });
//         })
//         .catch((err) => console.error(err));
// }

export async function getMovies() {
    try {
        const res = await fetch(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
            options
        );
        const data = await res.json();
        const movies = data.results;
        movies.forEach((movie) => {
            const { backdrop_path: imgSrc, title, overview: content, id } = movie;
            createMovieCard(imgSrc, title, content, id);
        });
    } catch (e) {
        console.log(`Error of Fetch Movie Data : `, e);
    }
}

// mockData
// export function getMovies() {
//     return fetch('./assets/popularMovies.json')
//         .then((response) => response.json())
//         .then((response) => response.results)
//         .then((movies) => {
//             movies.forEach((movie) => {
//                 // console.log(movie);
//                 const { backdrop_path: imgSrc, title, overview: content, id } = movie;

//                 createMovieCard(imgSrc, title, content, id);
//             });
//         })
//         .catch((err) => console.error(err));
// }

// export async function getMovies() {
//     try {
//         const res = await fetch('./assets/popularMovies.json');
//         const data = await res.json();
//         const movies = data.results;
//         movies.forEach((movie) => {
//             const { backdrop_path: imgSrc, title, overview: content, id } = movie;
//             createMovieCard(imgSrc, title, content, id);
//         });
//     } catch (e) {
//         console.log(`Error of Fetch Movie Data : `, e);
//     }
// }

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

    card.addEventListener('click', clickCard); // 이벤트 버블링
};

const clickCard = (e) => {
    alert(e.currentTarget.id);
};
