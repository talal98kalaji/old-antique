const BASE_URL = "https://talalkalaji.pythonanywhere.com/api/categories/";
const defaultHeaders = {
  "Content-Type": "application/json",
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

export const addCategory = async (data) => {
  const response = await fetch(`${BASE_URL}add/`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const getCategoryById = async (id) => {
  const response = await fetch(`${BASE_URL}get/${id}/id`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(response);
};

export const getAllCategories = async () => {
  const response = await fetch(`${BASE_URL}getall/`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(response);
};

export const editCategory = async (id, data) => {
  const response = await fetch(`${BASE_URL}${id}/edit/`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}delete/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(response.statusText);
  return { status: response.status };
};

export default {addCategory,getCategoryById,getAllCategories,editCategory,deleteCategory,
};
