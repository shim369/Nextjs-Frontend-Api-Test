import { useState, useEffect } from "react";

interface Message {
  id: number;
  title: string;
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3001/api/v1/messages");
      const data = await response.json();
      setMessages(data.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <h2>{message.title}</h2>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;