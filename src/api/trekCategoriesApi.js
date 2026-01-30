/**
 * Fetches all trek categories.
 * @returns {Promise<Array>} - List of categories.
 */
export const getCategories = async () => {
    try {
        const response = await axiosInstancs.get("/api/trek-categories");
        return response.data;
    } catch (error) {
        console.error("API Error (getCategories):", error);
        throw error.response?.data || error;
    }
};