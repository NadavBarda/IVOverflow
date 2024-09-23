import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Function to check if token is expired
const checkTokenExpiration = (authHeader: string | null) => {
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return false;
    }
    const expirationDate = new Date(decodedToken.exp * 1000);

    if (expirationDate < new Date()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export interface AxData {
  url: string;
  data?: any;
  authHeader: string | null;
}

const ax = axios.create({
  baseURL: "http://localhost:3001",
});

const axiosGet = async ({ url, authHeader }: AxData): Promise<any> => {
  const isExpired = checkTokenExpiration(authHeader);

  if (isExpired) {
    return;
  }
  const token = authHeader ? authHeader : null;

  return await ax.get(url, {
    headers: {
      Authorization: token,
    },
  });
};

const axiosDelete = async ({ url, authHeader }: AxData): Promise<any> => {
  const isExpired = checkTokenExpiration(authHeader);
  if (isExpired) {
    return;
  }
  const token = authHeader ? authHeader : null;
  return await ax.delete(url, {
    headers: {
      Authorization: token,
    },
  });
};

const axiosPost = async ({ url, authHeader, data }: AxData): Promise<any> => {
  const isExpired = checkTokenExpiration(authHeader);
  if (isExpired) {
    return;
  }
  const token = authHeader ? authHeader : null;
  return await ax.post(url, data, {
    headers: {
      Authorization: token,
    },
  });
};

const axiosPut = async ({ url, authHeader, data }: AxData): Promise<any> => {
  const isExpired = checkTokenExpiration(authHeader);
  if (isExpired) {
    return;
  }
  const token = authHeader ? authHeader : null;
  return await ax.put(url, data, {
    headers: {
      Authorization: token,
    },
  });
};

export { axiosGet, axiosPost, axiosDelete, axiosPut };
