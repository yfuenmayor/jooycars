require('dotenv').config({ path: 'variables.env'});
const mongoose = require('mongoose');

//Creamos la conexion a la db
const conectarDB = async () => {
	try{
		await mongoose.connect(process.env.DB_MONGO,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('DB Conectada!');
	} catch (error) {
		console.log(error); //mostramos error
		process.exit(1); //detenemos el server
	}
}

module.exports = conectarDB;