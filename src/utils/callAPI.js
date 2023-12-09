import axios from "axios";

const url = "http://localhost:3000";

export const findAllCategories = async () => {
  try {
    const response = await axios.get(url + "/api/categories");
    return response.data; // Dữ liệu từ API sẽ được trả về ở đây
  } catch (error) {
    // Xử lý lỗi ở đây nếu có
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const findAllPosts = async (page, cat) => {
  try {
    const response = await axios.get(
      url + `/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const findOnePost = async (slug) => {
  try {
    const response = await axios.get(url + `/api/posts/${slug}`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const popularPosts = async () => {
  try {
    const response = await axios.get(url + `/api/popularposts`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(url + `/api/users`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getOneUser = async (id) => {
  try {
    const response = await axios.get(url + `/api/users/${id}`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
