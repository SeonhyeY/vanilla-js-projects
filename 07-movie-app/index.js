import { API_KEY } from './env.js';

const removeAll = () => {
  const movies = document.querySelectorAll('.movie');
  movies.forEach((movie) => {
    movie.remove();
  });
};

const movieDetail = (e) => {
  const { id } = e.target.parentElement;
  const detailURL = `https://www.themoviedb.org/movie/${id}`;
  window.open(detailURL, '_blank');
};
const createBlock = ({
  id,
  original_title,
  title,
  poster_path,
  vote_average,
  release_date,
}) => {
  const parent = document.querySelector('.contents');
  const movie = document.createElement('div');
  const poster = document.createElement('img');
  const detail = document.createElement('div');
  const info = document.createElement('div');
  const releaseDate = document.createElement('div');
  const rate = document.createElement('div');
  const h3 = document.createElement('h3');

  movie.className = 'movie';
  detail.className = 'detail';
  info.className = 'info';
  releaseDate.className = 'date';
  rate.className = 'rate';

  movie.id = id;
  poster.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
  h3.innerText = `${original_title} (${title})`;
  releaseDate.innerText = release_date;
  rate.innerText = `⭐ ${vote_average}`;

  poster.addEventListener('click', movieDetail);

  info.append(releaseDate, rate);
  detail.append(info, h3);
  movie.append(poster, detail);
  parent.append(movie);
};
const getPopularMovies = () => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;

  fetch(URL)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((movie) => {
        createBlock(movie);
      });
    });
};
getPopularMovies();

const form = document.querySelector('form');

const searchMovie = (e) => {
  e.preventDefault();

  const input = document.querySelector('input');
  const { value: keyword } = input;
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`;

  if (keyword) {
    removeAll();
    fetch(searchURL)
      .then((response) => response.json())
      .then(({ results }) => {
        const message = document.querySelector('.message');
        message.innerText = `Result for "${keyword}"`;

        results.forEach((movie) => {
          createBlock(movie);
        });
      });
  }
};
form.addEventListener('submit', searchMovie);
