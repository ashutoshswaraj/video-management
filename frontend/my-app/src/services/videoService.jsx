import apiClient from "./apiConfig"; // Import the configured Axios client

// Fetch videos for the logged-in user
export const fetchVideos = async (params) => {
  return await apiClient.get("/videos/allvideos", { params });
};

// Upload a video
export const uploadVideo = async (formData) => {
  return await apiClient.post("/videos/upload", formData);
};

export const searchVideos = async (query, userId) => {
  try {
    const response = await apiClient.get("/videos/search", {
      params: { query, userId },
    });
    return response.data;
  } catch (error) {
    throw error; // Propagate error if any occurs
  }
};
