// services/ProductService.js

const BASE_URL = "http://127.0.0.1:8000/api/products/";
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
    // في حال كان الخطأ من الـ API يرجّع الـ detail، وإلا يرجّع statusText
    const error = data?.detail || response.statusText;
    throw new Error(error);
  }
  return data;
};

// جلب جميع المنتجات مع إمكانية تمرير معاملات الفلترة/الترتيب/الصفحة
export const getAllProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}get/all/?${query}`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(response);
};

// جلب منتج حسب الـ id
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}get/${id}/`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(response);
};

// إضافة منتج جديد
export const addProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}add/`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

// تعديل منتج موجود
export const editProduct = async (id, productData) => {
  // إعداد خيارات الطلب
  const options = {
    method: "PUT",
    body: productData,   // FormData أو JSON
  };

  // إذا لم تكن FormData، أضف رأس JSON
  if (!(productData instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(productData);
  }

  const response = await fetch(`${BASE_URL}edit/${id}/`, options);
  return handleResponse(response);
};

// حذف منتج
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}delete/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return { status: response.status };
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
