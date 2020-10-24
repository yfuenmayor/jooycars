//Importamos el modelo
const Persona = require('../models/Personas');
//Importamos middleware para crear la data desde la libreria Dream
const createData = require('../middleware/createData');

//----------------------------------------------------------------//
//Creamos el metodo para ingresar las personas a la base de datos//
//----------------------------------------------------------------//

exports.crearPersonas = async (req,res) => {
	try {
		//Consultamos si hay datos cargados
		let cargados = await Persona.find();
		//Validamos si la coleccion tiene datos
		if (cargados && cargados.length > 0) {
			return res.status(400).json({ msg: "La coleccion personas ya tiene datos guardados" })
		}

		//Creamos los datos
		const data = createData()
		// Insertamos en la base de datos
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
	if(!edad || !grupo) {
		return res.status(400).json({ msg: "Por favor verificar endpoint : /count?edad=1&grupo=genero" });
	};

	//Validamos que el grupo sea un objeto valido
	if(grupo.toLowerCase().trim() === 'genero' || grupo.toLowerCase().trim() === 'region') {

	//Ejecutamos las acciones segun los requerimientos
	try{
		//Consultamos en la base de datos
		let personas = await Persona.aggregate([
			{ $match: { edad: parseInt(edad) } },
			{ $group: { _id: `$${grupo}`, suma: { $sum: 1} } }
		]);

		//Validamos que la coleccion tenga datos guardados
		if (personas && personas.length === 0) {
			return res.json({ msg: "No hay resultados para mostrar" })
		}

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

	} else {
		return res.status(400).json({ msg: "Por favor ingrese una opcion valida: genero, region." });
	}

}

