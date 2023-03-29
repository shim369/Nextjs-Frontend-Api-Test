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
      <div>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button onClick={handleEdit}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{message.title}</h2>
      <p>{message.content}</p>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
