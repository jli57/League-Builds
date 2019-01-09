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

module.exports.createChampion = async (newChampion, version) => {
   return await Champion.findOneAndUpdate({ _id: newChampion._id }
      , {
         $set: {
            _id: newChampion._id,
            name: newChampion.name,
            title: newChampion.title,
            image: newChampion.image,
            tags: newChampion.tags,
            [`versions.${version}`]: newChampion.versions[version]
         }
      }
      , { upsert: true }
   );
};