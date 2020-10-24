//Importamos libreria Dream
const Dream = require('dreamjs');

//Creamos la conexion a la db
const createData = () => {

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

	return data;
}

module.exports = createData;