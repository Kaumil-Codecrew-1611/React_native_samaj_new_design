// utils/businessUtil.js

// Define the static object with the templates
const templates = {
    1: { id: 1, name: "BusinessTemplate1" },
    2: { id: 2, name: "BusinessTemplate2" },
    3: { id: 3, name: "BusinessTemplate3" }
};

// Method to return all templates as an array of objects
const getAllTemplates = () => {
    return Object.values(templates);
};

// Method to return a template based on the provided ID
const getTemplateById = (id) => {
    return templates[id] || null;
};

export { getAllTemplates, getTemplateById };
