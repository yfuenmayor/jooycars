//Rutas para gestion de personas por genero
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

//Carga de Personas
// /personas
router.get('/',
	personaController.crearPersonas
);

//Consulta GET
// /count?edad=20&&grupo=region
router.get('/count',
	personaController.countPersonas
)

module.exports = router;