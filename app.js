require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./src/utils/db");
//const api = require("./src/routes/api");
const web = require("./src/routes/web");
const { verificarConfiguracaoEmail } = require("./src/config/email");

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
    console.log("✅ Modelos sincronizados com o banco de dados");
    // Verificar configuração de e-mail após sincronizar o banco
    return verificarConfiguracaoEmail();
  })
  .then(() => {
    console.log("✅ Sistema de e-mail configurado");
  })
  .catch((error) => {
    console.error("❌ Erro ao inicializar sistema:", error);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("🚀 Servidor web iniciado na porta:", PORT);
});
