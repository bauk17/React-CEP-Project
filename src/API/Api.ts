import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});
