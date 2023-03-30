import { useState, useEffect } from "react"
import { Message } from "../components/message/MessageTypes"
import Layout from "../components/message/Layout"
import MessageForm from "../components/message/MessageForm"
import MessageList from "../components/message/MessageList"


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3001/api/v1/messages");
      const data = await response.json();
      setMessages(data.data);
    };
    fetchPosts();
  }, [])

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <Layout>
      <MessageForm onMessageCreated={handleNewMessage} />
      <MessageList messages={messages} setMessages={setMessages} />
    </Layout>
  )
}