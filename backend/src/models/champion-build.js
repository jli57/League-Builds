const mongoose = require('mongoose');

const ChampionBuildSchema = mongoose.Schema({
    champion: {
        type: String
    },
    items: [
        {
            name: {
                type: String
            }
        }
    ], 
    masteries: [
        {
            name: {
                type: String
            }
        }
    ],
});

const ChampionBuild = modules.export = mongoose.model('ChampionBuild', ChampionBuildSchema);