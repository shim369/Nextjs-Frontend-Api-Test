import { Message } from "../components/message/MessageTypes";

export async function createMessage(message: Partial<Message>) {
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