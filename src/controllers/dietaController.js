const dietaRepository = require("../repositories/repoDieta");

function DietaController() {
  async function createItem(req, res) { 
    try {
      const novaDieta = req.body;
      const createdDieta = await dietaRepository.createItem(novaDieta);
      res.status(201).json(createdDieta);
    } catch (error) {
      console.error("Erro ao criar dieta:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findAllItem(req, res) {
    try {
      const todasDietas = await dietaRepository.findAllItem();
      res.status(200).json(todasDietas);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemById(req, res) {
    try {
      const { id } = req.params;
      const dieta = await dietaRepository.findItemById(id);
      if (!dieta) {
        return res
          .status(404)
          .json({ success: false, message: "Dieta não encontrada" });
      }
      res.status(200).json(dieta);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function updateItem(req, res) {
    try {
      const id = req.params.id;
      const novosDados = req.body;
      const dieta = await dietaRepository.updateItem(id, novosDados);
      res.status(200).json(dieta);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemsByUserId(req, res) {
        try{
          const usuario_id = req.params.usuario_id;
          const items = await dietaRepository.findItemsByUserId(usuario_id); 
          res.status(200).json(items);
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }  
  }

  async function deleteItem(req, res) {
    try {
      const id = req.params.id;

      const deletedDieta = await dietaRepository.deleteItem(id);
      if (!deletedDieta) {
        return res
          .status(404)
          .json({ success: false, message: "Dieta não encontrada" });
      }
      res.status(200).json({ success: true, deletedDieta });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  return { createItem, findAllItem, findItemById, findItemsByUserId, updateItem, deleteItem };
}

module.exports = DietaController;
