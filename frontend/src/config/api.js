import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://scanlyzes.onrender.com';

axios.defaults.baseURL = API_BASE_URL;

export default axios;