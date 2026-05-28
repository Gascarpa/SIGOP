const express = require("express");
const router = express.Router();

const { register, login, profile, adminPanel, getUsers, updateUser, deleteUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rouleMiddleware");

router.post("/register", register); //registra novo Usuario
router.post("/login", login); //Loga com usuario ja registrado
router.get("/profile", authMiddleware, profile); //Mostra usuario logado com token valido
router.get("/admin", authMiddleware, authorize("admin"), adminPanel); //Painel de admin
router.get("/users", authMiddleware, authorize("admin"), getUsers); //Lista todos os usuarios(Apenas para admin)
router.put("/users/:id", authMiddleware, authorize("admin"), updateUser); //Atualiza usuario(Apenas para admin)
router.delete("/users/:id", authMiddleware, authorize("admin"), deleteUser); //Deleta usuario(Apenas para admin)

module.exports = router;