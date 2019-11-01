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

  getMyConfessions() {
    return this.axios.get('/myconfessions').then(response => response.data);
  }

  postNewConfession(body) {
    const { description, category, isDestroyed } = body;
    return this.axios.post('/confess', { description, category, isDestroyed }).then(({ data }) => data);
  }

  getOneConfession(id) {
    return this.axios.get(id).then(response => response.data);
  }
}

const confessionService = new ConfessionService();

export default confessionService;
