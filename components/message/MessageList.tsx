

import { Key } from "react"
import MessageItem from "./MessageItem"

export default function TodoList({ todos }: any) {
    return (
        <div className="grid">
            {todos.map((todo: { id: Key | null | undefined }) => (
                <MessageItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}