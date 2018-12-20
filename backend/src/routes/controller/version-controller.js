const { DDragonService, VERSION } = require('../services/ddragon-service');
const axios = require('axios');
const HttpError = require('../../errors/HttpError');

const VersionController = function () {
	let versionAPI = async () => {
		let versions = await axios.get(DDragonService.getPath(VERSION));

		if (versions)
			return versions;
		else
			throw new HttpError(404, 'Versions not found');
	}

	let getLatestVersion = async (req, res) => {
		try {
			res.status(200).json({ version: (await versionAPI()).data[0] });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getAllVersions = async (req, res) => {
		try {			
			res.status(200).json({ versions: (await versionAPI()).data });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getVersion = async (req, res) => {
		try {
			res.status(200).json({ version: `${(await versionAPI()).data[req.params.key]}` });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	return {
		getLatestVersion: getLatestVersion,
		getAllVersions: getAllVersions,
		getVersion: getVersion
	};
}();

module.exports = VersionController;