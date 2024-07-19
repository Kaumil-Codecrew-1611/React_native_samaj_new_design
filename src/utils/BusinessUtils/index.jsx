// utils/businessUtil.js

// Define the static object with the templates
const templates = {
    1: { template_id: 1, name: "BusinessTemplate1" },
    2: { template_id: 2, name: "BusinessTemplate2" },
    3: { template_id: 3, name: "BusinessTemplate3" }
};

// Method to return all templates as an array of objects
const getAllTemplates = () => {
    return Object.values(templates);
};

// Method to return a template based on the provided ID
const getTemplateById = (template_id) => {
    return templates[template_id] || null;
};

export { getAllTemplates, getTemplateById };
