import { Message } from "./MessageTypes"
import MessageItem from "./MessageItem"

type MessageListProps = {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
};

export default function MessageList({ messages, setMessages }: MessageListProps) {
    const handleDelete = (messageId: number) => {
        setMessages(messages.filter((message) => message.id !== messageId));
    };

    const handleUpdate = (updatedMessage: Message) => {
        setMessages(messages.map((message) => message.id === updatedMessage.id ? updatedMessage : message));
    };
    return (
        <div>
            {messages.map((message) => (
                <MessageItem
                    key={message.id}
                    message={message}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
        </div>
    )
}