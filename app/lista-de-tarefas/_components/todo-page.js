"use client";

import TodoCounts from "@/app/lista-de-tarefas/_components/todo-counts";
import TodoForm from "@/app/lista-de-tarefas/_components/todo-form";
import TodoList from "@/app/lista-de-tarefas/_components/todo-list";
import { SideBar } from "@/app/lista-de-tarefas/_components/todo-sidebar";
import { getTodos } from "@/actions/todos";
import { useState, useEffect } from "react";
import {
  addTemplate,
  getAllTemplates,
  getCurrentTemplate,
  selectCurrentTemplate,
} from "@/actions/templates";

export default function TodoPageComponent() {
  const [todos, setTodos] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    const current = getCurrentTemplate() || false;
    const todo = getTodos() || [];
    const allTemplate = getAllTemplates() || [];
    if (current !== currentTemplate) {
      setCurrentTemplate(current);
      console.log("mudou o template");
    }

    setAllTemplates(allTemplate);
    setTodos(todo);
    return () => clearTimeout(timer);
  }, [count, currentTemplate, allTemplates.length, todos.length]);

  useEffect(() => {
    const allTemplate = getAllTemplates() || [];
    const home = allTemplate.find((e) => e.name === "Home");
    if (!home) {
      addTemplate({ name: "Home" });
      selectCurrentTemplate("Home");
      console.log("default created");
    }
  }, [allTemplates]);
  return (
    <div className="relative flex w-full max-sm:flex-col">
      <div>
        <TodoForm />
        <SideBar allTemplates={allTemplates} currentTemplate={currentTemplate} />
      </div>
      <div className="w-full">
        <div className="flex h-[150px] bg-slate-700 justify-center items-center">
          <div className="flex flex-col h-full justify-around items-center">
            <h1 className="font-bold font text-3xl text-white">{currentTemplate}</h1>
            <TodoCounts todos={todos} />
          </div>
        </div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
