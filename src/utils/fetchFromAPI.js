import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const register = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);

  return data;
};

export const loginApi = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, payload);

  return data;
};

export const getVideoById = async (id) =>
  (await axios.get(`${BASE_URL}/videos/${id}`)).data;
