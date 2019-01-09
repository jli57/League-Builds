const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
   _id: Number,
   name: String,

   versions: {}

}, { _id: false });

const Item = module.exports = mongoose.model('Item', ItemSchema);

module.exports.createItem = async (newItem, version) => {
   return await Item.findOneAndUpdate({ _id: newItem._id }
      , {
         $set: {
            _id: newItem._id,
            name: newItem.name,
            image: newItem.image,
            [`versions.${version}`]: newItem.versions[version]
         }
      }, { upsert: true });
}