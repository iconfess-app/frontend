import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    })
  }

  signup(user) {
    const { username, password } = user;
    return this.auth.post('/signup', {username, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/login', {username, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;