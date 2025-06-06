const express = require('express');
const router = express.Router();
const UsuarioController = require('../../src/controller/usuarioController');

// GET 
router.get('/listar', UsuarioController.getAll);

router.post('/criar', UsuarioController.create);

router.post('/usuarios/send-otp', UsuarioController.sendOtp);

router.post('/usuarios/validate-otp', UsuarioController.validateOtp);


module.exports = router;