import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request made to:", config.url);
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("Error in request:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response received from:", response.config.url);
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("Error in response:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const PATH = {
  signup: "/api/user/signup",
  login: "/api/user/login",
};

const signup = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    return await api.post(PATH.signup, {
      username,
      email,
      password,
    });
  } catch (error) {
    console.error("Failed to signup:", error);
    throw new Error("Failed to signup");
  }
};

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    return await api.post(PATH.login, {
      username,
      password,
    });
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error("Failed to login");
  }
};

export const useApi = () => {
  return {
    signup,
    login,
  };
};
