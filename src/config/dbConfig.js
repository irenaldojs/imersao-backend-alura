import { MongoClient, ServerApiVersion } from "mongodb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default async function conectarAoBanco(string_conexao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(string_conexao, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Conectado ao Cluster do banco de dados");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    return mongoClient;
  } catch (error) {
    console.log("Falha ao conectar ao banco de dados!", error);
    process.exit();
  }
}
