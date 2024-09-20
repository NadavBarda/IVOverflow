import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

const getToken = () => {
  return localStorage.getItem("token")
    ? "Bearer " + localStorage.getItem("token")
    : null;
};

const axiosGet = async (url: string, config?: AxiosRequestConfig) => {
  const token = getToken();
  return await instance.get(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: token,
    },
  });
};

const axiosDelete = async (url: string, config?: AxiosRequestConfig) => {
  const token = getToken();

  return await instance.delete(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: token,
    },
  });
};

const axiosPost = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  const token = getToken();
  return await instance.post(url, data, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: token,
    },
  });
};

const axiosPut = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  const token = getToken();
  return await instance.put(url, data, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: token,
    },
  });
};

export { axiosGet, axiosPost, axiosDelete, axiosPut };
