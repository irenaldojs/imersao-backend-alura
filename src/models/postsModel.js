// Importa a função para conectar ao banco de dados, definida em dbConfig.js.
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável conexao.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Obtém o banco de dados chamado "imersao-instabyte" a partir da conexão estabelecida.
const db = conexao.db("imersao-instabyte");
// Obtém a coleção "posts" dentro do banco de dados.
const colecao = db.collection("posts");

// Importa a função para obter todos os posts, definida em postController.js.
export async function getTodosPosts() {
  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
  return colecao.find().toArray();
}

export async function criarNovoPost(post) {
  // Insere um novo documento (post) na coleção e retorna o resultado da operação.
  return colecao.insertOne(post);
}
