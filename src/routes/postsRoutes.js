import express from "express";

import { listarPosts } from "../controllers/postController.js";

const routes = (app) => {
  // Habilita o middleware para que o Express possa entender requisições com corpo no formato JSON.
  app.use(express.json());

  // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto.
  app.get("/posts", listarPosts);
};

export { routes };
