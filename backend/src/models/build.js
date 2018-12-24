const mongoose = require('mongoose');

const ChampionBuildSchema = mongoose.Schema({
    champion: {
        type: String
    },
    items: [
        {
            id: {
                type: String
            }
        }
    ], 
    runesReforged: [
        {
            id: {
                type: String
            }
        }
	 ],	 
	 level: {
		 type: Number
	 }
});

const ChampionBuild = modules.export = mongoose.model('ChampionBuild', ChampionBuildSchema);