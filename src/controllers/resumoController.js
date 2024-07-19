const resumoRepository = require('../repositories/repoResumo');

function ResumoController() {
    async function createItem(req, res) {
        try {
            const novoItem = req.body;
            const createdItem = await resumoRepository.createItem(novoItem);
            res.status(201).json(createdItem);
        } catch (error) {
            console.error("Erro ao criar item na livraria:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async function findAllItem(req, res) {
        try {
            const todosResumos = await resumoRepository.findAllItem();
            res.status(200).json(todosResumos);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async function findItemById(req, res) {
        try {
            const { id } = req.params;
            const resumo = await resumoRepository.findItemById(id);
            if (!resumo) {
                return res
                    .status(404)
                    .json({ success: false, message: "Resumo não encontrado" });
            }
            res.status(200).json(resumo);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async function updateItem(req, res) {
        try {
            const id = req.params.id;
            const novosDados = req.body;
            const resumo = await resumoRepository.updateItem(id, novosDados);
            res.status(200).json(resumo);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async function findItemsByUserId(req, res) {
        try {
          const usuario_id = req.params.usuario_id;
          const items = await resumoRepository.findItemsByUserId(usuario_id);
          res.status(200).json(items);
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      }

    async function deleteItem(req, res) {
        try {
            const id = req.params.id;

            const deletedResumo = await resumoRepository.deleteItem(id);
            if (!deletedResumo) {
                return res
                    .status(404)
                    .json({ success: false, message: "Resumo não encontrado" });
            }
            res.status(200).json({ success: true, deletedResumo });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    return {
        createItem,
        findAllItem,
        findItemById,
        updateItem,
        deleteItem,
        findItemsByUserId
    };
}

module.exports = ResumoController;