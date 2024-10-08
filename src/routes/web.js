const express = require("express");
const router = express.Router();
const LivrariaController = require("../controllers/livrariaController");
const livrariaController = LivrariaController();
const DietaController = require("../controllers/dietaController");
const dietaController = DietaController();
const ResumoController = require("../controllers/resumoController");
const resumoController = ResumoController();
const UsuarioController = require("../controllers/usuariosController");
const usuariosController = UsuarioController();
const FinancaController = require("../controllers/financaController");
const financasController = FinancaController();
const CalculoAguaController = require("../controllers/calculoAguaController");
const calculoAguaController = CalculoAguaController();
const authMiddleware = require("../middleware/auth")


router.post('/login', usuariosController.logar);
router.get('/users', usuariosController.visualizarUsuario);
router.post('/cadastro', usuariosController.cadastrar);
router.delete('/cadastro/:email', usuariosController.excluir);

router.use(authMiddleware);

router.post("/livraria", livrariaController.createItem);
router.get("/livraria", livrariaController.findAllItem);
router.get("/livraria/:id", livrariaController.findItemById);
router.put("/livraria/:id", livrariaController.updateItem);
router.delete("/livraria/:id", livrariaController.deleteItem);
router.get("/livraria/user/:usuario_id", livrariaController.findItemsByUserId); 

router.post("/dieta", dietaController.createItem);
router.get("/dieta", dietaController.findAllItem);
router.get("/dieta/:id", dietaController.findItemById);
router.put("/dieta/:id", dietaController.updateItem);
router.delete("/dieta/:id", dietaController.deleteItem);
router.get("/dieta/user/:usuario_id", dietaController.findItemsByUserId)

router.post("/resumo", resumoController.createItem);
router.get("/resumo", resumoController.findAllItem);
router.get("/resumo/:id", resumoController.findItemById);
router.put("/resumo/:id", resumoController.updateItem);
router.delete("/resumo/:id", resumoController.deleteItem);
router.get("/resumo/user/:usuario_id", resumoController.findItemsByUserId)

router.post("/financa", financasController.createItem);
router.get("/financas", financasController.findAllItem);
router.get("/financa/:id", financasController.findItemById);
router.put("/financa/:id", financasController.updateItem);
router.delete("/financa/:id", financasController.deleteItem);
router.get("/financa/user/:usuario_id", financasController.findItemsByUserId)

router.post("/calculoagua", calculoAguaController.createItem);
router.get("/calculoaguas", calculoAguaController.findAllItem);
router.get("/calculoagua/user/:usuario_id", calculoAguaController.findItemsByUserId);
router.get("/calculoagua/:id", calculoAguaController.findItemById);
router.put("/calculoagua/:id", calculoAguaController.updateItem);
router.delete("/calculoagua/:id", calculoAguaController.deleteItem);

module.exports = router;