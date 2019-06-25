const axios = require('axios');

const BASE_URL = 'https://w1formmanagerfunctapp.azurewebsites.net/api/WaterOne_OpenSet_HTTPTrigger_URL?code=p9znvcugGcb3ubVfsRwe8kjiUbTA0RRjg5v9p3eURiqX804XHabe1w==&url=ZCC_BACKFLOW_SRV/';

// axios defaults
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';

export const apiService = axios;
// export const apiService = new ApiService();
