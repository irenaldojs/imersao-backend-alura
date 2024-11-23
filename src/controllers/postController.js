import fs from "fs";
import {
  getTodosPosts,
  criarNovoPost,
  atualizaPost,
} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
  try {
    // Chama a função getTodosPosts para obter todos os posts.
    const posts = await getTodosPosts();

    // Verifica se a variável 'posts' é válida e é um array.
    if (!posts || !Array.isArray(posts)) {
      throw new Error("Erro ao obter posts");
    }

    // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
    res.status(200).json(posts);
  } catch (error) {
    // Lida com exceções e envia uma resposta HTTP com status 500 (Erro do Servidor Interno).
    res.status(500).json({ error: error.message });
  }
}

export async function postarNovoPost(req, res) {
  // Obtem o corpo da requisição (req.body) e armazena-o na variável 'novoPost'.
  const novoPost = req.body;

  try {
    // Chama a função 'criarNovoPost' para criar um novo post com base no corpo da requisição.
    const postCriado = await criarNovoPost(novoPost);

    // Envia uma resposta HTTP com status 201 (Criado) e o novo post criado no formato JSON.
    res.status(201).json(postCriado);
  } catch (error) {
    // Lida com exceções e envia uma resposta HTTP com status 500 (Erro do Servidor Interno).
    console.error(error);
    // Envia uma resposta HTTP com status 500 (Erro do Servidor Interno) e uma mensagem de erro.
    res
      .status(500)
      .json({ error: "Falha na criação do post", message: "error.message" });
  }
}

export async function uploadImagem(req, res) {
  // Cria um novo post com as informações fornecidas na requisição.
  const novoPost = {
    descricao: "",
    // Armazena o nome do arquivo de imagem no campo 'imgUrl'.
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    // Chama a função 'criarNovoPost' para criar um novo post com base no corpo da requisição.
    const postCriado = await criarNovoPost(novoPost);
    // Renomeia o arquivo de imagem para incluir o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo de imagem para incluir o ID do post criado.
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o novo post criado no formato JSON.
    res.status(200).json(postCriado);
  } catch (erro) {
    // Lida com exceções e envia uma resposta HTTP com status 500 (Erro do Servidor Interno).
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (Erro do Servidor Interno) e uma mensagem de erro.
    res
      .status(500)
      .json({ Erro: "Falha na requisição", message: erro.message });
  }
}

export async function atualizarNovoPost(req, res) {
  // Obtem o corpo da requisição (req.body) e armazena-o na variável 'novoPost'.
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };
    // Chama a função 'criarNovoPost' para criar um novo post com base no corpo da requisição.
    const postAtualizado = await atualizaPost(id, post);

    // Envia uma resposta HTTP com status 201 (Criado) e o novo post criado no formato JSON.
    res.status(200).json(postAtualizado);
  } catch (error) {
    // Lida com exceções e envia uma resposta HTTP com status 500 (Erro do Servidor Interno).
    console.error(error);
    // Envia uma resposta HTTP com status 500 (Erro do Servidor Interno) e uma mensagem de erro.
    res
      .status(500)
      .json({ error: "Falha na criação do post", message: "error.message" });
  }
}
