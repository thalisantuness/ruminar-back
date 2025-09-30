const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./src/utils/db");
//const api = require("./src/routes/api");
const web = require("./src/routes/web");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

//app.use("/api", api);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", web);

// Sincronize os modelos com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar modelos com o banco de dados:", error);
  });

const PORT = 4000;

app.listen(PORT, function () {
  console.log("Servidor web iniciado na porta:", PORT);
});