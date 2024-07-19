const { Livrarias } = require("../models/Livrarias");

async function createItem(novoItem) {
  try {
    const isNumeric = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    Object.keys(novoItem).forEach((key) => {
      if (
        key !== "nome" &&
        key !== "usuario_id" && 
        (novoItem[key] === null ||
          novoItem[key] === undefined || 
          novoItem[key] === "" ||
          !isNumeric(novoItem[key]))
      ) {
        novoItem[key] = 0;
      }
    });

    const createdItem = await Livrarias.create(novoItem);
    return createdItem;
  } catch (error) {
    console.error("Erro ao criar item na livraria:", error);
    throw error;
  }
}

async function findAllItem() {
  try {
    const allItems = await Livrarias.findAll();
    return allItems;
  } catch (error) {
    console.error("Erro ao buscar itens na livraria:", error);
    throw error;
  }
}

async function findItemById(id) {
  try {
    const item = await Livrarias.findByPk(id);
    return item;
  } catch (error) {
    console.error("Erro ao buscar item pelo id na livraria:", error);
    throw error;
  }
}

async function findItemsByUserId(usuario_id) {
  try {
    const items = await Livrarias.findAll({ where: { usuario_id } });
    return items;
  } catch (error) {
    console.error("Erro ao buscar itens pelo id do usuário na livraria:", error);
    throw error;
  }
}

async function updateItem(id, novosDados) {
  try {
    const item = await Livrarias.findByPk(id);
    if (!item) {
      throw new Error("Item não encontrado");
    }
    await item.update(novosDados, { fields: Object.keys(novosDados) });
    return item;
  } catch (error) {
    console.error("Erro ao atualizar item na livraria:", error);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const itemExcluido = await Livrarias.findByPk(id);

    await Livrarias.destroy({
      where: { id },
    });

    return itemExcluido;
  } catch (error) {
    console.error("Erro ao deletar item na livraria:", error);
    throw error;
  }
}
const livrariaRepository = {
  findAllItem,
  findItemById,
  createItem,
  updateItem,
  deleteItem,
  findItemsByUserId
};

module.exports = livrariaRepository;
