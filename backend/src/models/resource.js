const mongoose = require('mongoose');
const HttpError = require('../errors/HttpError');

const ResourceSchema = mongoose.Schema({
   versions: [String],
});

const Resource = module.exports = mongoose.model('Resource', ResourceSchema);

module.exports.upsertVersion = async (version) => {
   if ((await Resource.find({ versions: { $in: [version] } })).length == 0)
      await Resource.findOneAndUpdate({},
         {
            $push: {
               versions: {
                  $each: [version],
                  $sort: { version: -1 }
               }
            }
         }, { upsert: true });
};
