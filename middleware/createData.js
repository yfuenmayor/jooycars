//Importamos libreria Dream
const Dream = require('dreamjs');
const Persona = require('../models/Personas');


//Creamos la conexion a la db
const createData = async () => {
	try {
		//Consultamos si hay datos cargados
		let cargados = await Persona.find();
		//Validamos si la coleccion tiene datos
		if (cargados && cargados.length > 0) {
			console.log("La coleccion personas ya tiene datos guardados" );
			return;
		}

		//Configuramos los tipos de datos
		Dream.customType('genero', /(Femenino|Masculino)/);
		Dream.customType('edad', (h) => { return h.chance.integer({ min: 1, max: 99 })});
		Dream.customType('region', (h) => { return h.chance.string({ length: 2,numeric: true})});

		//Configuramos el schema de datos a generar
		Dream.schema('Persona',{
			genero: 'genero',
			edad: 'edad',
			region: 'region'
		});

		//Creamos los datos
		const data =Dream.useSchema('Persona').generateRnd(100).output();
		// Insertamos en la base de datos
		await Persona.insertMany(data);
		//Notificamos que los datos se guardaron correctamente
		console.log('Datos creados correctamente!');
	} catch (error) {
		console.log(error); //mostramos error
		process.exit(1); //detenemos el server
	}
}

module.exports = createData;