"use client";
import { formSchema } from "@/schemas/zod/zod-schemas";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTemplate } from "./templates";

export const getTodos = () => {
  const currentTemplate = getCurrentTemplate();

  const todos = JSON.parse(localStorage.getItem(currentTemplate));

  return todos;
};
export const setTodos = (todoList) => {
  const currentTemplate = getCurrentTemplate();
  localStorage.setItem(currentTemplate, JSON.stringify(todoList));
};

export const CreateTodo = (values) => {
  const { title, description } = values;
  const validValues = formSchema.safeParse({ title, description });

  if (validValues.success === false) return { error: "Campos Inválidos" };

  let todos = getTodos() || [];
  const newTodo = { title, description, checkState: false, id: uuidv4() };
  todos.push(newTodo);
  setTodos(todos);
};

export const deleteTodo = (id) => {
  const todos = getTodos();
  const newtodos = todos.filter((todo) => todo.id !== id);
  setTodos(newtodos);
};

export const changeCheckState = (id, state) => {
  const todos = getTodos();
  const newTodos = todos.map((todo) => {
    if (todo.id === id) return { ...todo, checkState: state };
    return todo;
  });
  setTodos(newTodos);
};

export const editTodo = (values, id) => {
  const todos = getTodos();
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, title: values.title, description: values.description };
    }
    return todo;
  });
  setTodos(newTodos);
};
