const {Resumos} = require('../models/Resumos');

async function createItem(novoResumo) {
    try {
        const isNumeric = (value) => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };

        Object.keys(novoResumo).forEach((key) => {
            if (
                key !== "nome_resumo" &&
                key !== "usuario_id" && 
                key !== "alimentos_select" &&
                (novoResumo[key] === null ||
                    novoResumo[key] === undefined || 
                    novoResumo[key] === "" ||
                    !isNumeric(novoResumo[key]))
            ) {
                novoResumo[key] = 0;
            }
        });

        const createdResumo = await Resumos.create(novoResumo);
        return createdResumo;
    } catch (error) {
        console.error("Erro ao criar resumo:", error);
        throw error;
    }
}


async function findAllItem() {
    try {
        const todosResumos = await Resumos.findAll();
        return todosResumos;
    } catch (error) {
        console.error("Erro ao buscar resumos:", error);
        throw error;
    }
}

async function findItemById(id) {
    try {
        const resumo = await Resumos.findByPk(id);
        return resumo;
    } catch (error) {
        console.error("Erro ao buscar resumo pelo id:", error);
        throw error;
    }
}

async function updateItem(id, novosDados) {
    try {
        const resumo = await Resumos.findByPk(id);
        if (!resumo) {
            throw new Error("Resumo não encontrado");
        }


        await resumo.update(novosDados, { fields: Object.keys(novosDados) });
        return resumo;
    } catch (error) {
        console.error("Erro ao atualizar resumo:", error);
        throw error;
    }
}

async function findItemsByUserId(usuario_id) {
    try {
      const items = await Resumos.findAll({ where: { usuario_id } });
      return items;
    } catch (error) {
      console.error("Erro ao buscar itens pelo id do usuário na livraria:", error);
      throw error;
    }
  }

async function deleteItem(id) {
    try {
        const resumo = await Resumos.findByPk(id);
        if (!resumo) {
        throw new Error("Resumo não encontrado");
        }
        await resumo.destroy();
        return resumo;
    } catch (error) {
        console.error("Erro ao deletar resumo:", error);
        throw error;
    }
}

const resumoRepository = {
    createItem,
    findAllItem,
    findItemById,
    updateItem,
    deleteItem,
    findItemsByUserId
}

module.exports = resumoRepository;
