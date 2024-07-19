const { Dietas } = require("../models/Dietas");

async function createItem(novaDieta) {
  try {
    const isNumeric = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    Object.keys(novaDieta).forEach((key) => {
      if (
        key !== "nome_da_dieta" &&
        key !== "usuario_id" && 
        key !== "alimentos_select" &&
        (novaDieta[key] === null ||
          novaDieta[key] === undefined ||
          novaDieta[key] === "" ||
          !isNumeric(novaDieta[key]))
      ) {
        novaDieta[key] = 0;
      }
    });

    const createdDieta = await Dietas.create(novaDieta);
    return createdDieta;
  } catch (error) {
    console.error("Erro ao criar dieta:", error);
    throw error;
  }
}

async function findAllItem() {
  try {
    const todasDietas = await Dietas.findAll();
    return todasDietas;
  } catch (error) {
    console.error("Erro ao buscar dietas:", error);
    throw error;
  }
}

async function findItemById(id) {
  try {
    const dieta = await Dietas.findByPk(id);
    return dieta;
  } catch (error) {
    console.error("Erro ao buscar dieta pelo id:", error);
    throw error;
  }
}

async function findItemsByUserId(usuario_id){
  try {
const items = await Dietas.findAll({where: {usuario_id}})
return items; 
} catch (error){
    console.error("Erro ao buscar dietas pelo usuario:", error);
    throw error;
  }
}

async function updateItem(id, novosDados) {
  try {
    const dieta = await Dietas.findByPk(id);
    if (!dieta) {
      throw new Error("Dieta não encontrada");
    }
    await dieta.update(novosDados, { fields: Object.keys(novosDados) });
    return dieta;
  } catch (error) {
    console.error("Erro ao atualizar dieta:", error);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const dietaExcluida = await Dietas.findByPk(id);

    await Dietas.destroy({
      where: { id },
    });

    return dietaExcluida;
  } catch (error) {
    console.error("Erro ao excluir dieta:", error);
    throw error;
  }
}

const dietaRepository = {
  createItem,
  findAllItem,
  findItemById,
  updateItem,
  deleteItem,
  findItemsByUserId,
};


module.exports = dietaRepository;
