const mongoose = require('mongoose');

const ChampionSchema = mongoose.Schema({
	_id: Number,
	name: String,
	title: String,
	image: String,
	tags: {},
	versions: {}
}, { _id: false });

const Champion = module.exports = mongoose.model('Champion', ChampionSchema);

module.exports.createChampion = async (newChampion) => {
	return await newChampion.save();
}