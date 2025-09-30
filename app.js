require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./src/utils/db");
//const api = require("./src/routes/api");
const web = require("./src/routes/web");
const { verificarConfiguracaoEmail } = require("./src/config/email");

// CORS simples e permissivo
app.use(cors());

app.use(express.json());

//app.use("/api", api);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'Ruminar Leite API está funcionando',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use("/", web);

const PORT = process.env.PORT || 4000;

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);
  
  // Sincroniza banco em background
  sequelize.sync()
    .then(() => {
      console.log("✅ Banco sincronizado");
      
      // Verifica email em background (não bloqueia)
      verificarConfiguracaoEmail()
        .catch(err => console.log("⚠️ Email não configurado:", err.message));
    })
    .catch(err => console.error("❌ Erro no banco:", err));
});