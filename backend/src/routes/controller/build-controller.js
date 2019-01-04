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

				console.log(buildId._id)
				user.builds.push(`${buildId._id}:${buildId._id}`);
				user.save();

				res.status(201).json({});
			} else {
				throw new HttpError(406, 'Cannot create more than 10 builds');
			}
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let findAllBuilds = async (req, res) => {
		try {
			let session = await SessionService.getSession(req.params.session);
			let user = await UserService.getUserById(session.userId);

			if (user) {
				let builds = [];
				for (var i = 0; i < user.builds.length; i++) {
					builds.push(await Build.findById(user.builds[i], { 'user': 0, '__v': 0 }));
				}

				res.status(200).json(builds);
			} else {
				throw new HttpError(404, 'User does not exist');
			}
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let saveBuild = async (req, res) => {
		try {
			console.log('saveBuild');
			let session = await SessionService.getSession(req.params.session);
			let user = await UserService.getUserById(session.userId);
			console.log(user.builds)
			console.log(user.builds["5c2dd6bd37120e41b81870da"])
			var i = 0;
			for (; i < user.builds.length; i++) {
				//console.log(user.builds[i]._id)
				if (user.builds[i]._id == req.params.build)
					break;
			}
			//console.log(i);
			let build = await Build.findByIdAndUpdate(user.builds[i]._id,
				{
					champion: req.body.build.champion,
					items: req.body.build.items,
					runesReforged: req.body.build.runesReforged,
					level: req.body.build.level,
				});

			console.log(build);
			res.status(204).json({});
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	let deleteAll = async (req, res) => {
		try {
			let session = await SessionService.getSession(req.params.session);
			let user = await UserService.getUserById(session.userId);

			await Build.delete({ _id: { $in: user.build } });

			res.status(200).json({});
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	return {
		createNewBuild: createNewBuild,
		findAllBuilds: findAllBuilds,
		saveBuild: saveBuild,
		deleteAll: deleteAll
	};
}();

module.exports = BuildController;