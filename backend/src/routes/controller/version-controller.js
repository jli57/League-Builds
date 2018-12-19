const { DDragonService, VERSION } = require('../services/ddragon-service');
const axios = require('axios');
const HttpError = require('../../errors/HttpError');

const VersionController = function () {
	let versionAPI = async () => {
		return await axios.get(DDragonService.getPath(VERSION));
	}

	let getLatestVersion = async (req, res) => {
		try {
			let version = await versionAPI();

			if (version)
				res.status(200).json({ version: version.data[0] });
			else
				throw new HttpError(404, 'Version error');
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getAllVersions = async (req, res) => {
		try {
			return await versionApi().data;
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getVersion = async (req, res) => {
		try {
			let versions = await versionAPI();
			if (versions)
				res.status(200).json({ version: `${versions[req.params.key]}`});
			else
				throw new HttpError(404, 'Version error');
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