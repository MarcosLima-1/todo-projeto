"use client";
import { getTodos } from "@/actions/todos";
import { TodoCard } from "@/components/todo-card";
import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState();
  setInterval(() => {
    const localTodos = getTodos();
    setTodos(localTodos);
  }, 1000);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        {todos?.map((e) => (
          <TodoCard
            key={e.id}
            checkState={e.checkState}
            description={e.description}
            title={e.title}
            id={e.id}
          />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
