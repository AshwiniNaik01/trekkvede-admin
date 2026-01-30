import axiosInstance from "./axiosInstance";

/**
 * Creates a new trek category.
 * @param {FormData} categoryData - The category data with image.
 * @returns {Promise<Object>} - The response from the server.
 */
export const createCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post("/trek-categories", categoryData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("API Error (createCategory):", error);
        throw error.response?.data || error;
    }
};

/**
 * Fetches all trek categories.
 * @returns {Promise<Array>} - List of categories.
 */
export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get("/trek-categories");
        return response.data;
    } catch (error) {
        console.error("API Error (getAllCategories):", error);
        throw error.response?.data || error;
    }
};

/**
 * Fetches a single trek category by ID.
 * @param {String} id - The ID of the category.
 * @returns {Promise<Object>} - The category data.
 */
export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/trek-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error (getCategoryById):", error);
        throw error.response?.data || error;
    }
};

/**
 * Updates a trek category by ID.
 * @param {String} id - The ID of the category.
 * @param {FormData} categoryData - The updated category data.
 * @returns {Promise<Object>} - The response from the server.
 */
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await axiosInstance.put(`/trek-categories/${id}`, categoryData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("API Error (updateCategory):", error);
        throw error.response?.data || error;
    }
};

/**
 * Deletes a trek category by ID.
 * @param {String} id - The ID of the category to delete.
 * @returns {Promise<Object>} - The response from the server.
 */
export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(`/trek-categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error (deleteCategory):", error);
        throw error.response?.data || error;
    }
};