import { BASE_URL, API_KEY } from "./config";
import axios from "axios";

const apiService = axios.create({
  baseURL: BASE_URL,
  apiKey: API_KEY,
});

export const getDataMovie = async (id) => {
  try {
    const url = `/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const res = await apiService.get(url);
    return res;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const getSearching = async (q, page) => {
  try {
    const res = await apiService.get(
      `/search/movie?api_key=${API_KEY}&query=${q}&page=${page}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviebyGenres = async (page, params) => {
  try {
    const res = await apiService.get(
      `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${params}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export default apiService;
