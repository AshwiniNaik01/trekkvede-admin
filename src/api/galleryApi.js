import axiosInstance from "./axiosInstance";

/**
 * Adds new images to the gallery.
 * @param {FormData} formData - FormData containing TrekGalleryImage array.
 * @returns {Promise<Object>} - The response from the server.
 */
export const addGallery = async (formData) => {
    try {
        const response = await axiosInstance.post("/trek-gallery", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("API Error (addGallery):", error);
        throw error.response?.data || error;
    }
};

/**
 * Fetches all gallery records.
 * @returns {Promise<Object>} - Response containing gallery data.
 */
export const getAllGallery = async () => {
    try {
        const response = await axiosInstance.get("/trek-gallery");
        return response.data;
    } catch (error) {
        console.error("API Error (getAllGallery):", error);
        throw error.response?.data || error;
    }
};

/**
 * Updates a gallery record by ID.
 * @param {String} id - The ID of the gallery.
 * @param {FormData} formData - FormData containing updated images.
 * @returns {Promise<Object>} - The response from the server.
 */
export const updateGallery = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`/trek-gallery/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("API Error (updateGallery):", error);
        throw error.response?.data || error;
    }
};

/**
 * Deletes a specific item within a gallery record.
 * @param {String} galleryId - The ID of the gallery record.
 * @param {String} itemId - The ID of the specific image item in the gallery.
 * @returns {Promise<Object>} - The response from the server.
 */
export const deleteGalleryItem = async (galleryId, itemId) => {
    try {
        const response = await axiosInstance.delete(`/trek-gallery/${galleryId}/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("API Error (deleteGalleryItem):", error);
        throw error.response?.data || error;
    }
};
