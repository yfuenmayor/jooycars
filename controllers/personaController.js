//Importamos el modelo
const Persona = require('../models/Personas');
//Importamos libreria Dream
const dream = require('dreamjs');

//----------------------------------------------------------------//
//Creamos el metodo para ingresar las personas a la base de datos//
//----------------------------------------------------------------//

exports.crearPersonas = async (req,res) => {

		//Configuramos los tipos de datos
		dream.customType('genero', /(Femenino|Masculino)/);
		dream.customType('edad', (h) => { return h.chance.integer({ min: 15, max: 99 })});
		dream.customType('region', (h) => { return h.chance.string({ length: 2,numeric: true})});

		//Configuramos el schema de datos a generar
		dream.schema('Persona',{
			genero: 'genero',
			edad: 'edad',
			region: 'region'
		});


	try {
		//Consultamos si hay datos cargados
		let cargados = await Persona.find();
		//Validamos si la coleccion tiene datos
		if (cargados && cargados.length > 0) {
			return res.status(400).json({ msg: "La coleccion personas ya tiene datos guardados" })
		}

		//Creamos los datos
		const data =dream.useSchema('Persona').generateRnd(100).output();
		//Insertamos en la base de datos
		await Persona.insertMany(data);
		//Notificamos que los datos se guardaron correctamente
		return res.json({ msg: 'Datos creados correctamente!'});

	} catch (error) {
		//Notificamos que hubo un error en la creacion de los datos
		return res.status(400).send('Hubo un error en la creacion de los datos');
	}
}

//-----------------------------------------------------------------------------------//
// Metodo para el filtro de personas segun lo requerido GET/count?edad=12&grupo=genero
//-----------------------------------------------------------------------------------//

exports.countPersonas = async (req,res) => {

	//Destructuring de los datos enviados por GET
	const { edad, grupo} = req.query;

	//Validamos si la coleccion tiene datos
	if(!edad && !grupo) {
		return res.status(400).json({ msg: "Por favor verificar endpoint : /count?edad=1&grupo=genero" });
	};

	//Ejecutamos las acciones segun los requerimientos
	try{
		//Consultamos en la base de datos
		let personas = await Persona.aggregate([
			{ $match: { edad: parseInt(edad) } },
			{ $group: { _id: `$${grupo}`, suma: { $sum: 1} } }
		]);

		//Creamos la respuesta segun los requerimientos
		const result = personas.reduce((ac,el) =>{
			ac[el['_id']] = { suma: el['suma'] }
			return ac
		},{});

		//Devolvemos resultado
		res.json(result);

	} catch (error){
		return res.status(400).json({ msg: "Hubo un error en la consulta" });
		// res.send(error)
	}

}


//Metodo opcional para vaciar coleccion de datos
exports.dropPersonas = async (req,res) =>{

}