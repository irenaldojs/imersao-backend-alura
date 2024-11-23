// Importa o framework Express para criar a aplicação web.
import express from "express";
// Importa as rotas definidas em postsRoutes.js.
import { routes } from "./src/routes/postsRoutes.js";

// Cria uma instância do Express, que será o núcleo da nossa aplicação.
const app = express();

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto.
app.listen(3000, () => {
  console.log("Servidor rodando: http://localhost:3000");
});

// Chama as rotas definidas em postsRoutes.js.
routes(app);
