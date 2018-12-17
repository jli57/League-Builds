/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./backend/src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./backend/src/errors/HttpError.js":
/*!*****************************************!*\
  !*** ./backend/src/errors/HttpError.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class HttpError extends Error {
    constructor(statusCode, ...params) {
        super(...params);
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.statusCode = statusCode;
    }    
}

module.exports = HttpError;

/***/ }),

/***/ "./backend/src/models/session.js":
/*!***************************************!*\
  !*** ./backend/src/models/session.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const SessionSchema = mongoose.Schema({
    userId : {
        type: String,
        index: true
    },
});

const Session = module.exports = mongoose.model('Session', SessionSchema);

module.exports.create = async (id) => {
    const session = new Session({userId: id});
    return await session.save();
}

/***/ }),

/***/ "./backend/src/models/user.js":
/*!************************************!*\
  !*** ./backend/src/models/user.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = async (newUser) => {
    newUser.password = await User.generatePassword(newUser.password);
    return await newUser.save();
};

module.exports.generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports.getUserByProperty = async (property) => {
    return await User.findOne(property);
};

module.exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

/***/ }),

/***/ "./backend/src/routes/api/champion-routes.js":
/*!***************************************************!*\
  !*** ./backend/src/routes/api/champion-routes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const router = express.Router();
const ChampionController = __webpack_require__(/*! ../controller/champion-controller */ "./backend/src/routes/controller/champion-controller.js");

router.get('/all', (req, res) => {
	ChampionController.getAllChampions(req, res);
});

router.get('/:noun', (req, res) => {
	if (isNaN(req.params.noun))
		ChampionController.getChampionByName(req, res);
	else
		ChampionController.getChampionById(req, res);
});

router.get('/:noun/image', (req, res) => {
	if (isNaN(req.params.noun))
		ChampionController.getChampionImageByName(req, res);
	else
		ChampionController.getChampionImageById(req, res);
})

module.exports = router;


/***/ }),

/***/ "./backend/src/routes/api/item-routes.js":
/*!***********************************************!*\
  !*** ./backend/src/routes/api/item-routes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const router = express.Router();
const ItemController = __webpack_require__(/*! ../controller/item-controller */ "./backend/src/routes/controller/item-controller.js");

router.get('/all', (req, res) => {
	ItemController.getAllItems(req, res);
});

router.get('/:id', (req, res) => {
	ItemController.getItemById(req, res);
})

router.get('/:id/image', (req, res) => {
	ItemController.getItemImageById(req, res);
});

module.exports = router;

/***/ }),

/***/ "./backend/src/routes/api/runes-reforged-routes.js":
/*!*********************************************************!*\
  !*** ./backend/src/routes/api/runes-reforged-routes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const router = express.Router();
const RunesReforgedController = __webpack_require__(/*! ../controller/runes-reforged-controller */ "./backend/src/routes/controller/runes-reforged-controller.js");

router.get('/:id', (req, res) => {
	RunesReforgedController.getRunesReforgedById(req, res);
});

router.get('/:id/image', (req, res) => {
	RunesReforgedController.getRunesReforgedImageById(req, res);
});

module.exports = router;

/***/ }),

/***/ "./backend/src/routes/api/user-routes.js":
/*!***********************************************!*\
  !*** ./backend/src/routes/api/user-routes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const router = express.Router();
const UserController = __webpack_require__(/*! ../controller/user-controller */ "./backend/src/routes/controller/user-controller.js");

router.post('/register', (req, res) => {
    UserController.register(req, res);
});

// retrieve user
router.get('/session/:id', (req, res) => {
    UserController.retrieveUser(req, res);
});

// update user
router.post("/update/:id", (req, res) => {
    UserController.update(req, res);
});

// delete user
router.delete('/delete/:id', (req, res) => {    
    UserController.deleteAccount(req, res);
});

// confirm password
router.post("/validate", (req, res) => {
    UserController.validate(req, res);
});

router.post('/login', (req, res) => {
    UserController.login(req, res);
});
        

router.delete('/logout/:id', (req, res) => {
    UserController.logout(req, res);
});

module.exports = router;

/***/ }),

/***/ "./backend/src/routes/controller/champion-controller.js":
/*!**************************************************************!*\
  !*** ./backend/src/routes/controller/champion-controller.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE } = __webpack_require__(/*! ../services/ddragon-service */ "./backend/src/routes/services/ddragon-service.js");
const HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./backend/src/errors/HttpError.js");
const axios = __webpack_require__(/*! axios */ "axios");

