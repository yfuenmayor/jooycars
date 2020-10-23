require('dotenv').config({ path: 'variables.env'});
const express = require('express');
const conectarDB = require('./config/db');


// -- Creamos el server
const app = express();

// -- Conectar a la DB
conectarDB();

// -- Habilitamos express.json
app.use( express.json({ extended: true}));

// -- Creamos el puerto que usara la API
const PORT = process.env.PORT || 4000;

// -- Importamos las rutas
//Ruta para insertar los datos en Mongo
app.use('/personas', require('./routes/personas'));
//Ruta count
app.use('/count', require('./routes/personas'));


// -- Iniciamos el server
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})

