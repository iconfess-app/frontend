import axios from 'axios';

class ChatService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getChats() {
    return this.axios.get('/getchats').then(({ data: chats }) => chats);
  }

}

const chatService = new ChatService();

export default chatService;
