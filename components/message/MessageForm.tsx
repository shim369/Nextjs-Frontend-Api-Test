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


  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const validateTitle = (title: string): string => {
  if (!title) {
      return "Please enter a title.";
    }
    if (title.length > 50) {
      return "Please enter a title within 50 characters.";
    }
    return "";
  };

  const validateContent = (content: string): string => {
    if (!content) {
      return "Please enter a title.";
    }
    if (content.length > 200) {
      return "Please enter content within 200 characters.";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const titleValidationError = validateTitle(title);
    const contentValidationError = validateContent(content);
  
    setTitleError(titleValidationError);
    setContentError(contentValidationError);
  
    if (!titleValidationError && !contentValidationError) {
      try {
        const newMessage = { title, content };
        const createdMessage = await createMessageAPI(newMessage);
        onMessageCreated(createdMessage);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Failed to create message:", error);
      }
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
          onBlur={() => setTitleError(validateTitle(title))}
        />
      </div>
      <div className="text-center text-white mb-5">
        {titleError && <p className="error-message">{titleError}</p>}
      </div>
      <div className="mb-5">
        <textarea
          className="bg-white focus:bg-white focus:border-blue-300 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          placeholder="Content"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onBlur={() => setContentError(validateContent(content))}
        ></textarea>
      </div>
      <div className="text-center text-white mb-5">
        {contentError && <p className="error-message">{contentError}</p>}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Submit</button>
      </div>
    </form>
  )
}
