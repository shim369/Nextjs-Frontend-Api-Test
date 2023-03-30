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
    <form onSubmit={handleSubmit} className="bg-message-image bg-center h-[auto] w-[100%] p-7 my-5 mx-0">
      <div className="mb-5">
        <input
          className="bg-white focus:bg-white focus:border-blue-300 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          type="text"
          placeholder="Title"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-5">
        <textarea
          className="bg-white focus:bg-white focus:border-blue-300 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          placeholder="Content"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Submit</button>
      </div>
    </form>
  )
}
