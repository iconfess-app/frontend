import axios from 'axios';

class ChatService {
  constructor() {
    this.chat = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getChats() {
    return this.chat.get('/getchats').then(({ data: chats }) => chats);
  }

}

const chatService = new ChatService();

export default chatService;
