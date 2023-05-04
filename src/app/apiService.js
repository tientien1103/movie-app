import { BASE_URL, API_KEY } from "./config";
import axios from "axios";
const contentType = "application/json;charset=utf-8";
const AUTH = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmVkOWVmY2MwNWFkNDIyY2M0NjVlZDAxNDRmMWIzMSIsInN1YiI6IjYzZGJmNzNlMjVhNTM2MDA4ZmJhNGU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gzGQu91Cxdr7GJuEGX0lKWL5rKav_f1sftyGKTM4e-4`;

const apiService = axios.create({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  headers: {
    Authorization: AUTH,
    "Content-Type": contentType,
  },
});

// export const getDataMovie = async (id, page = "", language = "en-US") => {
//   try {
//     const url = `/movie/${id}?api_key=${API_KEY}&language=en-US`;
//     const res = await apiService.get(url);
//     return res;
//   } catch (error) {
//     console.log(error.message);
//     return false;
//   }
// };
export default apiService;
