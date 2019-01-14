const HttpError = require('../../errors/HttpError');
const Item = require('../../models/item');
const Champion = require('../../models/champion');
const Resource = require('../../models/resource');

const ResourceService = function () {
   let latestVersion = async (req, res) => {
      return (await Resource.findOne({})).versions[0].replace(/\./g, '_');
   }

   let findLatestModel = async (model) => {
      let latest = await latestVersion();
      let result = await model.find({[`versions.${latest}`]: {$exists: true}}).sort({ name: 1 });

      return {
         latest: latest,
         result: result
      }
   }

   let findLatestModelById = async (id, model) => {
      let latest = await latestVersion();
      let result = await model.findById({ _id: id, [`versions.${latest}`]: { $exists: true } });

      return {
         latest: latest,
         result: result
      }
   }

   return {
      findLatestModelById: findLatestModelById,
      findLatestModel: findLatestModel
   };
}();

module.exports = ResourceService;