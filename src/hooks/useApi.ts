import axios from "axios";
import useUserStore from "../store";

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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Erreur dans la requête:", error);
    return Promise.reject(error);
  }
);

const PATH = {
  signup: "/api/user/signup",
  login: "/api/user/login",
  knowledgeAdd: "/api/knowledge-set/add",
  knowledgeSets: "/api/knowledge-set",
};

const setToken = (token: string) => {
  const userStore = useUserStore.getState(); // Utiliser le store directement
  userStore.setToken(token);
  localStorage.setItem("access_token", token);
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
    const response = await api.post(PATH.signup, { username, email, password });
    const token = response?.data?.access_token;
    if (token) {
      setToken(token);
    }
    return response;
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
    const response = await api.post(PATH.login, { username, password });
    const token = response?.data?.access_token;
    if (token) {
      setToken(token);
    }
    return response;
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error("Failed to login");
  }
};

const addKnowledgeSet = async (KnowledgeSet: any) => {
  try {
    const response = await api.post(PATH.knowledgeAdd, {
      ...KnowledgeSet,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add knowledge set:", error);
    throw error;
  }
};

const getUserKnowledgeSets = async () => {
  try {
    const response = await api.get(PATH.knowledgeSets);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch knowledge sets:", error);
    throw error;
  }
};

const getKnowledgeSetById = async (id: string) => {
  try {
    const response = await api.get(`${PATH.knowledgeSets}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch knowledge set:", error);
    throw error;
  }
};

const getQuestion = async (knowledgeId: string, id: string) => {
  try {
    const response = await api.get(
      `${PATH.knowledgeSets}/${knowledgeId}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch knowledge set:", error);
    throw error;
  }
};

export const useApi = () => {
  return {
    getKnowledgeSetById,
    addKnowledgeSet,
    signup,
    login,
    getUserKnowledgeSets,
  };
};
