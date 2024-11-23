import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postController.js";

// Somente se usar o Windows
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Configura o middleware multer para lidar com o upload de arquivos.
// Se tiver no Linux ou Mac, use { dest: "./uploads" }
const upload = multer({ dest: "./uploads", storage });

// Cria uma instância do Express, que será o núcleo da nossa aplicação.
const routes = (app) => {
  // Habilita o middleware para que o Express possa entender requisições com corpo no formato JSON.
  app.use(express.json());

  // Define uma rota GET para obter todos os posts.
  app.get("/posts", listarPosts);

  // Define uma rota POST para criar um novo post.
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para fazer upload de um arquivo.
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export { routes };
