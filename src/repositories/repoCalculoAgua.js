const { CalculoAgua } = require("../models/CalculoAgua");

async function createItem(novoCalculo) {
  try {
    const createdCalculo = await CalculoAgua.create(novoCalculo);
    return createdCalculo;
  } catch (error) {
    console.error("Erro ao criar cálculo de água:", error);
    throw error;
  }
}

async function findAllItem() {
  try {
    const todosCalculos = await CalculoAgua.findAll();
    return todosCalculos;
  } catch (error) {
    console.error("Erro ao buscar cálculos de água:", error);
    throw error;
  }
}

async function findItemById(id) {
  try {
    const calculo = await CalculoAgua.findByPk(id);
    return calculo;
  } catch (error) {
    console.error("Erro ao buscar cálculo de água pelo id:", error);
    throw error;
  }
}

async function findItemsByUserId(usuario_id){
  try {
    const items = await CalculoAgua.findAll({ where: { usuario_id } });
    return items; 
  } catch (error) {
    console.error("Erro ao buscar cálculos de água pelo usuário:", error);
    throw error;
  }
}

async function updateItem(id, novosDados) {
  try {
    const calculo = await CalculoAgua.findByPk(id);
    if (!calculo) {
      throw new Error("Cálculo de água não encontrado");
    }
    await calculo.update(novosDados, { fields: Object.keys(novosDados) });
    return calculo;
  } catch (error) {
    console.error("Erro ao atualizar cálculo de água:", error);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const calculoExcluido = await CalculoAgua.findByPk(id);

    await CalculoAgua.destroy({
      where: { id },
    });

    return calculoExcluido;
  } catch (error) {
    console.error("Erro ao excluir cálculo de água:", error);
    throw error;
  }
}

const calculoAguaRepository = {
  createItem,
  findAllItem,
  findItemById,
  updateItem,
  deleteItem,
  findItemsByUserId,
};

module.exports = calculoAguaRepository;
