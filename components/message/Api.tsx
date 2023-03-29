import { Message } from "./MessageTypes";

// deleteMessage関数
export async function deleteMessage(id: number) {
    const response = await fetch(`http://localhost:3001/api/v1/messages/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete message");
    }
  
    const data = await response.json();
    return data;
}

// updateMessage関数
export async function updateMessage(message: Message): Promise<Message> {
  const response = await fetch(`http://localhost:3001/api/v1/messages/${message.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Failed to update message");
  }

  const updatedMessage: Message = await response.json();
  return updatedMessage;
}

