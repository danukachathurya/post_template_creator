import { templates } from "../models/Template.js";

export const getTemplates = (_req, res) => {
  res.json(templates);
};
