const livrariaRepository = require("../repositories/repoLivraria");

function LivrariaController() {


  async function createItem(req, res) {
    try {
      const novoItem = req.body;
      const createdItem = await livrariaRepository.createItem(novoItem);
      res.status(201).json(createdItem);
    } catch (error) {
      console.error("Erro ao criar item na livraria:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findAllItem(req, res) {
    try {
      const todosItens = await livrariaRepository.findAllItem();
      res.status(200).json(todosItens);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemById(req, res) {
    try {
      const id = req.params;
      console.log(id);
      const item = await livrariaRepository.findItemById(id);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item não encontrado" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function updateItem(req, res) {
    try {
      const id = req.params.id;
      const novosDados = req.body;
      const item = await livrariaRepository.updateItem(id, novosDados);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemsByUserId(req, res) {
    try {
      const usuario_id = req.params.usuario_id;
      const items = await livrariaRepository.findItemsByUserId(usuario_id);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function deleteItem(req, res) {
    try {
      const id = req.params.id;

      const deletedItem = await livrariaRepository.deleteItem(id);
      if (!deletedItem) {
        return res
          .status(404)
          .json({ success: false, message: "Item não encontrado" });
      }
      res.status(200).json({ success: true, deletedItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  return { createItem, findAllItem, findItemById,findItemsByUserId, updateItem, deleteItem };
}

module.exports = LivrariaController;
