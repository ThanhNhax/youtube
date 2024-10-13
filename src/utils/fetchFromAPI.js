import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};
export const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { accessToken } = JSON.parse(localStorage.getItem('LOGIN_USER')).data;
    console.log({ accessToken });
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error?.response?.data?.status === 401) {
      try {
        const token = await extendTokenApi();
        console.log({ token });
      } catch (e) {
        console.log(e);
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export const extendTokenApi = async () => {
  const { data } = await api.post(
    `/auth/extend-token`,
    {},
    { withCredentials: true }
  );
  localStorage.setItem('LOGIN_USER', JSON.stringify(data));
  return data;
};

export const fetchFromAPI = async (url) => {
  const { data } = await api.get(`/${url}`, options);

  return data;
};

export const register = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);

  return data;
};

export const loginApi = async (payload) => {
  const { data } = await api.post(`/auth/login`, payload, {
    withCredentials: true, // nhận cookie ở BE tự set
  });

  return data;
};

export const getVideoById = async (id) =>
  (await axios.get(`${BASE_URL}/videos/${id}`)).data;

export const loginFaceBookApi = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/loginFacebook`, payload);

  return data;
};

export const loginAsyncKeyApi = async (payload) => {
  const { data } = await api.post(`/auth/login-async-key`, payload, {
    withCredentials: true, // nhận cookie ở BE tự set
  });

  return data;
};

export const forgotPasswordApi = async (payload) => {
  const { data } = await api.post(`/auth/forgot-password`, payload, {
    withCredentials: true, // nhận cookie ở BE tự set
  });

  return data;
};

export const changePasswordApi = async (payload) => {
  const { data } = await api.post(`/auth/change-password`, payload, {
    withCredentials: true, // nhận cookie ở BE tự set
  });

  return data;
};
