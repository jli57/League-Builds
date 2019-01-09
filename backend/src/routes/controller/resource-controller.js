const { DDragonService } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');

const ResourceController = function () {
   let insertChampions = async (req, res) => {
      if (await DDragonService.insertChampions(req.params.version))
         return res.status(201).json({});
      else
         throw new HttpError(406, 'Error');
   };

   let insertItems = async (req, res) => {
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