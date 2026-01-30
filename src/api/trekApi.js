import axiosInstance from "./axiosInstance";

/**
 * Creates a new trek in the database.
 * @param {Object} trekData - The trek data to be sent to the server.
 * @returns {Promise<Object>} - The response from the server.
 */
export const createTrek = async (trekData) => {
    try {
        const response = await axiosInstance.post("/api/trek", trekData);
        return response.data;
    } catch (error) {
        console.error("API Error (createTrek):", error);
        throw error.response?.data || error;
    }
};

/**
 * Fetches all trek categories.
 * @returns {Promise<Array>} - List of categories.
 */
export const getCategories = async () => {
    try {
        const response = await axiosInstance.get("/api/trek-categories");
        return response.data;
    } catch (error) {
        console.error("API Error (getCategories):", error);
        throw error.response?.data || error;
    }
};

/**
 * Fetches all treks.
 * @returns {Promise<Object>} - Response containing trek data.
 */
export const getTreks = async () => {
    try {
        const response = await axiosInstance.get("/api/trek");
        return response.data;
    } catch (error) {
        console.error("API Error (getTreks):", error);
        throw error.response?.data || error;
    }
};
