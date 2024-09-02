const { Financas } = require("../models/Financas");

async function createItem(novaFinancas) {
  try {
    const isNumeric = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    Object.keys(novaFinancas).forEach((key) => {
      if (
        key !== "nome_da_financa" &&
        key !== "usuario_id" && 
        key !== "alimentos_select" &&
        (novaFinancas[key] === null ||
            novaFinancas[key] === undefined ||
            novaFinancas[key] === "" ||
          !isNumeric(novaFinancas[key]))
      ) {
        novaFinancas[key] = 0;
      }
    });

    const createdFinancas = await Financas.create(novaFinancas);
    return createdFinancas;
  } catch (error) {
    console.error("Erro ao criar finança:", error);
    throw error;
  }
}

async function findAllItem() {
  try {
    const todasFinancas = await Financas.findAll();
    return todasFinancas;
  } catch (error) {
    console.error("Erro ao buscar finanças:", error);
    throw error;
  }
}

async function findItemById(id) {
  try {
    const financa = await Financas.findByPk(id);
    return financa;
  } catch (error) {
    console.error("Erro ao buscar finança pelo id:", error);
    throw error;
  }
}

async function findItemsByUserId(usuario_id){
  try {
const items = await Financas.findAll({where: {usuario_id}})
return items; 
} catch (error){
    console.error("Erro ao buscar finanças pelo usuario:", error);
    throw error;
  }
}

async function updateItem(id, novosDados) {
  try {
    const financa = await Financas.findByPk(id);
    if (!financa) {
      throw new Error("Finança não encontrada");
    }
    await financa.update(novosDados, { fields: Object.keys(novosDados) });
    return financa;
  } catch (error) {
    console.error("Erro ao atualizar finança:", error);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const financaExcluida = await Financas.findByPk(id);

    await Financas.destroy({
      where: { id },
    });

    return financaExcluida;
  } catch (error) {
    console.error("Erro ao excluir finanças:", error);
    throw error;
  }
}

const financaRepository = {
  createItem,
  findAllItem,
  findItemById,
  updateItem,
  deleteItem,
  findItemsByUserId,
};


module.exports = financaRepository;
