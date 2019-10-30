import axios from 'axios';

class ConfessionService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllConfessions() {
    return this.axios.get('/home').then(response => response.data);
  }
}

const confessionService = new ConfessionService();

export default confessionService;
