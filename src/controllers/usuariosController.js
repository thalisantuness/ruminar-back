const { Usuario } = require('../models/User');  
const repoUsuarios = require('../repositories/repoUsuarios');  
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const authConfig = require('../config/auth.json');
const { enviarEmailBoasVindas } = require('../config/emailSendGrid');

function UsuarioController() {
    
  async function visualizarUsuario(req, res) {
    try {
      const usuarios = await repoUsuarios.listarUsuarios();
      if (usuarios.length === 0) {
        return res.status(404).json({ error: 'Nenhum usuário encontrado' });
      }
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      res.status(500).json({ error: 'Erro ao obter usuários' });
    }
  }
  
  async function cadastrar(req, res) {
    const { nome, email, senha } = req.body;
    try {
      // Cria o usuário
      const usuario = await repoUsuarios.criarUsuario({ nome, email, senha });
      
      // Envia e-mail de boas-vindas (não bloqueia o cadastro se falhar)
      enviarEmailBoasVindas(email, nome)
        .then(result => {
          if (result.success) {
            console.log(`✅ E-mail de boas-vindas enviado para ${email}`);
          } else {
            console.error(`⚠️ Falha ao enviar e-mail para ${email}:`, result.error);
          }
        })
        .catch(error => {
          console.error(`⚠️ Erro ao processar envio de e-mail:`, error);
        });
      
      res.json({ 
        message: `Usuário ${nome} cadastrado com sucesso`,
        usuario: {
          id: usuario.usuario_id,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ 
        errorMessage: 'Erro ao cadastrar usuário', 
        error: error.message 
      });
    }
  }
  
  async function excluir(req, res) {
    const { email } = req.params;
    
    try {
      const numRegistrosExcluidos = await repoUsuarios.excluirUsuario(email);
      if (numRegistrosExcluidos === 0) {
        res.status(404).json({ message: `Usuário ${email} não encontrado` });
      } else {
        res.json({ message: `Usuário ${email} excluído com sucesso` });
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ 
        errorMessage: 'Erro ao excluir usuário', 
        error: error.message 
      });
    }
  }
  
  async function logar(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }
      
      const user = await Usuario.findOne({ where: { email: email } });
        
      if (!user) {
        return res.status(401).json({ message: 'Email não encontrado.' });
      }
      
      const isMatch = await bcrypt.compare(senha, user.senha);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }
       
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
      });
            
      res.send({ user, token });
        
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ 
        errorMessage: 'Erro ao autenticar usuário', 
        error: error.message 
      });
    }
  }
  
  return {
    visualizarUsuario,
    cadastrar,
    excluir,
    logar,
  }; 
}

module.exports = UsuarioController;
