const { Livrarias } = require('../models/Livrarias');
const { Dietas } = require('../models/Dietas');
const { Usuario } = require('../models/User');

const bcrypt = require('bcrypt');

async function listarUsuarios() {
    return Usuario.findAll(); 
}

async function criarUsuario(dadosUsuario) {
    const { nome, email, senha } = dadosUsuario;

    if (!senha) {
        throw new Error('Senha é obrigatória');
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
        throw new Error('Usuário com este email já existe');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({ 
        nome,
        email,
        senha: senhaHash,
    });
    console.log(`Usuário ${nome} criado com sucesso`);
    return usuario;
}


async function atualizarUsuario(email, dadosUsuario) {
    const {  nome, senha } = dadosUsuario;

    // Busca o usuário pelo email
    const usuarioExistente = await buscarUsuario(email);
    if (!usuarioExistente) {
        throw new Error('Usuário não existe');
    }

    // Se uma nova senha foi fornecida, criptografa-a
    if (senha) {
        dadosUsuario.senha = await bcrypt.hash(senha, 10);
    }

    // Atualiza o usuário com os novos dados
    await Usuario.update({
      
        nome,
        senha: dadosUsuario.senha,
        
    }, {
        where: { email }
    });

    return buscarUsuario(email); // Retorna o usuário atualizado
}

// Função para excluir um usuário pelo email
async function excluirUsuario(email) {
    const usuarioExistente = await buscarUsuario(email);
    if (!usuarioExistente) {
        throw new Error('Usuário não encontrado');
    }

    // Exclui o usuário pelo email
    await Usuario.destroy({ where: { email } });
    console.log(`Usuário com email ${email} excluído com sucesso`);
}

// Função para buscar um usuário pelo email
async function buscarUsuario(email) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return usuario;
}


// Exporta as funções do repositório de usuários
module.exports = {
    listarUsuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
    buscarUsuario

};
