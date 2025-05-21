const BASE_URL = "http://127.0.0.1:8000/api/";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const getUsers = () => {
  const token = localStorage.getItem("token");
  return fetch("http://127.0.0.1:8000/api/auth/users/", {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
  .then(handleResponse);
};


const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  let data = null;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const error = data?.detail || response.statusText;
    throw new Error(error);
  }

  return data;
};

export const login = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse(response);
  const token = data.access || data.token;
  localStorage.setItem("token", token);
  return data;
};

export const register = async (userData) => {
  const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${BASE_URL}accounts/user/`, {
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};


