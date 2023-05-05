const api_key = "05668c799cbf7c1bc1b6dcb140252b48";
const requests = {
  fetchTrending: `/trending/movie/week?api_key=${api_key}&language=en-US`,
  fetchNetflixOriginals: `/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
  fetchTVMovies: `/discover/movie?api_key=${api_key}&with_genres=10770`,
  fetchTopRated: `/movie/top_rated?api_key=${api_key}&language=en-US&page=1`,
  fetchActionMovies: `/discover/movie?api_key=${api_key}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${api_key}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${api_key}&with_genres=27`,
  fetchAnimationMovies: `/discover/movie?api_key=${api_key}&with_genres=16`,
};
export default requests;
