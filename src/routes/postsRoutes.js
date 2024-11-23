import multer from "multer";
import express from "express";
import cors from "cors";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};
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
  app.use(express.json());
  app.use(express.static("uploads"));
  app.use(cors(corsOptions));

  // Define uma rota GET para obter todos os posts.
  app.get("/posts", listarPosts);
  // Define uma rota POST para criar um novo post.
  app.post("/posts", postarNovoPost);
  // Define uma rota POST para fazer upload de um arquivo.
  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Define uma rota PUT para atualizar um post.
  app.put("/upload/:id", atualizarNovoPost);
};

export { routes };
