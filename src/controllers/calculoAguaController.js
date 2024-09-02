const calculoAguaRepository = require("../repositories/repoCalculoAgua");

function CalculoAguaController() {
  async function createItem(req, res) {
    try {
      const novoCalculo = req.body;
      const createdCalculo = await calculoAguaRepository.createItem(novoCalculo);
      res.status(201).json(createdCalculo);
    } catch (error) {
      console.error("Erro ao criar cálculo de água:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findAllItem(req, res) {
    try {
      const todosCalculos = await calculoAguaRepository.findAllItem();
      res.status(200).json(todosCalculos);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemById(req, res) {
    try {
      const { id } = req.params;
      const calculo = await calculoAguaRepository.findItemById(id);
      if (!calculo) {
        return res
          .status(404)
          .json({ success: false, message: "Cálculo de água não encontrado" });
      }
      res.status(200).json(calculo);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function findItemsByUserId(req, res) {
    try {
      const usuario_id = req.params.usuario_id;
      const items = await calculoAguaRepository.findItemsByUserId(usuario_id);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function updateItem(req, res) {
    try {
      const id = req.params.id;
      const novosDados = req.body;
      const calculo = await calculoAguaRepository.updateItem(id, novosDados);
      res.status(200).json(calculo);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async function deleteItem(req, res) {
    try {
      const id = req.params.id;

      const deletedCalculo = await calculoAguaRepository.deleteItem(id);
      if (!deletedCalculo) {
        return res
          .status(404)
          .json({ success: false, message: "Cálculo de água não encontrado" });
      }
      res.status(200).json({ success: true, deletedCalculo });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  return { createItem, findAllItem, findItemById, findItemsByUserId, updateItem, deleteItem };
}

module.exports = CalculoAguaController;
