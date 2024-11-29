import axios from "../axios";

const getAllProducts = () => {
    return axios.get("/api/get-all-products");
};

const getDonationProducts = (donationId) => {
    return axios.get(`/api/get-donation-products?id=${donationId}`);
};

const addProductToDonation = (data) => {
    return axios.post(`/api/add-product-to-donation`, data);
};

const removeProductFromDonation = (data) => {
    return axios.post(`/api/remove-product-from-donation`, data);
};

const getProductById = (productId) => {
    return axios.get(`/api/get-product-by-id?id=${productId}`);
};

const getAllDonations = (userId) => {
    return axios.get(`/api/get-all-donations?userId=${userId}`);
};

const createNewDonationService = (data) => {
    return axios.post("/api/create-donation", data);
};

const getDonationDetails = (donationId) => {
    return axios.get(`/api/get-donation-details?id=${donationId}`);
};

const editDonationService = (data) => {
    return axios.put("/api/update-donation", data);
};

const deleteDonationService = (donationId) => {
    return axios.delete(`/api/delete-donation`, {
        data: {
            id: donationId, // truyền id của donation cần xóa
        },
    });
};

export {
	getAllProducts,
	getDonationProducts,
	addProductToDonation,
	removeProductFromDonation,
	getProductById,
    getAllDonations,
    createNewDonationService,
    getDonationDetails,
    editDonationService,
    deleteDonationService,
};
