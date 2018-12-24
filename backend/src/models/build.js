const mongoose = require('mongoose');

const BuildSchema = mongoose.Schema({
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
	 },
	 user: {
		 type: String
	 }
});

const Build = modules.export = mongoose.model('Build', BuildSchema);

module.exports.createBuild = async (newBuild) => {
	return await newBuild.save();
};

module.exports.saveBuild = async (buildId, newBuild) => {	
	await Build.update({_id: buildId}, newBuild);	
};