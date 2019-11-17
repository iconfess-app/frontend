import React from 'react';

const ChatBubble = () => {
  return (
    <div className="chat-bubble">
      <p>{this.props.children}</p>
    </div>
  );
};

export default ChatBubble;