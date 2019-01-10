const { DDragonService } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const Resource = require('../../models/resource');

const ResourceController = function () {
   let insertChampions = async (req, res) => {
      if (await DDragonService.insertChampions(req.params.version))
         return res.status(201).json({});
      else
         throw new HttpError(406, 'Error');
   };

   let insertItems = async (req, res) => {
      await Resource.upsertVersion(req.params.version);
      let k = await Resource.findOne({}, { versions: 1 }).lean().sort({versions: 1})

      if (await DDragonService.insertItems(req.params.version))
         return res.status(201).json({});
      else
         throw new HttpError(406, 'Error');
   };

   let upsertVersion = async (req, res) => {

   }

   return {
      insertChampions: insertChampions,
      insertItems: insertItems
   }
}();

module.exports = ResourceController;