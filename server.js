import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/300",
  },
  {
    id: 2,
    descricao: "Gato preguiçoso tomando sol",
    imagem: "https://placecats.com/millie/300/300",
  },
  {
    id: 3,
    descricao: "Gatinho curioso explorando a caixa",
    imagem: "https://placecats.com/millie/300/300",
  },
  {
    id: 4,
    descricao: "Dois gatos brincando de bola",
    imagem: "https://placecats.com/millie/300/300",
  },
  {
    id: 5,
    descricao: "Gata ronronando no colo",
    imagem: "https://placecats.com/millie/300/300",
  },
  {
    id: 6,
    descricao: "Gato comendo ração",
    imagem: "https://placecats.com/millie/300/300",
  },
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => post.id.toString() === id);
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
});
