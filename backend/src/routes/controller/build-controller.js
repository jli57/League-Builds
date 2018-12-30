const Build = require('../../models/build');
const SessionService = require('../services/session-service');
const UserService = require('../services/user-service');
const HttpError = require('../../errors/HttpError');

const BuildController = function () {
	let createNewBuild = async (req, res) => {
		try {
			let session = await SessionService.getSession(req.params.session);
			let user = await UserService.getUserById(session.userId);

			if (user.builds.length < 10) {
				let buildId = await Build.createBuild(new Build({
					champion: req.body.build.champion,
					items: req.body.build.items,
					runesReforged: req.body.build.runesReforged,
					level: req.body.build.level,
					user: session.userId,
				}));

				user.builds.push(buildId);
				user.save();
								
				res.status(201).json({});
			} else {
				throw new HttpError(406, 'Cannot create more than 10 builds');
			}
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};
	return {
		createNewBuild: createNewBuild
	};
}();

module.exports = BuildController;