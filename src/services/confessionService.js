import axios from 'axios';

class ConfessionService {
  constructor() {
    this.confession = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllConfessions() {
    return this.confession.get('/home').then(response => response.data);
  }

  getMyConfessions() {
    return this.confession.get('/myconfessions').then(response => response.data);
  }

  postNewConfession(body) {
    const { description, category, isDestroyed } = body;
    return this.confession.post('/confess', { description, category, isDestroyed }).then(({ data }) => data);
  }

  getOneConfession(id) {
    return this.confession.get(`confessions/${id}`).then(response => response.data);
  }

  deleteConfession(id) {
    return this.confession.delete(`myconfessions/${id}`).then(response => response.data);
  }

  likeConfession(id) {
    return this.confession.post(`/confessions/${id}/like`).then(({ data: confession }) => confession);
  }

  unlikeConfession(id) {
    return this.confession.post(`/confessions/${id}/unlike`).then(({ data: confession }) => confession);
  }

  reportConfession(id) {
    return this.confession.post(`/confessions/${id}/report`).then(({ data: confession }) => confession);
  }

}

const confessionService = new ConfessionService();

export default confessionService;
