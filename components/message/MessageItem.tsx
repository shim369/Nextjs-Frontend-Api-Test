import { useState } from "react";
import { Message } from "./MessageTypes"

type MessageItemProps = {
  message: Message;
  onDelete: (messageId: number) => void;
  onUpdate: (updatedMessage: Message) => void;
};
  
export default function MessageItem({ message, onDelete, onUpdate }: MessageItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(message.title);
  const [content, setContent] = useState(message.content);

  async function updateMessage(updatedMessage: Partial<Message>) {
    const response = await fetch(`http://localhost:3001/api/v1/messages/${updatedMessage.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMessage),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update message");
    }
  
    const data = await response.json();
    return data;
  }
  
  async function deleteMessage(messageId: number) {
    const response = await fetch(`http://localhost:3001/api/v1/messages/${messageId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete message");
    }
  
    const data = await response.json();
    return data;
  }

  const handleEdit = async () => {
    try {
      const updatedMessageData = { ...message, title, content };
      const data = await updateMessage(updatedMessageData);
      const updatedMessage = data.data;
      setEditing(false);
      setTitle(updatedMessage.title);
      setContent(updatedMessage.content);
      onUpdate(updatedMessage);
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage(message.id);
      onDelete(message.id);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (editing) {
    return (
      <div className="bg-white p-7 mb-5">
        <input
          className="mb-3 bg-white focus:bg-white focus:border-blue-300 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="mb-3 bg-white focus:bg-white focus:border-blue-300 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <div className="flex items-center justify-center">
          <button onClick={handleEdit} className="mr-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Save</button>
          <button onClick={() => setEditing(false)} className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-7 mb-5">
      <h2 className="mb-3">{message.title}</h2>
      <p className="mb-3">{message.content}</p>
      <div className="flex items-center justify-center">
        <button onClick={() => setEditing(true)} className="mr-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:outline-none text-white font-semibold py-2 px-4 rounded">Delete</button>
      </div>
    </div>
  );
}
