const axios = require('axios');

const TOKEN = "7393599549:AAE6k-8Y83gOFx1ASguuFC_MFv977S8hP6U";
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

function getAxiosInstance() {
    return {
        get(method, params) {
            return axios.get(`${BASE_URL}/${method}`, { params });
        },
        post(method, data) {
            return axios({
                method: "post",
                url: `${BASE_URL}/${method}`,
                data,
            });
        },
    };
}

module.exports = { axiosInstance: getAxiosInstance() };
