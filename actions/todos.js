"use client";
import { formSchema } from "@/schemas/zod/zod-schemas";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTemplate } from "./templates";

/* #region Pega as tarefas da Categoria atual */
export const getTodos = () => {
  const currentTemplate = getCurrentTemplate();

  const todos = JSON.parse(localStorage.getItem(currentTemplate)) || [];

  return todos;
};
/* #endregion */

/* #region Pega a Categoria atual e seta uma nova lista de todo */
export const setTodos = (todoList) => {
  const currentTemplate = getCurrentTemplate();
  localStorage.setItem(currentTemplate, JSON.stringify(todoList));
};
/* #endregion */

/* #region Cria uma tarefa nova */
export const CreateTodo = (values) => {
  const { title, description } = values;
  const validValues = formSchema.safeParse({ title, description });

  if (validValues.success === false) return { error: "Campos Inválidos" };

  let todos = getTodos() || [];
  const todosLength = todos.length;
  const newTodo = { title, description, checkState: false, id: uuidv4(), sort: todosLength + 1 };
  todos.push(newTodo);
  setTodos(todos);
  return { success: "Tarefa criada" };
};
/* #endregion */

/* #region Apaga uma tarefa */
export const deleteTodo = (id) => {
  const todos = getTodos();
  const newtodos = todos.filter((todo) => todo.id !== id);
  setTodos(newtodos);
};
/* #endregion */

/* #region Muda o estado de check de uma tarefa */
export const changeCheckState = (id, state) => {
  const todos = getTodos();
  const newTodos = todos.map((todo) => {
    if (todo.id === id) return { ...todo, checkState: state };
    return todo;
  });
  setTodos(newTodos);
};
/* #endregion */

/* #region Atualiza as informacoes de uma tarefa */
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
/* #endregion */

/* #region Troca uma tarefa de lugar */
export const SwapSortTodo = ({ todo1, todo2 }) => {
  if (!todo2.index) return { error: "Selecione outro card para trocar" };
  if (todo2.index === todo1.index) return;

  const todos = getTodos();
  const swapTodo = todos.map((todo) => {
    if (todo.sort === todo1.index) {
      return { ...todo, sort: todo2.index };
    }
    if (todo.sort === todo2.index) {
      return { ...todo, sort: todo1.index };
    }
    return todo;
  });

  setTodos(swapTodo);
  return { success: "Item Movido" };
};
/* #endregion */
