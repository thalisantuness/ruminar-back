const financaRepository = require("../repositories/repoFinancas");

function FinancaController() {
  async function createItem(req, res) { 
    try {
      const novaFinanca = req.body;
      const createdFinanca = await financaRepository.createItem(novaFinanca);
      res.status(201).json(createdFinanca);
    } catch (error) {
      console.error("Erro ao criar financa:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findAllItem(req, res) {
    try {
      const todasFinancas = await financaRepository.findAllItem();
      res.status(200).json(todasFinancas);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemById(req, res) {
    try {
      const { id } = req.params;
      const financa = await financaRepository.findItemById(id);
      if (!financa) {
        return res
          .status(404)
          .json({ success: false, message: "Finança não encontrada" });
      }
      res.status(200).json(financa);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function updateItem(req, res) {
    try {
      const id = req.params.id;
      const novosDados = req.body;
      const financa = await financaRepository.updateItem(id, novosDados);
      res.status(200).json(financa);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemsByUserId(req, res) {
        try{
          const usuario_id = req.params.usuario_id;
          const items = await financaRepository.findItemsByUserId(usuario_id); 
          res.status(200).json(items);
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }  
  }

  async function deleteItem(req, res) {
    try {
      const id = req.params.id;

      const deletedFinanca = await financaRepository.deleteItem(id);
      if (!deletedFinanca) {
        return res
          .status(404)
          .json({ success: false, message: "Finança não encontrada" });
      }
      res.status(200).json({ success: true, deletedFinanca });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  return { createItem, findAllItem, findItemById, findItemsByUserId, updateItem, deleteItem };
}

module.exports = FinancaController;
