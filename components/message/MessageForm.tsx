import { useState } from "react"
import { Message } from "./MessageTypes"
import { createMessage as createMessageAPI } from "../../utils/messageAPI"

type MessageFormProps = {
  onMessageCreated: (newMessage: Message) => void;
};

async function createMessage(message: Partial<Message>) {
    const response = await fetch("http://localhost:3001/api/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create message");
    }
  
    const data = await response.json();
    return data.data;
  }
  
export default function MessageForm({ onMessageCreated }: MessageFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newMessage = { title, content };
      const createdMessage = await createMessageAPI(newMessage);
      onMessageCreated(createdMessage); 
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to create message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
