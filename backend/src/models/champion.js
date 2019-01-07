const mongoose = require('mongoose');

const ChampionSchema = mongoose.Schema({
	_id: Number,
	name: String,
	title: String,
	image: String,
	tags: {},
	version: [
		{
			id: String,
			passive: {},
			spells: {},
			stats: {},
		}
	]
}, { _id: false });

const Champion = module.exports = mongoose.model('Champion', ChampionSchema);
