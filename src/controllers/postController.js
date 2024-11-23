import { getTodosPosts } from "../models/postsModel.js";

async function listarPosts(req, res) {
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

export { listarPosts };
