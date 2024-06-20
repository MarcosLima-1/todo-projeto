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

  const templateChanged = () => {
    const current = getCurrentTemplate();
    const todo = getTodos();
    setCurrentTemplate(current);
    setTodos(todo);
  };

  const templateUpdate = () => {
    const allTemplate = getAllTemplates() || [];
    setAllTemplates(allTemplate);
  };

  const todoUpdate = () => {
    const todo = getTodos() || [];
    setTodos(todo);
  };

  useEffect(() => {
    const current = getCurrentTemplate() || "";
    const allTemplate = getAllTemplates() || [];
    const home = allTemplate.find((e) => e.name === "Home");
    if (!home) {
      addTemplate({ name: "Home" });
      selectCurrentTemplate("Home");
    }
    if (!current) {
      selectCurrentTemplate("Home");
    }
  }, []);

  useEffect(() => {
    if (!currentTemplate) {
      const current = getCurrentTemplate();
      const todo = getTodos() || [];
      const allTemplate = getAllTemplates() || [];
      setAllTemplates(allTemplate);
      setCurrentTemplate(current);
      setTodos(todo);
    }
  }, [currentTemplate]);

  return (
    <div className="relative flex w-full max-sm:flex-col">
      <div>
        <TodoForm todoUpdate={todoUpdate} />
        <SideBar
          allTemplates={allTemplates}
          currentTemplate={currentTemplate}
          templateUpdate={templateUpdate}
          templateChanged={templateChanged}
        />
      </div>
      <div className="w-full">
        <div className="flex h-[150px] bg-slate-700 justify-center items-center">
          <div className="flex flex-col h-full justify-around items-center">
            <h1 className="font-bold font text-3xl text-white">{currentTemplate}</h1>
            <TodoCounts todos={todos} />
          </div>
        </div>
        <TodoList todos={todos} todoUpdate={todoUpdate} />
      </div>
    </div>
  );
}
