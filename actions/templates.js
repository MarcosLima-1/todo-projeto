"use client";

export const getAllTemplates = () => {
  const allTemplate = JSON.parse(localStorage.getItem("all-template"));
  return allTemplate;
};

export const addTemplate = (templateName) => {
  const allTemplate = getAllTemplates() || [];
  allTemplate.push(templateName);
  localStorage.setItem("all-template", JSON.stringify(allTemplate));
};

export const deleteTemplate = (id) => {
  localStorage.setItem(currentTemplate, JSON.stringify(todoList));
};

export const getCurrentTemplate = () => {
  const template = localStorage.getItem("current-template");
  return template;
};

export const setCurrentTemplate = (currentTemplate) => {
  localStorage.setItem("current-template", JSON.stringify(currentTemplate));
};
