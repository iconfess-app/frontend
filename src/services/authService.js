import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { username, password, email, isOver16 } = user;
    return this.auth.post('/signup', { username, password, email, isOver16 }).then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/login', { email, password }).then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {}).then(response => response.data);
  }

  edit(user) {
    const { username, hashedPassword, avatar, lightMode, allowsContact, allowsLocation, email } = user;
    return this.auth
      .put('/edit', { username, hashedPassword, avatar, lightMode, allowsContact, allowsLocation, email })
      .then(({ data }) => data);
  }

  updatepassword(user) {
    const { password } = user;
    return this.auth.post('/updatepassword', { password }).then(({ data }) => data);
  }

  me(user) {
    return this.auth.get('/me').then(response => response.data);
  }
}

const authService = new AuthService();

export default authService;
