const mongoose = require('mongoose');


//Creamos el Schema para personas
const PersonasSchema = mongoose.Schema({
	genero:{
		type: String,
		require: true,
		trim: true
	},
	edad:{
		type: Number,
		require: true,
		trim: true
	},
	region:{
		type: String,
		require: true,
		trim: true
	}
});

module.exports = mongoose.model('Personas', PersonasSchema);