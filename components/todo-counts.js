"use client";
import { getTodos } from "@/actions/todos";
import { useState } from "react";

export const MiniCard = ({ name, number }) => {
  return (
    <div className="flex h-[32px]">
      <p className="bg-white  rounded-l-lg p-2 flex items-center justify-between">{name}:</p>
      <span className="bg-black rounded-r-lg p-2 text-white flex items-center justify-between font-semibold">
        {number}
      </span>
    </div>
  );
};

const TodoCounts = () => {
  const [todos, setTodos] = useState([]);
  setInterval(() => {
    const localTodos = getTodos();
    setTodos(localTodos);
  }, 1000);

  return (
    <div className="flex gap-4">
      <MiniCard
        name="Restantes"
        number={todos?.filter((todo) => todo.checkState !== true).length}
      />
      <MiniCard
        name="Completos"
        number={todos?.filter((todo) => todo.checkState !== false).length}
      />
      <MiniCard name="Total" number={todos?.length} />
    </div>
  );
};

export default TodoCounts;
