import axios from "../axios";
const getAllCampaigns = (inputId) => {
    return axios.get(`/api/get-all-campaigns?id=${inputId}`);
};
const createNewCampaignService = (data) => {
    return axios.post("/api/create-campaign", data);
    console.log("data", data);
};

const deleteCampaignService = (campaignId) => {
    return axios.delete(`/api/delete-campaign`, {
        //goi phuong thuc delete
        data: {
            //truyen tham so vao
            id: campaignId, //truyen id cua campaign can xoa
        },
    });
};
const editCampaignService = (inputData) => {
    return axios.put("/api/update-campaign", inputData);
};

const getAllProvinces = (inputId) => {
    return axios.get(`/api/get-all-provinces?id=${inputId}`);
};

export {
    getAllCampaigns,
    createNewCampaignService,
    deleteCampaignService,
    editCampaignService,
    getAllProvinces,
};
