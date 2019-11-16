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
    return this.axios.get(`confessions/${id}`).then(response => response.data);
  }

  deleteConfession(id) {
    return this.axios.delete(`myconfessions/${id}`).then(response => response.data);
  }

  likeConfession(id) {
    return this.axios.post(`/confessions/${id}/like`).then(({ data: confession }) => confession);
  }

  unlikeConfession(id) {
    return this.axios.post(`/confessions/${id}/unlike`).then(({ data: confession }) => confession);
  }

  reportConfession(id) {
    return this.axios.post(`/confessions/${id}/report`).then(({ data: confession }) => confession);
  }

}

const confessionService = new ConfessionService();

export default confessionService;