const ChampionController = function () {
	let exists = (obj, res) => {		
		if (obj)
			res.status(200).json(obj);
		else
			throw new HttpError(404, 'Champion does not exist');
	};

	let championAPI = async (req, res) => {
		try {
			let champions = await axios.get(`${DDragonService.getPath(CHAMPION_DATA)}`);

			return champions.data.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let championIdAPI = async (req, res) => {
		let champions = await championAPI(req, res);

		for (var champion in champions)
			if (champions[champion].key === req.params.noun)
				return champions[champion];

		throw new HttpError(404, 'Champion does not exist');
	}

	let championNameAPI = async (req, res) => {
		let champions = await championAPI(req, res);

		return champions[req.params.noun];
	}

	let getAllChampions = async (req, res) => {
		try {
			res.status(200).json(await championAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionById = async (req, res) => {
		try {			
			return exists(await championIdAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionByName = async (req, res) => {
		try {
			return exists(await championNameAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImage = (champion) => {
		return `${DDragonService.getPath(CHAMPION_IMAGE)}/${champion.image.full}`;
	}

	let getChampionImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getChampionImage(await championIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getChampionImage(await championNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllChampions: getAllChampions,
		getChampionById: getChampionById,
		getChampionByName: getChampionByName,
		getChampionImageById: getChampionImageById,
		getChampionImageByName: getChampionImageByName
	}
}();

module.exports = ChampionController;

/***/ }),

/***/ "./backend/src/routes/controller/item-controller.js":
/*!**********************************************************!*\
  !*** ./backend/src/routes/controller/item-controller.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { DDragonService, ITEM_DATA, ITEM_IMAGE } = __webpack_require__(/*! ../services/ddragon-service */ "./backend/src/routes/services/ddragon-service.js");
const HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./backend/src/errors/HttpError.js");
const axios = __webpack_require__(/*! axios */ "axios");

const ItemController = function () {
	let exists = (obj, res) => {		
		if (obj)
			res.status(200).json(obj);
		else
			throw new HttpError(404, 'Item does not exist');
	};

	let itemAPI = async (req, res) => {
		try {
			let items = await axios.get(`${DDragonService.getPath(ITEM_DATA)}`);

			return items.data.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let itemIdAPI = async (req, res) => {
		let items = await itemAPI(req, res);		
		return items[req.params.id];
	}

	let itemNameAPI = async (req, res) => {
		return exists(await itemAPI(req, res));
	}

	let getAllItems = async (req, res) => {
		try {
			res.status(200).json(await itemAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemById = async (req, res) => {
		try {
			return exists(await itemIdAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemByName = async (req, res) => {
		try {
			return exists(await itemNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemImage = (item) => {
		return `${DDragonService.getPath(ITEM_IMAGE)}/${item.image.full}`;
	}

	let getItemImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getItemImage(await itemIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getItemImage(await itemNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllItems: getAllItems,
		getItemById: getItemById,
		getItemByName: getItemByName,
		getItemImageById: getItemImageById,
		getItemImageByName: getItemImageByName
	}
}();

module.exports = ItemController;

/***/ }),

/***/ "./backend/src/routes/controller/runes-reforged-controller.js":
/*!********************************************************************!*\
  !*** ./backend/src/routes/controller/runes-reforged-controller.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { DDragonService, RUNESREFORGED_DATA, RUNESREFORGED_IMAGE } = __webpack_require__(/*! ../services/ddragon-service */ "./backend/src/routes/services/ddragon-service.js");
const HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./backend/src/errors/HttpError.js");
const axios = __webpack_require__(/*! axios */ "axios");

const RunesReforgedController = function () {
	let exists = (obj, res) => {
		if (obj)
			res.status(200).json(obj);
		else
			throw new HttpError(404, 'RunesReforged does not exist');
	};

	let runesAPI = async (req, res) => {
		try {
			let runes = await axios.get(`${DDragonService.getPath(RUNESREFORGED_DATA)}`);

			return runes.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let runesIdAPI = async (req, res) => {
		let runes = await runesAPI(req, res);
		for (var tree in runes) {
			if (runes[tree].id == req.params.id) {
				return runes[tree];
			} else {
				for (var slot in runes[tree]['slots']) {
					for (var rune in runes[tree]['slots'][slot]['runes']) {
						if (runes[tree]['slots'][slot]['runes'][rune].id == req.params.id) {
							return runes[tree]['slots'][slot]['runes'][rune];
						}
					}
				}
			}
		}

		throw new HttpError(404, 'RunesReforged does not exist');
	}

	let runesNameAPI = async (req, res) => {
		return exists(await runesAPI(req, res));
	}

	let getAllRunesReforgeds = async (req, res) => {
		try {
			res.status(200).json(await runesAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedById = async (req, res) => {
		try {
			return exists(await runesIdAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedByName = async (req, res) => {
		try {
			return exists(await runesNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedImage = (runes) => {
		return `${DDragonService.getPath(RUNESREFORGED_IMAGE)}/${runes.image.full}`;
	}

	let getRunesReforgedImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getRunesReforgedImage(await runesIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getRunesReforgedImage(await runesNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllRunesReforgeds: getAllRunesReforgeds,
		getRunesReforgedById: getRunesReforgedById,
		getRunesReforgedByName: getRunesReforgedByName,
		getRunesReforgedImageById: getRunesReforgedImageById,
		getRunesReforgedImageByName: getRunesReforgedImageByName
	}
}();

module.exports = RunesReforgedController;

/***/ }),

/***/ "./backend/src/routes/controller/user-controller.js":
/*!**********************************************************!*\
  !*** ./backend/src/routes/controller/user-controller.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const UserService = __webpack_require__(/*! ../services/user-service */ "./backend/src/routes/services/user-service.js");
const SessionService = __webpack_require__(/*! ../services/session-service */ "./backend/src/routes/services/session-service.js");
const MessageService = __webpack_require__(/*! ../services/messages-service */ "./backend/src/routes/services/messages-service.js");
const HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./backend/src/errors/HttpError.js");

const UserController = function () {
    let register = async (req, res) => {
        try {
            let errors = [];
            if (await UserService.getUserByEmail(req.body.form.email))
                errors.push({
                    param: 'email',
                    msg: MessageService.EMAIL_406
                });
            if (await UserService.getUserByUsername(req.body.form.username))
                errors.push({
                    param: 'username',
                    msg: MessageService.USERNAME_406
                });
            if (errors.length > 0)
                throw new HttpError(406, errors);

            const user = await UserService.registerUser(req.body.form);
            const session = await SessionService.createSession(user._id);

            res.status(201).json({ session: session._id });
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    };

    let retrieveUser = async (req, res) => {
        try {
            const session = await SessionService.getSession(req.params.id);
            if (!session)
                throw new HttpError(404, MessageService.SESSION_404);

            let user = await UserService.getUserById(session.userId);
            if (!user)
                throw new HttpError(404, MessageService.USER_404);

            res.status(200).json({ user: UserService.removePrivate(user) });
        }
        catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    };

    let login = async (req, res) => {
        try {
            const user = await validateUser(req);
            const session = await SessionService.createSession(user._id);
            res.status(201).json({ session: session._id });
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    }

    let logout = async (req, res) => {
        try {
            if (!(await SessionService.deleteSession(req.params.id)))
                throw new HttpError(404, MessageService.SESSION_404);

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    }

    let deleteAccount = async (req, res) => {
        try {
            const user = await validateUser(req);
            if (!(await SessionService.deleteSession(req.params.id)))
                throw new HttpError(404, MessageService.SESSION_404);
            if (!(await UserService.deleteUser(user._id)))
                throw new HttpError(404, MessageService.USER_404);

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    }

    let update = async (req, res) => {
        try {
            const user = await validateUser(req);
            const updatedUser = await UserService.updateUser(user, req.body.form);

            res.status(200).json({ user: UserService.removePrivate(updatedUser) });
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    };

    let validate = async (req, res) => {
        try {
            await validateUser(req);
            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    };

    let validateUser = async (req) => {
        const user = await UserService.getUserByUsername(req.body.form.username);
        if (!(user && (await UserService.validatePassword(user, req.body.form.password))))
            throw new HttpError(401, MessageService.LOGIN_401);
        return user;
    };

    return {
        register: register,
        login: login,
        logout: logout,
        retrieveUser: retrieveUser,
        deleteAccount: deleteAccount,
        update: update,
        validate: validate,
    }
}();

module.exports = UserController;

/***/ }),

/***/ "./backend/src/routes/services/ddragon-service.js":
/*!********************************************************!*\
  !*** ./backend/src/routes/services/ddragon-service.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { baseURL, championImage, championPath, itemPath, itemImagePath, championImagePath, runesReforgedImagePath, runesReforgedPath} = __webpack_require__(/*! ../../../../config/ddragon */ "./config/ddragon.js");

const CHAMPION_DATA = 'CHAMPION_DATA';
const CHAMPION_IMAGE = 'CHAMPION_IMAGE';
const ITEM_DATA = 'ITEM_DATA';
const ITEM_IMAGE = 'ITEM_IMAGE';
const RUNESREFORGED_DATA = 'RUNESREFORGED_DATA';
const RUNESREFORGED_IMAGE = 'RUNESREFORGED_IMAGE';

const DDragonService = function () {
	let getPath = token => {
		switch (token) {
			case 'CHAMPION_DATA': return baseURL + championPath
			case 'CHAMPION_IMAGE': return baseURL + championImagePath
			case 'ITEM_DATA': return baseURL + itemPath
			case 'ITEM_IMAGE': return baseURL + itemImagePath
			case 'RUNESREFORGED_DATA': return baseURL + runesReforgedPath
			case 'RUNESREFORGED_IMAGE': return baseURL + runesReforgedImagePath
			default: return 'false'; // should add throw something
		}
	};

	return {
		getPath: getPath
	}
}();

module.exports = { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE, ITEM_DATA, ITEM_IMAGE, RUNESREFORGED_DATA, RUNESREFORGED_IMAGE };

/***/ }),

/***/ "./backend/src/routes/services/messages-service.js":
/*!*********************************************************!*\
  !*** ./backend/src/routes/services/messages-service.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const MessageService = function() {
    return {
        EMAIL_406: 'Email is already in use',
        USERNAME_406: 'Username is already in use',
        SESSION_404: 'You are not logged in',
        USER_404: 'This user does not exist',
        LOGIN_401: 'Invalid username/password'
    };
}();

module.exports = MessageService;

/***/ }),

/***/ "./backend/src/routes/services/session-service.js":
/*!********************************************************!*\
  !*** ./backend/src/routes/services/session-service.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Session = __webpack_require__(/*! ../../models/session */ "./backend/src/models/session.js");

const SessionService = function () {
    const getSession = async (id) => {
        return await Session.findById(id);
    };

    const deleteSession = async (session_id) => {
        return await Session.findByIdAndDelete(session_id);
    }

    const createSession = async (userId) => {
        return await Session.create(userId);
    }

    return {
        getSession: getSession,
        deleteSession: deleteSession,
        createSession: createSession
    }
}();

module.exports = SessionService;

/***/ }),

/***/ "./backend/src/routes/services/user-service.js":
/*!*****************************************************!*\
  !*** ./backend/src/routes/services/user-service.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const User = __webpack_require__(/*! ../../models/user */ "./backend/src/models/user.js");

const UserService = function () {
    let getUserByUsername = async (username) => {
        return await User.getUserByProperty({ username: username });
    }

    let getUserByEmail = async (email) => {
        return await User.getUserByProperty({ email: email });
    }

    let registerUser = async (form) => {        
        return await User.createUser(new User({
            username: form.username,
            password: form.password,
            email: form.email,
            name: form.name
        }));
    }

    let validatePassword = async (user, password) => {
        return await User.comparePassword(password, user.password);
    }

    let updateUser = async (user, form) => {
        if (form.newUsername)
            user.username = form.newUsername;
        if (form.newPassword)
            user.password = await User.generatePassword(form.newPassword);
        if (form.newEmail)
            user.email = form.newEmail;
        if (form.newName)
            user.name = form.newName;

        return await User.findOneAndUpdate({ _id: user._id }, user, { new: true })
    };

    let removePrivate = (user) => {
        return {
            username: user.username,
            email: user.email,
            name: user.name,
        };
    }

    let getUserById = async (id) => {
        return await User.findById(id);
    }

    let deleteUser = async (user_id) => {
        return await User.findByIdAndDelete(user_id);
    };

    return {
        getUserById: getUserById,
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        registerUser: registerUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        removePrivate: removePrivate,
        validatePassword: validatePassword,
    }
}();

module.exports = UserService;

/***/ }),

/***/ "./backend/src/server.js":
/*!*******************************!*\
  !*** ./backend/src/server.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const express = __webpack_require__(/*! express */ "express");
const path = __webpack_require__(/*! path */ "path");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const expressValidator = __webpack_require__(/*! express-validator */ "express-validator");
const session = __webpack_require__(/*! express-session */ "express-session");
const passport = __webpack_require__(/*! passport */ "passport");
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const db = __webpack_require__(/*! ../../config/keys */ "./config/keys.js").mongoURI;
const webpack = __webpack_require__(/*! webpack */ "webpack");
const webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");
const webpackConfig = __webpack_require__(/*! ../../webpack.config.dev.js */ "./webpack.config.dev.js");
const webpackCompiler = webpack(webpackConfig);

// connect to mongo using mongoose
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

const userRoutes = __webpack_require__(/*! ./routes/api/user-routes */ "./backend/src/routes/api/user-routes.js");
const championRoutes = __webpack_require__(/*! ./routes/api/champion-routes */ "./backend/src/routes/api/champion-routes.js");
const itemRoutes = __webpack_require__(/*! ./routes/api/item-routes */ "./backend/src/routes/api/item-routes.js");
const runesReforgedRoutes = __webpack_require__(/*! ./routes/api/runes-reforged-routes */ "./backend/src/routes/api/runes-reforged-routes.js");

// declare express
const app = express();

// use webpack-dev-middleware if in development mode
// if(process.env.NODE_ENV.trim() === 'development'){
// 	console.log('running in development mode...');
// 	app.use(webpackDevMiddleware(webpackCompiler, {
// 		//publicPath: webpackConfig.output.publicPath
// 		publicPath: '/'
// 	}));
// }else{
// 	console.log('running in production mode...');
// }

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}))

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express validator, taken from github
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.'),
            root = namespace.shift(0),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// render the main page
// app.get('/', (req, res) => {
// 	res.sendFile('dist/index.html', {root: __dirname});
// });

// routes 
app.use('/user', userRoutes);
app.use('/ddragon/champions', championRoutes);
app.use('/ddragon/items', itemRoutes);
app.use('/ddragon/runesreforged', runesReforgedRoutes);

// set up port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
})
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./config/ddragon.js":
/*!***************************!*\
  !*** ./config/ddragon.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	champions: 'http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json',
	items: 'http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/item.json',
	runes: 'http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/runesReforged.json',
	versions: 'https://ddragon.leagueoflegends.com/api/versions.json',
	baseURL: 'http://ddragon.leagueoflegends.com/cdn/8.24.1',
	championImage: 'http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion',
	championImagePath: '/img/champion',
	championPath: '/data/en_US/champion.json',
	itemPath: '/data/en_US/item.json',
	itemImagePath: '/img/item',
	runesReforgedPath: '/data/en_US/runesReforged.json',
	runesReforgedImagePath: '/img/runesReforged'
}

/***/ }),

/***/ "./config/keys.js":
/*!************************!*\
  !*** ./config/keys.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {    
    mongoURI:'mongodb://lljruffin:password1@ds050077.mlab.com:50077/league_builds',
}

/***/ }),

/***/ "./webpack.config.dev.js":
/*!*******************************!*\
  !*** ./webpack.config.dev.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");
const HtmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ "html-webpack-plugin");
const CleanWebpackPlugin = __webpack_require__(/*! clean-webpack-plugin */ "clean-webpack-plugin");
const webpack = __webpack_require__(/*! webpack */ "webpack");
const cssnext = __webpack_require__(/*! postcss-cssnext */ "postcss-cssnext");
const postcssFocus = __webpack_require__(/*! postcss-focus */ "postcss-focus");
const postcssReporter = __webpack_require__(/*! postcss-reporter */ "postcss-reporter");



const clientConfig = {
	target: 'web', // can be ommitted since web is default, but keeping as reference
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'client.bundle.jsx',
	},
	devtool: 'inline-source-map',
	entry: {
		app: './frontend/src/index.jsx',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'./frontend',
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/react',
							'@babel/env'
						],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		]
	},

	plugins: [
		// new CleanWebpackPlugin(['dist'], {
		// 	exclude: ['index.html']
		// }),
		new HtmlWebpackPlugin({
			title: 'test',
			template: './dist/index.html',
		}),
	]
};


const serverConfig = {
	target: 'node',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.bundle.js',
		publicPath: '/'
	},
	externals: [nodeExternals()],
	devtool: 'inline-source-map',
	entry: {
		app: './backend/src/server.js'
	},
};

module.exports = [clientConfig, serverConfig];
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clean-webpack-plugin");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "postcss-cssnext":
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),

/***/ "postcss-focus":
/*!********************************!*\
  !*** external "postcss-focus" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("postcss-focus");

/***/ }),

/***/ "postcss-reporter":
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmFja2VuZC9zcmMvZXJyb3JzL0h0dHBFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9tb2RlbHMvc2Vzc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvYXBpL2NoYW1waW9uLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvYXBpL2l0ZW0tcm91dGVzLmpzIiwid2VicGFjazovLy8uL2JhY2tlbmQvc3JjL3JvdXRlcy9hcGkvcnVuZXMtcmVmb3JnZWQtcm91dGVzLmpzIiwid2VicGFjazovLy8uL2JhY2tlbmQvc3JjL3JvdXRlcy9hcGkvdXNlci1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYmFja2VuZC9zcmMvcm91dGVzL2NvbnRyb2xsZXIvY2hhbXBpb24tY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvY29udHJvbGxlci9pdGVtLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYmFja2VuZC9zcmMvcm91dGVzL2NvbnRyb2xsZXIvcnVuZXMtcmVmb3JnZWQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvY29udHJvbGxlci91c2VyLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYmFja2VuZC9zcmMvcm91dGVzL3NlcnZpY2VzL2RkcmFnb24tc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvc2VydmljZXMvbWVzc2FnZXMtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9iYWNrZW5kL3NyYy9yb3V0ZXMvc2VydmljZXMvc2Vzc2lvbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2JhY2tlbmQvc3JjL3JvdXRlcy9zZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYmFja2VuZC9zcmMvc2VydmVyLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9kZHJhZ29uLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9rZXlzLmpzIiwid2VicGFjazovLy8uL3dlYnBhY2suY29uZmlnLmRldi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGVhbi13ZWJwYWNrLXBsdWdpblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy12YWxpZGF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0bWwtd2VicGFjay1wbHVnaW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBvc3Rjc3MtY3NzbmV4dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBvc3Rjc3MtZm9jdXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwb3N0Y3NzLXJlcG9ydGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2VicGFja1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEs7QUFDQTs7QUFFQSwyQjs7Ozs7Ozs7Ozs7QUNiQSxpQkFBaUIsbUJBQU8sQ0FBQywwQkFBVTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBLGlDQUFpQyxXQUFXO0FBQzVDO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNkQSxpQkFBaUIsbUJBQU8sQ0FBQywwQkFBVTtBQUNuQyxlQUFlLG1CQUFPLENBQUMsMEJBQVU7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0Q0EsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7QUFDakM7QUFDQSwyQkFBMkIsbUJBQU8sQ0FBQyxpR0FBbUM7O0FBRXRFO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7QUN0QkEsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7QUFDakM7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyx5RkFBK0I7O0FBRTlEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7OztBQ2hCQSxnQkFBZ0IsbUJBQU8sQ0FBQyx3QkFBUztBQUNqQztBQUNBLGdDQUFnQyxtQkFBTyxDQUFDLDZHQUF5Qzs7QUFFakY7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQsd0I7Ozs7Ozs7Ozs7O0FDWkEsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7QUFDakM7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyx5RkFBK0I7O0FBRTlEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLDRDO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7OztBQ3JDQSxPQUFPLGdEQUFnRCxHQUFHLG1CQUFPLENBQUMscUZBQTZCO0FBQy9GLGtCQUFrQixtQkFBTyxDQUFDLGlFQUF3QjtBQUNsRCxjQUFjLG1CQUFPLENBQUMsb0JBQU87O0FBRTdCO0FBQ0EsNkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0Msc0NBQXNDOztBQUU1RTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBDQUEwQyxpQkFBaUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBLE87QUFDQTtBQUNBLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBDQUEwQyxpQkFBaUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBLFlBQVksdUNBQXVDLEdBQUcsb0JBQW9CO0FBQzFFOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQXVEO0FBQ2hGLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qix5REFBeUQ7QUFDbEYsR0FBRztBQUNILDBDQUEwQyxpQkFBaUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsb0M7Ozs7Ozs7Ozs7O0FDM0ZBLE9BQU8sd0NBQXdDLEdBQUcsbUJBQU8sQ0FBQyxxRkFBNkI7QUFDdkYsa0JBQWtCLG1CQUFPLENBQUMsaUVBQXdCO0FBQ2xELGNBQWMsbUJBQU8sQ0FBQyxvQkFBTzs7QUFFN0I7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxrQ0FBa0M7O0FBRXBFO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBDQUEwQyxpQkFBaUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMENBQTBDLGlCQUFpQjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLG1DQUFtQyxHQUFHLGdCQUFnQjtBQUNsRTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLCtDQUErQztBQUN4RSxHQUFHO0FBQ0gsMENBQTBDLGlCQUFpQjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQWlEO0FBQzFFLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGdDOzs7Ozs7Ozs7OztBQ3BGQSxPQUFPLDBEQUEwRCxHQUFHLG1CQUFPLENBQUMscUZBQTZCO0FBQ3pHLGtCQUFrQixtQkFBTyxDQUFDLGlFQUF3QjtBQUNsRCxjQUFjLG1CQUFPLENBQUMsb0JBQU87O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0MsMkNBQTJDOztBQUU3RTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBDQUEwQyxpQkFBaUI7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMENBQTBDLGlCQUFpQjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLDRDQUE0QyxHQUFHLGlCQUFpQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHlEQUF5RDtBQUNsRixHQUFHO0FBQ0gsMENBQTBDLGlCQUFpQjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsMkRBQTJEO0FBQ3BGLEdBQUc7QUFDSCwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELHlDOzs7Ozs7Ozs7OztBQ2xHQSxvQkFBb0IsbUJBQU8sQ0FBQywrRUFBMEI7QUFDdEQsdUJBQXVCLG1CQUFPLENBQUMscUZBQTZCO0FBQzVELHVCQUF1QixtQkFBTyxDQUFDLHVGQUE4QjtBQUM3RCxrQkFBa0IsbUJBQU8sQ0FBQyxpRUFBd0I7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtDQUFrQyx1QkFBdUI7QUFDekQsU0FBUztBQUNULG1EQUFtRCxpQkFBaUI7QUFDcEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0Msd0NBQXdDO0FBQzFFO0FBQ0E7QUFDQSxtREFBbUQsaUJBQWlCO0FBQ3BFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pELFNBQVM7QUFDVCxtREFBbUQsZ0JBQWdCO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DLFNBQVM7QUFDVCxtREFBbUQsZ0JBQWdCO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DLFNBQVM7QUFDVCxtREFBbUQsaUJBQWlCO0FBQ3BFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLCtDQUErQztBQUNqRixTQUFTO0FBQ1QsbURBQW1ELGdCQUFnQjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxTQUFTO0FBQ1QsbURBQW1ELGdCQUFnQjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGdDOzs7Ozs7Ozs7OztBQ3pIQSxPQUFPLDZIQUE2SCxHQUFHLG1CQUFPLENBQUMsdURBQTRCOztBQUUzSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxrQkFBa0IsaUg7Ozs7Ozs7Ozs7O0FDM0JsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxnQzs7Ozs7Ozs7Ozs7QUNWQSxnQkFBZ0IsbUJBQU8sQ0FBQyw2REFBc0I7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsZ0M7Ozs7Ozs7Ozs7O0FDdEJBLGFBQWEsbUJBQU8sQ0FBQyx1REFBbUI7O0FBRXhDO0FBQ0E7QUFDQSw2Q0FBNkMscUJBQXFCO0FBQ2xFOztBQUVBO0FBQ0EsNkNBQTZDLGVBQWU7QUFDNUQ7O0FBRUEsd0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLGdCQUFnQixTQUFTLFlBQVk7QUFDakY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsNkI7Ozs7Ozs7Ozs7O0FDakVBLGlFQUFnQixtQkFBTyxDQUFDLHdCQUFTO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixxQkFBcUIsbUJBQU8sQ0FBQyxvQ0FBZTtBQUM1QyxtQkFBbUIsbUJBQU8sQ0FBQyxnQ0FBYTtBQUN4Qyx5QkFBeUIsbUJBQU8sQ0FBQyw0Q0FBbUI7QUFDcEQsZ0JBQWdCLG1CQUFPLENBQUMsd0NBQWlCO0FBQ3pDLGlCQUFpQixtQkFBTyxDQUFDLDBCQUFVO0FBQ25DLGlCQUFpQixtQkFBTyxDQUFDLDBCQUFVO0FBQ25DLFdBQVcsbUJBQU8sQ0FBQywyQ0FBbUI7QUFDdEMsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7QUFDakMsNkJBQTZCLG1CQUFPLENBQUMsc0RBQXdCO0FBQzdELHNCQUFzQixtQkFBTyxDQUFDLDREQUE2QjtBQUMzRDs7QUFFQTtBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTs7QUFFQSxtQkFBbUIsbUJBQU8sQ0FBQyx5RUFBMEI7QUFDckQsdUJBQXVCLG1CQUFPLENBQUMsaUZBQThCO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLHlFQUEwQjtBQUNyRCw0QkFBNEIsbUJBQU8sQ0FBQyw2RkFBb0M7O0FBRXhFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EscUNBQXFDLGdCQUFnQjtBQUNyRCxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGdCQUFnQjtBQUMxRCxDQUFDLEM7Ozs7Ozs7Ozs7OztBQzNGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDYkEsa0I7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDRkEsNERBQVcsbUJBQU8sQ0FBQyxjQUFJO0FBQ3ZCLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixzQkFBc0IsbUJBQU8sQ0FBQyxzREFBd0I7QUFDdEQsMEJBQTBCLG1CQUFPLENBQUMsZ0RBQXFCO0FBQ3ZELDJCQUEyQixtQkFBTyxDQUFDLGtEQUFzQjtBQUN6RCxnQkFBZ0IsbUJBQU8sQ0FBQyx3QkFBUztBQUNqQyxnQkFBZ0IsbUJBQU8sQ0FBQyx3Q0FBaUI7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsb0NBQWU7QUFDNUMsd0JBQXdCLG1CQUFPLENBQUMsMENBQWtCOzs7O0FBSWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsOEM7Ozs7Ozs7Ozs7OztBQ3BGQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSxtRCIsImZpbGUiOiJzZXJ2ZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYmFja2VuZC9zcmMvc2VydmVyLmpzXCIpO1xuIiwiY2xhc3MgSHR0cEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3Ioc3RhdHVzQ29kZSwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgc3VwZXIoLi4ucGFyYW1zKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBNYWludGFpbnMgcHJvcGVyIHN0YWNrIHRyYWNlIGZvciB3aGVyZSBvdXIgZXJyb3Igd2FzIHRocm93biAob25seSBhdmFpbGFibGUgb24gVjgpXHJcbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEh0dHBFcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIdHRwRXJyb3I7IiwiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5cclxuY29uc3QgU2Vzc2lvblNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICB1c2VySWQgOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGluZGV4OiB0cnVlXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmNvbnN0IFNlc3Npb24gPSBtb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdTZXNzaW9uJywgU2Vzc2lvblNjaGVtYSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBhc3luYyAoaWQpID0+IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgU2Vzc2lvbih7dXNlcklkOiBpZH0pO1xyXG4gICAgcmV0dXJuIGF3YWl0IHNlc3Npb24uc2F2ZSgpO1xyXG59IiwiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHRqcycpO1xyXG5cclxuY29uc3QgVXNlclNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICB1c2VybmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBpbmRleDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgZW1haWw6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgIH0sXHJcbiAgICBuYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgXHJcbn0pO1xyXG5cclxuY29uc3QgVXNlciA9IG1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCBVc2VyU2NoZW1hKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVVzZXIgPSBhc3luYyAobmV3VXNlcikgPT4ge1xyXG4gICAgbmV3VXNlci5wYXNzd29yZCA9IGF3YWl0IFVzZXIuZ2VuZXJhdGVQYXNzd29yZChuZXdVc2VyLnBhc3N3b3JkKTtcclxuICAgIHJldHVybiBhd2FpdCBuZXdVc2VyLnNhdmUoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcclxuICAgIGNvbnN0IHNhbHQgPSBhd2FpdCBiY3J5cHQuZ2VuU2FsdCgxMCk7XHJcbiAgICByZXR1cm4gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIHNhbHQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ2V0VXNlckJ5UHJvcGVydHkgPSBhc3luYyAocHJvcGVydHkpID0+IHtcclxuICAgIHJldHVybiBhd2FpdCBVc2VyLmZpbmRPbmUocHJvcGVydHkpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkLCBoYXNoKSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2gpO1xyXG59IiwiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY29uc3QgQ2hhbXBpb25Db250cm9sbGVyID0gcmVxdWlyZSgnLi4vY29udHJvbGxlci9jaGFtcGlvbi1jb250cm9sbGVyJyk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvYWxsJywgKHJlcSwgcmVzKSA9PiB7XHJcblx0Q2hhbXBpb25Db250cm9sbGVyLmdldEFsbENoYW1waW9ucyhyZXEsIHJlcyk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldCgnLzpub3VuJywgKHJlcSwgcmVzKSA9PiB7XHJcblx0aWYgKGlzTmFOKHJlcS5wYXJhbXMubm91bikpXHJcblx0XHRDaGFtcGlvbkNvbnRyb2xsZXIuZ2V0Q2hhbXBpb25CeU5hbWUocmVxLCByZXMpO1xyXG5cdGVsc2VcclxuXHRcdENoYW1waW9uQ29udHJvbGxlci5nZXRDaGFtcGlvbkJ5SWQocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoJy86bm91bi9pbWFnZScsIChyZXEsIHJlcykgPT4ge1xyXG5cdGlmIChpc05hTihyZXEucGFyYW1zLm5vdW4pKVxyXG5cdFx0Q2hhbXBpb25Db250cm9sbGVyLmdldENoYW1waW9uSW1hZ2VCeU5hbWUocmVxLCByZXMpO1xyXG5cdGVsc2VcclxuXHRcdENoYW1waW9uQ29udHJvbGxlci5nZXRDaGFtcGlvbkltYWdlQnlJZChyZXEsIHJlcyk7XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcclxuIiwiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY29uc3QgSXRlbUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuLi9jb250cm9sbGVyL2l0ZW0tY29udHJvbGxlcicpO1xyXG5cclxucm91dGVyLmdldCgnL2FsbCcsIChyZXEsIHJlcykgPT4ge1xyXG5cdEl0ZW1Db250cm9sbGVyLmdldEFsbEl0ZW1zKHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvOmlkJywgKHJlcSwgcmVzKSA9PiB7XHJcblx0SXRlbUNvbnRyb2xsZXIuZ2V0SXRlbUJ5SWQocmVxLCByZXMpO1xyXG59KVxyXG5cclxucm91dGVyLmdldCgnLzppZC9pbWFnZScsIChyZXEsIHJlcykgPT4ge1xyXG5cdEl0ZW1Db250cm9sbGVyLmdldEl0ZW1JbWFnZUJ5SWQocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyOyIsImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNvbnN0IFJ1bmVzUmVmb3JnZWRDb250cm9sbGVyID0gcmVxdWlyZSgnLi4vY29udHJvbGxlci9ydW5lcy1yZWZvcmdlZC1jb250cm9sbGVyJyk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvOmlkJywgKHJlcSwgcmVzKSA9PiB7XHJcblx0UnVuZXNSZWZvcmdlZENvbnRyb2xsZXIuZ2V0UnVuZXNSZWZvcmdlZEJ5SWQocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoJy86aWQvaW1hZ2UnLCAocmVxLCByZXMpID0+IHtcclxuXHRSdW5lc1JlZm9yZ2VkQ29udHJvbGxlci5nZXRSdW5lc1JlZm9yZ2VkSW1hZ2VCeUlkKHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiLCJjb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jb25zdCBVc2VyQ29udHJvbGxlciA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXIvdXNlci1jb250cm9sbGVyJyk7XHJcblxyXG5yb3V0ZXIucG9zdCgnL3JlZ2lzdGVyJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBVc2VyQ29udHJvbGxlci5yZWdpc3RlcihyZXEsIHJlcyk7XHJcbn0pO1xyXG5cclxuLy8gcmV0cmlldmUgdXNlclxyXG5yb3V0ZXIuZ2V0KCcvc2Vzc2lvbi86aWQnLCAocmVxLCByZXMpID0+IHtcclxuICAgIFVzZXJDb250cm9sbGVyLnJldHJpZXZlVXNlcihyZXEsIHJlcyk7XHJcbn0pO1xyXG5cclxuLy8gdXBkYXRlIHVzZXJcclxucm91dGVyLnBvc3QoXCIvdXBkYXRlLzppZFwiLCAocmVxLCByZXMpID0+IHtcclxuICAgIFVzZXJDb250cm9sbGVyLnVwZGF0ZShyZXEsIHJlcyk7XHJcbn0pO1xyXG5cclxuLy8gZGVsZXRlIHVzZXJcclxucm91dGVyLmRlbGV0ZSgnL2RlbGV0ZS86aWQnLCAocmVxLCByZXMpID0+IHsgICAgXHJcbiAgICBVc2VyQ29udHJvbGxlci5kZWxldGVBY2NvdW50KHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG4vLyBjb25maXJtIHBhc3N3b3JkXHJcbnJvdXRlci5wb3N0KFwiL3ZhbGlkYXRlXCIsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgVXNlckNvbnRyb2xsZXIudmFsaWRhdGUocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KCcvbG9naW4nLCAocmVxLCByZXMpID0+IHtcclxuICAgIFVzZXJDb250cm9sbGVyLmxvZ2luKHJlcSwgcmVzKTtcclxufSk7XHJcbiAgICAgICAgXHJcblxyXG5yb3V0ZXIuZGVsZXRlKCcvbG9nb3V0LzppZCcsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgVXNlckNvbnRyb2xsZXIubG9nb3V0KHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiLCJjb25zdCB7IEREcmFnb25TZXJ2aWNlLCBDSEFNUElPTl9EQVRBLCBDSEFNUElPTl9JTUFHRSB9ID0gcmVxdWlyZSgnLi4vc2VydmljZXMvZGRyYWdvbi1zZXJ2aWNlJyk7XHJcbmNvbnN0IEh0dHBFcnJvciA9IHJlcXVpcmUoJy4uLy4uL2Vycm9ycy9IdHRwRXJyb3InKTtcclxuY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xyXG5cclxuY29uc3QgQ2hhbXBpb25Db250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdGxldCBleGlzdHMgPSAob2JqLCByZXMpID0+IHtcdFx0XHJcblx0XHRpZiAob2JqKVxyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbihvYmopO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgSHR0cEVycm9yKDQwNCwgJ0NoYW1waW9uIGRvZXMgbm90IGV4aXN0Jyk7XHJcblx0fTtcclxuXHJcblx0bGV0IGNoYW1waW9uQVBJID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgY2hhbXBpb25zID0gYXdhaXQgYXhpb3MuZ2V0KGAke0REcmFnb25TZXJ2aWNlLmdldFBhdGgoQ0hBTVBJT05fREFUQSl9YCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gY2hhbXBpb25zLmRhdGEuZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCAnRERyYWdvbiBpcyBkb3duJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGNoYW1waW9uSWRBUEkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdGxldCBjaGFtcGlvbnMgPSBhd2FpdCBjaGFtcGlvbkFQSShyZXEsIHJlcyk7XHJcblxyXG5cdFx0Zm9yICh2YXIgY2hhbXBpb24gaW4gY2hhbXBpb25zKVxyXG5cdFx0XHRpZiAoY2hhbXBpb25zW2NoYW1waW9uXS5rZXkgPT09IHJlcS5wYXJhbXMubm91bilcclxuXHRcdFx0XHRyZXR1cm4gY2hhbXBpb25zW2NoYW1waW9uXTtcclxuXHJcblx0XHR0aHJvdyBuZXcgSHR0cEVycm9yKDQwNCwgJ0NoYW1waW9uIGRvZXMgbm90IGV4aXN0Jyk7XHJcblx0fVxyXG5cclxuXHRsZXQgY2hhbXBpb25OYW1lQVBJID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHRsZXQgY2hhbXBpb25zID0gYXdhaXQgY2hhbXBpb25BUEkocmVxLCByZXMpO1xyXG5cclxuXHRcdHJldHVybiBjaGFtcGlvbnNbcmVxLnBhcmFtcy5ub3VuXTtcclxuXHR9XHJcblxyXG5cdGxldCBnZXRBbGxDaGFtcGlvbnMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKGF3YWl0IGNoYW1waW9uQVBJKHJlcSwgcmVzKSk7XHJcblx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3JzOiBleC5tc2cgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGdldENoYW1waW9uQnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcdFx0XHRcclxuXHRcdFx0cmV0dXJuIGV4aXN0cyhhd2FpdCBjaGFtcGlvbklkQVBJKHJlcSwgcmVzKSwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgZ2V0Q2hhbXBpb25CeU5hbWUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJldHVybiBleGlzdHMoYXdhaXQgY2hhbXBpb25OYW1lQVBJKHJlcSwgcmVzKSwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgZ2V0Q2hhbXBpb25JbWFnZSA9IChjaGFtcGlvbikgPT4ge1xyXG5cdFx0cmV0dXJuIGAke0REcmFnb25TZXJ2aWNlLmdldFBhdGgoQ0hBTVBJT05fSU1BR0UpfS8ke2NoYW1waW9uLmltYWdlLmZ1bGx9YDtcclxuXHR9XHJcblxyXG5cdGxldCBnZXRDaGFtcGlvbkltYWdlQnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyBzcmM6IGdldENoYW1waW9uSW1hZ2UoYXdhaXQgY2hhbXBpb25JZEFQSShyZXEsIHJlcykpIH0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0cmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGxldCBnZXRDaGFtcGlvbkltYWdlQnlOYW1lID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7IHNyYzogZ2V0Q2hhbXBpb25JbWFnZShhd2FpdCBjaGFtcGlvbk5hbWVBUEkocmVxLCByZXMpKSB9KTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRBbGxDaGFtcGlvbnM6IGdldEFsbENoYW1waW9ucyxcclxuXHRcdGdldENoYW1waW9uQnlJZDogZ2V0Q2hhbXBpb25CeUlkLFxyXG5cdFx0Z2V0Q2hhbXBpb25CeU5hbWU6IGdldENoYW1waW9uQnlOYW1lLFxyXG5cdFx0Z2V0Q2hhbXBpb25JbWFnZUJ5SWQ6IGdldENoYW1waW9uSW1hZ2VCeUlkLFxyXG5cdFx0Z2V0Q2hhbXBpb25JbWFnZUJ5TmFtZTogZ2V0Q2hhbXBpb25JbWFnZUJ5TmFtZVxyXG5cdH1cclxufSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGFtcGlvbkNvbnRyb2xsZXI7IiwiY29uc3QgeyBERHJhZ29uU2VydmljZSwgSVRFTV9EQVRBLCBJVEVNX0lNQUdFIH0gPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9kZHJhZ29uLXNlcnZpY2UnKTtcclxuY29uc3QgSHR0cEVycm9yID0gcmVxdWlyZSgnLi4vLi4vZXJyb3JzL0h0dHBFcnJvcicpO1xyXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XHJcblxyXG5jb25zdCBJdGVtQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgZXhpc3RzID0gKG9iaiwgcmVzKSA9PiB7XHRcdFxyXG5cdFx0aWYgKG9iailcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24ob2JqKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEh0dHBFcnJvcig0MDQsICdJdGVtIGRvZXMgbm90IGV4aXN0Jyk7XHJcblx0fTtcclxuXHJcblx0bGV0IGl0ZW1BUEkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBpdGVtcyA9IGF3YWl0IGF4aW9zLmdldChgJHtERHJhZ29uU2VydmljZS5nZXRQYXRoKElURU1fREFUQSl9YCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gaXRlbXMuZGF0YS5kYXRhO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEh0dHBFcnJvcig0MDQsICdERHJhZ29uIGlzIGRvd24nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgaXRlbUlkQVBJID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHRsZXQgaXRlbXMgPSBhd2FpdCBpdGVtQVBJKHJlcSwgcmVzKTtcdFx0XHJcblx0XHRyZXR1cm4gaXRlbXNbcmVxLnBhcmFtcy5pZF07XHJcblx0fVxyXG5cclxuXHRsZXQgaXRlbU5hbWVBUEkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHJldHVybiBleGlzdHMoYXdhaXQgaXRlbUFQSShyZXEsIHJlcykpO1xyXG5cdH1cclxuXHJcblx0bGV0IGdldEFsbEl0ZW1zID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCBpdGVtQVBJKHJlcSwgcmVzKSk7XHJcblx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3JzOiBleC5tc2cgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGdldEl0ZW1CeUlkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRyZXR1cm4gZXhpc3RzKGF3YWl0IGl0ZW1JZEFQSShyZXEsIHJlcyksIHJlcyk7XHJcblx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3JzOiBleC5tc2cgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGdldEl0ZW1CeU5hbWUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJldHVybiBleGlzdHMoYXdhaXQgaXRlbU5hbWVBUEkocmVxLCByZXMpKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgZ2V0SXRlbUltYWdlID0gKGl0ZW0pID0+IHtcclxuXHRcdHJldHVybiBgJHtERHJhZ29uU2VydmljZS5nZXRQYXRoKElURU1fSU1BR0UpfS8ke2l0ZW0uaW1hZ2UuZnVsbH1gO1xyXG5cdH1cclxuXHJcblx0bGV0IGdldEl0ZW1JbWFnZUJ5SWQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3JjOiBnZXRJdGVtSW1hZ2UoYXdhaXQgaXRlbUlkQVBJKHJlcSwgcmVzKSkgfSk7XHJcblx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3JzOiBleC5tc2cgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGdldEl0ZW1JbWFnZUJ5TmFtZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyBzcmM6IGdldEl0ZW1JbWFnZShhd2FpdCBpdGVtTmFtZUFQSShyZXEsIHJlcykpIH0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0cmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldEFsbEl0ZW1zOiBnZXRBbGxJdGVtcyxcclxuXHRcdGdldEl0ZW1CeUlkOiBnZXRJdGVtQnlJZCxcclxuXHRcdGdldEl0ZW1CeU5hbWU6IGdldEl0ZW1CeU5hbWUsXHJcblx0XHRnZXRJdGVtSW1hZ2VCeUlkOiBnZXRJdGVtSW1hZ2VCeUlkLFxyXG5cdFx0Z2V0SXRlbUltYWdlQnlOYW1lOiBnZXRJdGVtSW1hZ2VCeU5hbWVcclxuXHR9XHJcbn0oKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbUNvbnRyb2xsZXI7IiwiY29uc3QgeyBERHJhZ29uU2VydmljZSwgUlVORVNSRUZPUkdFRF9EQVRBLCBSVU5FU1JFRk9SR0VEX0lNQUdFIH0gPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9kZHJhZ29uLXNlcnZpY2UnKTtcclxuY29uc3QgSHR0cEVycm9yID0gcmVxdWlyZSgnLi4vLi4vZXJyb3JzL0h0dHBFcnJvcicpO1xyXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XHJcblxyXG5jb25zdCBSdW5lc1JlZm9yZ2VkQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgZXhpc3RzID0gKG9iaiwgcmVzKSA9PiB7XHJcblx0XHRpZiAob2JqKVxyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbihvYmopO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBuZXcgSHR0cEVycm9yKDQwNCwgJ1J1bmVzUmVmb3JnZWQgZG9lcyBub3QgZXhpc3QnKTtcclxuXHR9O1xyXG5cclxuXHRsZXQgcnVuZXNBUEkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBydW5lcyA9IGF3YWl0IGF4aW9zLmdldChgJHtERHJhZ29uU2VydmljZS5nZXRQYXRoKFJVTkVTUkVGT1JHRURfREFUQSl9YCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gcnVuZXMuZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCAnRERyYWdvbiBpcyBkb3duJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IHJ1bmVzSWRBUEkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRcdGxldCBydW5lcyA9IGF3YWl0IHJ1bmVzQVBJKHJlcSwgcmVzKTtcclxuXHRcdGZvciAodmFyIHRyZWUgaW4gcnVuZXMpIHtcclxuXHRcdFx0aWYgKHJ1bmVzW3RyZWVdLmlkID09IHJlcS5wYXJhbXMuaWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gcnVuZXNbdHJlZV07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgc2xvdCBpbiBydW5lc1t0cmVlXVsnc2xvdHMnXSkge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgcnVuZSBpbiBydW5lc1t0cmVlXVsnc2xvdHMnXVtzbG90XVsncnVuZXMnXSkge1xyXG5cdFx0XHRcdFx0XHRpZiAocnVuZXNbdHJlZV1bJ3Nsb3RzJ11bc2xvdF1bJ3J1bmVzJ11bcnVuZV0uaWQgPT0gcmVxLnBhcmFtcy5pZCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBydW5lc1t0cmVlXVsnc2xvdHMnXVtzbG90XVsncnVuZXMnXVtydW5lXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCAnUnVuZXNSZWZvcmdlZCBkb2VzIG5vdCBleGlzdCcpO1xyXG5cdH1cclxuXHJcblx0bGV0IHJ1bmVzTmFtZUFQSSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0cmV0dXJuIGV4aXN0cyhhd2FpdCBydW5lc0FQSShyZXEsIHJlcykpO1xyXG5cdH1cclxuXHJcblx0bGV0IGdldEFsbFJ1bmVzUmVmb3JnZWRzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCBydW5lc0FQSShyZXEsIHJlcykpO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHtcclxuXHRcdFx0cmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGxldCBnZXRSdW5lc1JlZm9yZ2VkQnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmV0dXJuIGV4aXN0cyhhd2FpdCBydW5lc0lkQVBJKHJlcSwgcmVzKSwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgZ2V0UnVuZXNSZWZvcmdlZEJ5TmFtZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmV0dXJuIGV4aXN0cyhhd2FpdCBydW5lc05hbWVBUEkocmVxLCByZXMpKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsZXQgZ2V0UnVuZXNSZWZvcmdlZEltYWdlID0gKHJ1bmVzKSA9PiB7XHJcblx0XHRyZXR1cm4gYCR7RERyYWdvblNlcnZpY2UuZ2V0UGF0aChSVU5FU1JFRk9SR0VEX0lNQUdFKX0vJHtydW5lcy5pbWFnZS5mdWxsfWA7XHJcblx0fVxyXG5cclxuXHRsZXQgZ2V0UnVuZXNSZWZvcmdlZEltYWdlQnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyBzcmM6IGdldFJ1bmVzUmVmb3JnZWRJbWFnZShhd2FpdCBydW5lc0lkQVBJKHJlcSwgcmVzKSkgfSk7XHJcblx0XHR9IGNhdGNoIChleCkge1xyXG5cdFx0XHRyZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3JzOiBleC5tc2cgfSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGdldFJ1bmVzUmVmb3JnZWRJbWFnZUJ5TmFtZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyBzcmM6IGdldFJ1bmVzUmVmb3JnZWRJbWFnZShhd2FpdCBydW5lc05hbWVBUEkocmVxLCByZXMpKSB9KTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRBbGxSdW5lc1JlZm9yZ2VkczogZ2V0QWxsUnVuZXNSZWZvcmdlZHMsXHJcblx0XHRnZXRSdW5lc1JlZm9yZ2VkQnlJZDogZ2V0UnVuZXNSZWZvcmdlZEJ5SWQsXHJcblx0XHRnZXRSdW5lc1JlZm9yZ2VkQnlOYW1lOiBnZXRSdW5lc1JlZm9yZ2VkQnlOYW1lLFxyXG5cdFx0Z2V0UnVuZXNSZWZvcmdlZEltYWdlQnlJZDogZ2V0UnVuZXNSZWZvcmdlZEltYWdlQnlJZCxcclxuXHRcdGdldFJ1bmVzUmVmb3JnZWRJbWFnZUJ5TmFtZTogZ2V0UnVuZXNSZWZvcmdlZEltYWdlQnlOYW1lXHJcblx0fVxyXG59KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bmVzUmVmb3JnZWRDb250cm9sbGVyOyIsImNvbnN0IFVzZXJTZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlJyk7XHJcbmNvbnN0IFNlc3Npb25TZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvc2Vzc2lvbi1zZXJ2aWNlJyk7XHJcbmNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvbWVzc2FnZXMtc2VydmljZScpO1xyXG5jb25zdCBIdHRwRXJyb3IgPSByZXF1aXJlKCcuLi8uLi9lcnJvcnMvSHR0cEVycm9yJyk7XHJcblxyXG5jb25zdCBVc2VyQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCByZWdpc3RlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeUVtYWlsKHJlcS5ib2R5LmZvcm0uZW1haWwpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtOiAnZW1haWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogTWVzc2FnZVNlcnZpY2UuRU1BSUxfNDA2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeVVzZXJuYW1lKHJlcS5ib2R5LmZvcm0udXNlcm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtOiAndXNlcm5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogTWVzc2FnZVNlcnZpY2UuVVNFUk5BTUVfNDA2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDYsIGVycm9ycyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlclNlcnZpY2UucmVnaXN0ZXJVc2VyKHJlcS5ib2R5LmZvcm0pO1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuY3JlYXRlU2Vzc2lvbih1c2VyLl9pZCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHNlc3Npb246IHNlc3Npb24uX2lkIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZXRyaWV2ZVVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuZ2V0U2Vzc2lvbihyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFzZXNzaW9uKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDQsIE1lc3NhZ2VTZXJ2aWNlLlNFU1NJT05fNDA0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlclNlcnZpY2UuZ2V0VXNlckJ5SWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKDQwNCwgTWVzc2FnZVNlcnZpY2UuVVNFUl80MDQpO1xyXG5cclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiBVc2VyU2VydmljZS5yZW1vdmVQcml2YXRlKHVzZXIpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IGxvZ2luID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuY3JlYXRlU2Vzc2lvbih1c2VyLl9pZCk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc2Vzc2lvbjogc2Vzc2lvbi5faWQgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yOiBleC5tc2cgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBsb2dvdXQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCBTZXNzaW9uU2VydmljZS5kZWxldGVTZXNzaW9uKHJlcS5wYXJhbXMuaWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5TRVNTSU9OXzQwNCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7fSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yOiBleC5tc2cgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWxldGVBY2NvdW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCBTZXNzaW9uU2VydmljZS5kZWxldGVTZXNzaW9uKHJlcS5wYXJhbXMuaWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5TRVNTSU9OXzQwNCk7XHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IFVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIodXNlci5faWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5VU0VSXzQwNCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7fSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdXBkYXRlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IFVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlciwgcmVxLmJvZHkuZm9ybSk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXI6IFVzZXJTZXJ2aWNlLnJlbW92ZVByaXZhdGUodXBkYXRlZFVzZXIpIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcjogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHZhbGlkYXRlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdmFsaWRhdGVVc2VyKHJlcSk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcclxuICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3I6IGV4Lm1zZyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB2YWxpZGF0ZVVzZXIgPSBhc3luYyAocmVxKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeVVzZXJuYW1lKHJlcS5ib2R5LmZvcm0udXNlcm5hbWUpO1xyXG4gICAgICAgIGlmICghKHVzZXIgJiYgKGF3YWl0IFVzZXJTZXJ2aWNlLnZhbGlkYXRlUGFzc3dvcmQodXNlciwgcmVxLmJvZHkuZm9ybS5wYXNzd29yZCkpKSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDEsIE1lc3NhZ2VTZXJ2aWNlLkxPR0lOXzQwMSk7XHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxyXG4gICAgICAgIGxvZ2luOiBsb2dpbixcclxuICAgICAgICBsb2dvdXQ6IGxvZ291dCxcclxuICAgICAgICByZXRyaWV2ZVVzZXI6IHJldHJpZXZlVXNlcixcclxuICAgICAgICBkZWxldGVBY2NvdW50OiBkZWxldGVBY2NvdW50LFxyXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICAgIH1cclxufSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyQ29udHJvbGxlcjsiLCJjb25zdCB7IGJhc2VVUkwsIGNoYW1waW9uSW1hZ2UsIGNoYW1waW9uUGF0aCwgaXRlbVBhdGgsIGl0ZW1JbWFnZVBhdGgsIGNoYW1waW9uSW1hZ2VQYXRoLCBydW5lc1JlZm9yZ2VkSW1hZ2VQYXRoLCBydW5lc1JlZm9yZ2VkUGF0aH0gPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9jb25maWcvZGRyYWdvbicpO1xyXG5cclxuY29uc3QgQ0hBTVBJT05fREFUQSA9ICdDSEFNUElPTl9EQVRBJztcclxuY29uc3QgQ0hBTVBJT05fSU1BR0UgPSAnQ0hBTVBJT05fSU1BR0UnO1xyXG5jb25zdCBJVEVNX0RBVEEgPSAnSVRFTV9EQVRBJztcclxuY29uc3QgSVRFTV9JTUFHRSA9ICdJVEVNX0lNQUdFJztcclxuY29uc3QgUlVORVNSRUZPUkdFRF9EQVRBID0gJ1JVTkVTUkVGT1JHRURfREFUQSc7XHJcbmNvbnN0IFJVTkVTUkVGT1JHRURfSU1BR0UgPSAnUlVORVNSRUZPUkdFRF9JTUFHRSc7XHJcblxyXG5jb25zdCBERHJhZ29uU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgZ2V0UGF0aCA9IHRva2VuID0+IHtcclxuXHRcdHN3aXRjaCAodG9rZW4pIHtcclxuXHRcdFx0Y2FzZSAnQ0hBTVBJT05fREFUQSc6IHJldHVybiBiYXNlVVJMICsgY2hhbXBpb25QYXRoXHJcblx0XHRcdGNhc2UgJ0NIQU1QSU9OX0lNQUdFJzogcmV0dXJuIGJhc2VVUkwgKyBjaGFtcGlvbkltYWdlUGF0aFxyXG5cdFx0XHRjYXNlICdJVEVNX0RBVEEnOiByZXR1cm4gYmFzZVVSTCArIGl0ZW1QYXRoXHJcblx0XHRcdGNhc2UgJ0lURU1fSU1BR0UnOiByZXR1cm4gYmFzZVVSTCArIGl0ZW1JbWFnZVBhdGhcclxuXHRcdFx0Y2FzZSAnUlVORVNSRUZPUkdFRF9EQVRBJzogcmV0dXJuIGJhc2VVUkwgKyBydW5lc1JlZm9yZ2VkUGF0aFxyXG5cdFx0XHRjYXNlICdSVU5FU1JFRk9SR0VEX0lNQUdFJzogcmV0dXJuIGJhc2VVUkwgKyBydW5lc1JlZm9yZ2VkSW1hZ2VQYXRoXHJcblx0XHRcdGRlZmF1bHQ6IHJldHVybiAnZmFsc2UnOyAvLyBzaG91bGQgYWRkIHRocm93IHNvbWV0aGluZ1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRQYXRoOiBnZXRQYXRoXHJcblx0fVxyXG59KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgRERyYWdvblNlcnZpY2UsIENIQU1QSU9OX0RBVEEsIENIQU1QSU9OX0lNQUdFLCBJVEVNX0RBVEEsIElURU1fSU1BR0UsIFJVTkVTUkVGT1JHRURfREFUQSwgUlVORVNSRUZPUkdFRF9JTUFHRSB9OyIsImNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIEVNQUlMXzQwNjogJ0VtYWlsIGlzIGFscmVhZHkgaW4gdXNlJyxcclxuICAgICAgICBVU0VSTkFNRV80MDY6ICdVc2VybmFtZSBpcyBhbHJlYWR5IGluIHVzZScsXHJcbiAgICAgICAgU0VTU0lPTl80MDQ6ICdZb3UgYXJlIG5vdCBsb2dnZWQgaW4nLFxyXG4gICAgICAgIFVTRVJfNDA0OiAnVGhpcyB1c2VyIGRvZXMgbm90IGV4aXN0JyxcclxuICAgICAgICBMT0dJTl80MDE6ICdJbnZhbGlkIHVzZXJuYW1lL3Bhc3N3b3JkJ1xyXG4gICAgfTtcclxufSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlU2VydmljZTsiLCJjb25zdCBTZXNzaW9uID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL3Nlc3Npb24nKTtcclxuXHJcbmNvbnN0IFNlc3Npb25TZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgZ2V0U2Vzc2lvbiA9IGFzeW5jIChpZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBTZXNzaW9uLmZpbmRCeUlkKGlkKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVsZXRlU2Vzc2lvbiA9IGFzeW5jIChzZXNzaW9uX2lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNlc3Npb24uZmluZEJ5SWRBbmREZWxldGUoc2Vzc2lvbl9pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgU2Vzc2lvbi5jcmVhdGUodXNlcklkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNlc3Npb246IGdldFNlc3Npb24sXHJcbiAgICAgICAgZGVsZXRlU2Vzc2lvbjogZGVsZXRlU2Vzc2lvbixcclxuICAgICAgICBjcmVhdGVTZXNzaW9uOiBjcmVhdGVTZXNzaW9uXHJcbiAgICB9XHJcbn0oKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2Vzc2lvblNlcnZpY2U7IiwiY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy91c2VyJyk7XHJcblxyXG5jb25zdCBVc2VyU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBnZXRVc2VyQnlVc2VybmFtZSA9IGFzeW5jICh1c2VybmFtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBVc2VyLmdldFVzZXJCeVByb3BlcnR5KHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBnZXRVc2VyQnlFbWFpbCA9IGFzeW5jIChlbWFpbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBVc2VyLmdldFVzZXJCeVByb3BlcnR5KHsgZW1haWw6IGVtYWlsIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZWdpc3RlclVzZXIgPSBhc3luYyAoZm9ybSkgPT4geyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFVzZXIuY3JlYXRlVXNlcihuZXcgVXNlcih7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiBmb3JtLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogZm9ybS5wYXNzd29yZCxcclxuICAgICAgICAgICAgZW1haWw6IGZvcm0uZW1haWwsXHJcbiAgICAgICAgICAgIG5hbWU6IGZvcm0ubmFtZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmFsaWRhdGVQYXNzd29yZCA9IGFzeW5jICh1c2VyLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBVc2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVwZGF0ZVVzZXIgPSBhc3luYyAodXNlciwgZm9ybSkgPT4ge1xyXG4gICAgICAgIGlmIChmb3JtLm5ld1VzZXJuYW1lKVxyXG4gICAgICAgICAgICB1c2VyLnVzZXJuYW1lID0gZm9ybS5uZXdVc2VybmFtZTtcclxuICAgICAgICBpZiAoZm9ybS5uZXdQYXNzd29yZClcclxuICAgICAgICAgICAgdXNlci5wYXNzd29yZCA9IGF3YWl0IFVzZXIuZ2VuZXJhdGVQYXNzd29yZChmb3JtLm5ld1Bhc3N3b3JkKTtcclxuICAgICAgICBpZiAoZm9ybS5uZXdFbWFpbClcclxuICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZvcm0ubmV3RW1haWw7XHJcbiAgICAgICAgaWYgKGZvcm0ubmV3TmFtZSlcclxuICAgICAgICAgICAgdXNlci5uYW1lID0gZm9ybS5uZXdOYW1lO1xyXG5cclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kT25lQW5kVXBkYXRlKHsgX2lkOiB1c2VyLl9pZCB9LCB1c2VyLCB7IG5ldzogdHJ1ZSB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVtb3ZlUHJpdmF0ZSA9ICh1c2VyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ2V0VXNlckJ5SWQgPSBhc3luYyAoaWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kQnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRlbGV0ZVVzZXIgPSBhc3luYyAodXNlcl9pZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBVc2VyLmZpbmRCeUlkQW5kRGVsZXRlKHVzZXJfaWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFVzZXJCeUlkOiBnZXRVc2VyQnlJZCxcclxuICAgICAgICBnZXRVc2VyQnlVc2VybmFtZTogZ2V0VXNlckJ5VXNlcm5hbWUsXHJcbiAgICAgICAgZ2V0VXNlckJ5RW1haWw6IGdldFVzZXJCeUVtYWlsLFxyXG4gICAgICAgIHJlZ2lzdGVyVXNlcjogcmVnaXN0ZXJVc2VyLFxyXG4gICAgICAgIGRlbGV0ZVVzZXI6IGRlbGV0ZVVzZXIsXHJcbiAgICAgICAgdXBkYXRlVXNlcjogdXBkYXRlVXNlcixcclxuICAgICAgICByZW1vdmVQcml2YXRlOiByZW1vdmVQcml2YXRlLFxyXG4gICAgICAgIHZhbGlkYXRlUGFzc3dvcmQ6IHZhbGlkYXRlUGFzc3dvcmQsXHJcbiAgICB9XHJcbn0oKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlclNlcnZpY2U7IiwiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuY29uc3QgY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpO1xyXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcclxuY29uc3QgZXhwcmVzc1ZhbGlkYXRvciA9IHJlcXVpcmUoJ2V4cHJlc3MtdmFsaWRhdG9yJyk7XHJcbmNvbnN0IHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcclxuY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xyXG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2tleXMnKS5tb25nb1VSSTtcclxuY29uc3Qgd2VicGFjayA9IHJlcXVpcmUoJ3dlYnBhY2snKTtcclxuY29uc3Qgd2VicGFja0Rldk1pZGRsZXdhcmUgPSByZXF1aXJlKCd3ZWJwYWNrLWRldi1taWRkbGV3YXJlJyk7XHJcbmNvbnN0IHdlYnBhY2tDb25maWcgPSByZXF1aXJlKCcuLi8uLi93ZWJwYWNrLmNvbmZpZy5kZXYuanMnKTtcclxuY29uc3Qgd2VicGFja0NvbXBpbGVyID0gd2VicGFjayh3ZWJwYWNrQ29uZmlnKTtcclxuXHJcbi8vIGNvbm5lY3QgdG8gbW9uZ28gdXNpbmcgbW9uZ29vc2VcclxubW9uZ29vc2UuY29ubmVjdChkYiwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSlcclxuICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdNb25nb0RiIGNvbm5lY3RlZC4uLicpKVxyXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuXHJcbmNvbnN0IHVzZXJSb3V0ZXMgPSByZXF1aXJlKCcuL3JvdXRlcy9hcGkvdXNlci1yb3V0ZXMnKTtcclxuY29uc3QgY2hhbXBpb25Sb3V0ZXMgPSByZXF1aXJlKCcuL3JvdXRlcy9hcGkvY2hhbXBpb24tcm91dGVzJyk7XHJcbmNvbnN0IGl0ZW1Sb3V0ZXMgPSByZXF1aXJlKCcuL3JvdXRlcy9hcGkvaXRlbS1yb3V0ZXMnKTtcclxuY29uc3QgcnVuZXNSZWZvcmdlZFJvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzL2FwaS9ydW5lcy1yZWZvcmdlZC1yb3V0ZXMnKTtcclxuXHJcbi8vIGRlY2xhcmUgZXhwcmVzc1xyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG4vLyB1c2Ugd2VicGFjay1kZXYtbWlkZGxld2FyZSBpZiBpbiBkZXZlbG9wbWVudCBtb2RlXHJcbi8vIGlmKHByb2Nlc3MuZW52Lk5PREVfRU5WLnRyaW0oKSA9PT0gJ2RldmVsb3BtZW50Jyl7XHJcbi8vIFx0Y29uc29sZS5sb2coJ3J1bm5pbmcgaW4gZGV2ZWxvcG1lbnQgbW9kZS4uLicpO1xyXG4vLyBcdGFwcC51c2Uod2VicGFja0Rldk1pZGRsZXdhcmUod2VicGFja0NvbXBpbGVyLCB7XHJcbi8vIFx0XHQvL3B1YmxpY1BhdGg6IHdlYnBhY2tDb25maWcub3V0cHV0LnB1YmxpY1BhdGhcclxuLy8gXHRcdHB1YmxpY1BhdGg6ICcvJ1xyXG4vLyBcdH0pKTtcclxuLy8gfWVsc2V7XHJcbi8vIFx0Y29uc29sZS5sb2coJ3J1bm5pbmcgaW4gcHJvZHVjdGlvbiBtb2RlLi4uJyk7XHJcbi8vIH1cclxuXHJcbi8vIGJvZHkgcGFyc2VyIG1pZGRsZXdhcmVcclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcclxuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XHJcblxyXG4vLyBzZXQgc3RhdGljIGZvbGRlclxyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMnKSkpO1xyXG5cclxuLy8gZXhwcmVzcyBzZXNzaW9uXHJcbmFwcC51c2Uoc2Vzc2lvbih7XHJcbiAgICBzZWNyZXQ6ICdzZWNyZXQnLFxyXG4gICAgc2F2ZVVuaXRpYWxpemVkOiB0cnVlLFxyXG4gICAgcmVzYXZlOiB0cnVlXHJcbn0pKVxyXG5cclxuLy8gcGFzc3BvcnQgaW5pdFxyXG5hcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XHJcbmFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcclxuXHJcbi8vIGV4cHJlc3MgdmFsaWRhdG9yLCB0YWtlbiBmcm9tIGdpdGh1YlxyXG5hcHAudXNlKGV4cHJlc3NWYWxpZGF0b3Ioe1xyXG4gICAgZXJyb3JGb3JtYXR0ZXI6IChwYXJhbSwgbXNnLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IHBhcmFtLnNwbGl0KCcuJyksXHJcbiAgICAgICAgICAgIHJvb3QgPSBuYW1lc3BhY2Uuc2hpZnQoMCksXHJcbiAgICAgICAgICAgIGZvcm1QYXJhbSA9IHJvb3Q7XHJcblxyXG4gICAgICAgIHdoaWxlIChuYW1lc3BhY2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1QYXJhbSArPSAnWycgKyBuYW1lc3BhY2Uuc2hpZnQoKSArICddJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhcmFtOiBmb3JtUGFyYW0sXHJcbiAgICAgICAgICAgIG1zZzogbXNnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSk7XHJcblxyXG4vLyByZW5kZXIgdGhlIG1haW4gcGFnZVxyXG4vLyBhcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XHJcbi8vIFx0cmVzLnNlbmRGaWxlKCdkaXN0L2luZGV4Lmh0bWwnLCB7cm9vdDogX19kaXJuYW1lfSk7XHJcbi8vIH0pO1xyXG5cclxuLy8gcm91dGVzIFxyXG5hcHAudXNlKCcvdXNlcicsIHVzZXJSb3V0ZXMpO1xyXG5hcHAudXNlKCcvZGRyYWdvbi9jaGFtcGlvbnMnLCBjaGFtcGlvblJvdXRlcyk7XHJcbmFwcC51c2UoJy9kZHJhZ29uL2l0ZW1zJywgaXRlbVJvdXRlcyk7XHJcbmFwcC51c2UoJy9kZHJhZ29uL3J1bmVzcmVmb3JnZWQnLCBydW5lc1JlZm9yZ2VkUm91dGVzKTtcclxuXHJcbi8vIHNldCB1cCBwb3J0XHJcbmFwcC5zZXQoJ3BvcnQnLCAocHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDAwKSk7XHJcbmFwcC5saXN0ZW4oYXBwLmdldCgncG9ydCcpLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhgU2VydmVyIHN0YXJ0ZWQgb24gcG9ydCAke2FwcC5nZXQoJ3BvcnQnKX1gKTtcclxufSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjaGFtcGlvbnM6ICdodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi84LjI0LjEvZGF0YS9lbl9VUy9jaGFtcGlvbi5qc29uJyxcclxuXHRpdGVtczogJ2h0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzguMjQuMS9kYXRhL2VuX1VTL2l0ZW0uanNvbicsXHJcblx0cnVuZXM6ICdodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi84LjI0LjEvZGF0YS9lbl9VUy9ydW5lc1JlZm9yZ2VkLmpzb24nLFxyXG5cdHZlcnNpb25zOiAnaHR0cHM6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vYXBpL3ZlcnNpb25zLmpzb24nLFxyXG5cdGJhc2VVUkw6ICdodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi84LjI0LjEnLFxyXG5cdGNoYW1waW9uSW1hZ2U6ICdodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi84LjI0LjEvaW1nL2NoYW1waW9uJyxcclxuXHRjaGFtcGlvbkltYWdlUGF0aDogJy9pbWcvY2hhbXBpb24nLFxyXG5cdGNoYW1waW9uUGF0aDogJy9kYXRhL2VuX1VTL2NoYW1waW9uLmpzb24nLFxyXG5cdGl0ZW1QYXRoOiAnL2RhdGEvZW5fVVMvaXRlbS5qc29uJyxcclxuXHRpdGVtSW1hZ2VQYXRoOiAnL2ltZy9pdGVtJyxcclxuXHRydW5lc1JlZm9yZ2VkUGF0aDogJy9kYXRhL2VuX1VTL3J1bmVzUmVmb3JnZWQuanNvbicsXHJcblx0cnVuZXNSZWZvcmdlZEltYWdlUGF0aDogJy9pbWcvcnVuZXNSZWZvcmdlZCdcclxufSIsIm1vZHVsZS5leHBvcnRzID0geyAgICBcclxuICAgIG1vbmdvVVJJOidtb25nb2RiOi8vbGxqcnVmZmluOnBhc3N3b3JkMUBkczA1MDA3Ny5tbGFiLmNvbTo1MDA3Ny9sZWFndWVfYnVpbGRzJyxcclxufSIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuY29uc3Qgbm9kZUV4dGVybmFscyA9IHJlcXVpcmUoJ3dlYnBhY2stbm9kZS1leHRlcm5hbHMnKTtcclxuY29uc3QgSHRtbFdlYnBhY2tQbHVnaW4gPSByZXF1aXJlKCdodG1sLXdlYnBhY2stcGx1Z2luJyk7XHJcbmNvbnN0IENsZWFuV2VicGFja1BsdWdpbiA9IHJlcXVpcmUoJ2NsZWFuLXdlYnBhY2stcGx1Z2luJyk7XHJcbmNvbnN0IHdlYnBhY2sgPSByZXF1aXJlKCd3ZWJwYWNrJyk7XHJcbmNvbnN0IGNzc25leHQgPSByZXF1aXJlKCdwb3N0Y3NzLWNzc25leHQnKTtcclxuY29uc3QgcG9zdGNzc0ZvY3VzID0gcmVxdWlyZSgncG9zdGNzcy1mb2N1cycpO1xyXG5jb25zdCBwb3N0Y3NzUmVwb3J0ZXIgPSByZXF1aXJlKCdwb3N0Y3NzLXJlcG9ydGVyJyk7XHJcblxyXG5cclxuXHJcbmNvbnN0IGNsaWVudENvbmZpZyA9IHtcclxuXHR0YXJnZXQ6ICd3ZWInLCAvLyBjYW4gYmUgb21taXR0ZWQgc2luY2Ugd2ViIGlzIGRlZmF1bHQsIGJ1dCBrZWVwaW5nIGFzIHJlZmVyZW5jZVxyXG5cdG1vZGU6ICdkZXZlbG9wbWVudCcsXHJcblx0b3V0cHV0OiB7XHJcblx0XHRwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpLFxyXG5cdFx0ZmlsZW5hbWU6ICdjbGllbnQuYnVuZGxlLmpzeCcsXHJcblx0fSxcclxuXHRkZXZ0b29sOiAnaW5saW5lLXNvdXJjZS1tYXAnLFxyXG5cdGVudHJ5OiB7XHJcblx0XHRhcHA6ICcuL2Zyb250ZW5kL3NyYy9pbmRleC5qc3gnLFxyXG5cdH0sXHJcblx0cmVzb2x2ZToge1xyXG5cdFx0ZXh0ZW5zaW9uczogWycuanMnLCAnLmpzeCddLFxyXG5cdFx0bW9kdWxlczogW1xyXG5cdFx0XHQnLi9mcm9udGVuZCcsXHJcblx0XHRcdCdub2RlX21vZHVsZXMnLFxyXG5cdFx0XSxcclxuXHR9LFxyXG5cdG1vZHVsZToge1xyXG5cdFx0cnVsZXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRlc3Q6IC9cXC5qc3g/JC8sXHJcblx0XHRcdFx0ZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sXHJcblx0XHRcdFx0dXNlOiB7XHJcblx0XHRcdFx0XHRsb2FkZXI6ICdiYWJlbC1sb2FkZXInLFxyXG5cdFx0XHRcdFx0b3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHRwcmVzZXRzOiBbXHJcblx0XHRcdFx0XHRcdFx0J0BiYWJlbC9yZWFjdCcsXHJcblx0XHRcdFx0XHRcdFx0J0BiYWJlbC9lbnYnXHJcblx0XHRcdFx0XHRcdF0sXHJcblx0XHRcdFx0XHRcdHBsdWdpbnM6IFsnQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJ11cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0ZXN0OiAvXFwuaHRtbCQvLFxyXG5cdFx0XHRcdHVzZTogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRsb2FkZXI6IFwiaHRtbC1sb2FkZXJcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cdH0sXHJcblxyXG5cdHBsdWdpbnM6IFtcclxuXHRcdC8vIG5ldyBDbGVhbldlYnBhY2tQbHVnaW4oWydkaXN0J10sIHtcclxuXHRcdC8vIFx0ZXhjbHVkZTogWydpbmRleC5odG1sJ11cclxuXHRcdC8vIH0pLFxyXG5cdFx0bmV3IEh0bWxXZWJwYWNrUGx1Z2luKHtcclxuXHRcdFx0dGl0bGU6ICd0ZXN0JyxcclxuXHRcdFx0dGVtcGxhdGU6ICcuL2Rpc3QvaW5kZXguaHRtbCcsXHJcblx0XHR9KSxcclxuXHRdXHJcbn07XHJcblxyXG5cclxuY29uc3Qgc2VydmVyQ29uZmlnID0ge1xyXG5cdHRhcmdldDogJ25vZGUnLFxyXG5cdG1vZGU6ICdkZXZlbG9wbWVudCcsXHJcblx0b3V0cHV0OiB7XHJcblx0XHRwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpLFxyXG5cdFx0ZmlsZW5hbWU6ICdzZXJ2ZXIuYnVuZGxlLmpzJyxcclxuXHRcdHB1YmxpY1BhdGg6ICcvJ1xyXG5cdH0sXHJcblx0ZXh0ZXJuYWxzOiBbbm9kZUV4dGVybmFscygpXSxcclxuXHRkZXZ0b29sOiAnaW5saW5lLXNvdXJjZS1tYXAnLFxyXG5cdGVudHJ5OiB7XHJcblx0XHRhcHA6ICcuL2JhY2tlbmQvc3JjL3NlcnZlci5qcydcclxuXHR9LFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbY2xpZW50Q29uZmlnLCBzZXJ2ZXJDb25maWddOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsZWFuLXdlYnBhY2stcGx1Z2luXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHRtbC13ZWJwYWNrLXBsdWdpblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBvc3Rjc3MtY3NzbmV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwb3N0Y3NzLWZvY3VzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBvc3Rjc3MtcmVwb3J0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VicGFja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWRldi1taWRkbGV3YXJlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stbm9kZS1leHRlcm5hbHNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==