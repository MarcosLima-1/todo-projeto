"use client";
import { v4 as uuidv4 } from "uuid";
import { editTodo } from "./todos";
export const getAllTemplates = () => {
  const allTemplate = JSON.parse(localStorage.getItem("all-template"));
  return allTemplate;
};

export const addTemplate = (values) => {
  const { name } = values;
  const allTemplate = getAllTemplates() || [];

  const exitingTemplate = allTemplate.find((e) => e.name === name);
  if (exitingTemplate) return { error: "Esse Template ja existe" };

  const template = { name: name, id: uuidv4() };
  allTemplate.push(template);
  localStorage.setItem("all-template", JSON.stringify(allTemplate));
  return { success: "Template Criado" };
};

export const deleteTemplate = (values) => {
  const { value, id } = values;
  console.log(value);
  const allTemplates = getAllTemplates();
  const currentTemplate = getCurrentTemplate();

  const erasedList = allTemplates.filter((e) => e.id !== id);
  localStorage.removeItem(value);
  if (currentTemplate === value) selectCurrentTemplate("Home");

  localStorage.setItem("all-template", JSON.stringify(erasedList));
};

export const getCurrentTemplate = () => {
  const template = localStorage.getItem("current-template");
  return template;
};

export const selectCurrentTemplate = (currentTemplate) => {
  localStorage.setItem("current-template", currentTemplate);
};

export const editTemplate = (values) => {
  console.log(values);
  const { oldName, id, name } = values;

  const allTemplates = getAllTemplates();
  const currentTemplate = getCurrentTemplate();

  const exitingTemplate = allTemplates.find((e) => e.name === name);

  if (exitingTemplate) return { error: "Esse Template ja existe" };

  const newTemplate = allTemplates.map((template) => {
    if (template.id === id) {
      return { ...template, name: name };
    }
    return template;
  });

  const oldTemplateData = localStorage.getItem(oldName) || [];

  localStorage.setItem("all-template", JSON.stringify(newTemplate));
  localStorage.setItem(name, oldTemplateData);
  localStorage.removeItem(oldName);
  if (currentTemplate === oldName) {
    selectCurrentTemplate(name);
  }
};
