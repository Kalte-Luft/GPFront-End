import axios from "../axios";
const getAllDonations = (inputId) => {
    return axios.get(`/api/get-all-donations?id=${inputId}`);
};
const createNewDonationService = (data) => {
    return axios.post("/api/create-donation", data);
};

const deleteDonationService = (donationId) => {
    return axios.delete(`/api/delete-donation`, {
        //goi phuong thuc delete
        data: {
            //truyen tham so vao
            id: donationId, //truyen id cua donation can xoa
        },
    });
};
const editDonationService = (inputData) => {
    return axios.put("/api/update-donation", inputData);
};

const getAllProducts = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`);
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
export {
    getAllDonations,
    createNewDonationService,
    deleteDonationService,
    editDonationService,
    getAllProducts,
    getAllUsers
};
