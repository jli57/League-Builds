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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/config/keys.js":
/*!***********************************!*\
  !*** ./src/server/config/keys.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {    
    mongoURI:'mongodb://lljruffin:password1@ds050077.mlab.com:50077/league_builds',
}

/***/ }),

/***/ "./src/server/errors/HttpError.js":
/*!****************************************!*\
  !*** ./src/server/errors/HttpError.js ***!
  \****************************************/
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

/***/ "./src/server/models/session.js":
/*!**************************************!*\
  !*** ./src/server/models/session.js ***!
  \**************************************/
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

/***/ "./src/server/models/user.js":
/*!***********************************!*\
  !*** ./src/server/models/user.js ***!
  \***********************************/
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

/***/ "./src/server/routes/api/user-routes.js":
/*!**********************************************!*\
  !*** ./src/server/routes/api/user-routes.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const router = express.Router();
const UserController = __webpack_require__(/*! ../controller/user-controller */ "./src/server/routes/controller/user-controller.js");

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

/***/ "./src/server/routes/controller/user-controller.js":
/*!*********************************************************!*\
  !*** ./src/server/routes/controller/user-controller.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const UserService = __webpack_require__(/*! ../services/user-service */ "./src/server/routes/services/user-service.js");
const SessionService = __webpack_require__(/*! ../services/session-service */ "./src/server/routes/services/session-service.js");
const MessageService = __webpack_require__(/*! ../services/messages-service */ "./src/server/routes/services/messages-service.js");
const HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./src/server/errors/HttpError.js");

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

/***/ "./src/server/routes/services/messages-service.js":
/*!********************************************************!*\
  !*** ./src/server/routes/services/messages-service.js ***!
  \********************************************************/
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

/***/ "./src/server/routes/services/session-service.js":
/*!*******************************************************!*\
  !*** ./src/server/routes/services/session-service.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Session = __webpack_require__(/*! ../../models/session */ "./src/server/models/session.js");

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

/***/ "./src/server/routes/services/user-service.js":
/*!****************************************************!*\
  !*** ./src/server/routes/services/user-service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const User = __webpack_require__(/*! ../../models/user */ "./src/server/models/user.js");

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

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
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
const db = __webpack_require__(/*! ./config/keys */ "./src/server/config/keys.js").mongoURI;
const webpack = __webpack_require__(/*! webpack */ "webpack");
const webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");
const webpackConfig = __webpack_require__(/*! ../../webpack.config.server.js */ "./webpack.config.server.js");
const webpackCompiler = webpack(webpackConfig);
const root = path.resolve();

// connect to mongo using mongooseo
mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDb connected...'))
	.catch(err => console.log(err));

const userRoutes = __webpack_require__(/*! ./routes/api/user-routes */ "./src/server/routes/api/user-routes.js");

// declare express
const app = express();

// use webpack-dev-middleware if in development mode
if ("development".trim() === 'development') {
	console.log('running in development mode...');
	app.use(webpackDevMiddleware(webpackCompiler, {
		publicPath: '/'
	}));
} else {
	console.log('running in production mode...');
}

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
app.get('/', (req, res) => {
	res.sendFile('dist/index.html', { root: path.resolve() });
});

// routes 
app.use('/user', userRoutes);

// set up port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`);
})
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./webpack.config.server.js":
/*!**********************************!*\
  !*** ./webpack.config.server.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");


module.exports = {
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
		app: './src/server/server.js'
	},
};

/* WEBPACK VAR INJECTION */}.call(this, "/"))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb25maWcva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2Vycm9ycy9IdHRwRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvc2Vzc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2FwaS91c2VyLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9jb250cm9sbGVyL3VzZXItY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9zZXJ2aWNlcy9tZXNzYWdlcy1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3NlcnZpY2VzL3Nlc3Npb24tc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9zZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2VicGFjay5jb25maWcuc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlYnBhY2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLWRldi1taWRkbGV3YXJlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2VicGFjay1ub2RlLWV4dGVybmFsc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxrQjtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLO0FBQ0E7O0FBRUEsMkI7Ozs7Ozs7Ozs7O0FDYkEsaUJBQWlCLG1CQUFPLENBQUMsMEJBQVU7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSxp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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0Esa0NBQWtDLHVCQUF1QjtBQUN6RCxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdCQUFnQjtBQUN2RCxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ3JGRCw0REFBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkIsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLHNCQUFzQixtQkFBTyxDQUFDLHNEQUF3Qjs7O0FBR3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7O0FDbEJBLHFDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLG1EIiwiZmlsZSI6InNlcnZlci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyL3NlcnZlci5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0geyAgICBcclxuICAgIG1vbmdvVVJJOidtb25nb2RiOi8vbGxqcnVmZmluOnBhc3N3b3JkMUBkczA1MDA3Ny5tbGFiLmNvbTo1MDA3Ny9sZWFndWVfYnVpbGRzJyxcclxufSIsImNsYXNzIEh0dHBFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0YXR1c0NvZGUsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIHN1cGVyKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTWFpbnRhaW5zIHByb3BlciBzdGFjayB0cmFjZSBmb3Igd2hlcmUgb3VyIGVycm9yIHdhcyB0aHJvd24gKG9ubHkgYXZhaWxhYmxlIG9uIFY4KVxyXG4gICAgICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBIdHRwRXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSHR0cEVycm9yOyIsImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmNvbnN0IFNlc3Npb25TY2hlbWEgPSBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgdXNlcklkIDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBpbmRleDogdHJ1ZVxyXG4gICAgfSxcclxufSk7XHJcblxyXG5jb25zdCBTZXNzaW9uID0gbW9kdWxlLmV4cG9ydHMgPSBtb25nb29zZS5tb2RlbCgnU2Vzc2lvbicsIFNlc3Npb25TY2hlbWEpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IFNlc3Npb24oe3VzZXJJZDogaWR9KTtcclxuICAgIHJldHVybiBhd2FpdCBzZXNzaW9uLnNhdmUoKTtcclxufSIsImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0anMnKTtcclxuXHJcbmNvbnN0IFVzZXJTY2hlbWEgPSBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgdXNlcm5hbWU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgaW5kZXg6IHRydWVcclxuICAgIH0sXHJcbiAgICBwYXNzd29yZDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIGVtYWlsOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIFxyXG59KTtcclxuXHJcbmNvbnN0IFVzZXIgPSBtb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVVc2VyID0gYXN5bmMgKG5ld1VzZXIpID0+IHtcclxuICAgIG5ld1VzZXIucGFzc3dvcmQgPSBhd2FpdCBVc2VyLmdlbmVyYXRlUGFzc3dvcmQobmV3VXNlci5wYXNzd29yZCk7XHJcbiAgICByZXR1cm4gYXdhaXQgbmV3VXNlci5zYXZlKCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZW5lcmF0ZVBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkKSA9PiB7XHJcbiAgICBjb25zdCBzYWx0ID0gYXdhaXQgYmNyeXB0LmdlblNhbHQoMTApO1xyXG4gICAgcmV0dXJuIGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCBzYWx0KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldFVzZXJCeVByb3BlcnR5ID0gYXN5bmMgKHByb3BlcnR5KSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kT25lKHByb3BlcnR5KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIChwYXNzd29yZCwgaGFzaCkgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBoYXNoKTtcclxufSIsImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNvbnN0IFVzZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi4vY29udHJvbGxlci91c2VyLWNvbnRyb2xsZXInKTtcclxuXHJcbnJvdXRlci5wb3N0KCcvcmVnaXN0ZXInLCAocmVxLCByZXMpID0+IHtcclxuICAgIFVzZXJDb250cm9sbGVyLnJlZ2lzdGVyKHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG4vLyByZXRyaWV2ZSB1c2VyXHJcbnJvdXRlci5nZXQoJy9zZXNzaW9uLzppZCcsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgVXNlckNvbnRyb2xsZXIucmV0cmlldmVVc2VyKHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG4vLyB1cGRhdGUgdXNlclxyXG5yb3V0ZXIucG9zdChcIi91cGRhdGUvOmlkXCIsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgVXNlckNvbnRyb2xsZXIudXBkYXRlKHJlcSwgcmVzKTtcclxufSk7XHJcblxyXG4vLyBkZWxldGUgdXNlclxyXG5yb3V0ZXIuZGVsZXRlKCcvZGVsZXRlLzppZCcsIChyZXEsIHJlcykgPT4geyAgICBcclxuICAgIFVzZXJDb250cm9sbGVyLmRlbGV0ZUFjY291bnQocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbi8vIGNvbmZpcm0gcGFzc3dvcmRcclxucm91dGVyLnBvc3QoXCIvdmFsaWRhdGVcIiwgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBVc2VyQ29udHJvbGxlci52YWxpZGF0ZShyZXEsIHJlcyk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgVXNlckNvbnRyb2xsZXIubG9naW4ocmVxLCByZXMpO1xyXG59KTtcclxuICAgICAgICBcclxuXHJcbnJvdXRlci5kZWxldGUoJy9sb2dvdXQvOmlkJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBVc2VyQ29udHJvbGxlci5sb2dvdXQocmVxLCByZXMpO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyOyIsImNvbnN0IFVzZXJTZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlJyk7XHJcbmNvbnN0IFNlc3Npb25TZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvc2Vzc2lvbi1zZXJ2aWNlJyk7XHJcbmNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0gcmVxdWlyZSgnLi4vc2VydmljZXMvbWVzc2FnZXMtc2VydmljZScpO1xyXG5jb25zdCBIdHRwRXJyb3IgPSByZXF1aXJlKCcuLi8uLi9lcnJvcnMvSHR0cEVycm9yJyk7XHJcblxyXG5jb25zdCBVc2VyQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCByZWdpc3RlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeUVtYWlsKHJlcS5ib2R5LmZvcm0uZW1haWwpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtOiAnZW1haWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogTWVzc2FnZVNlcnZpY2UuRU1BSUxfNDA2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeVVzZXJuYW1lKHJlcS5ib2R5LmZvcm0udXNlcm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtOiAndXNlcm5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZzogTWVzc2FnZVNlcnZpY2UuVVNFUk5BTUVfNDA2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDYsIGVycm9ycyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlclNlcnZpY2UucmVnaXN0ZXJVc2VyKHJlcS5ib2R5LmZvcm0pO1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuY3JlYXRlU2Vzc2lvbih1c2VyLl9pZCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHNlc3Npb246IHNlc3Npb24uX2lkIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcnM6IGV4Lm1zZyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZXRyaWV2ZVVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuZ2V0U2Vzc2lvbihyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgaWYgKCFzZXNzaW9uKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDQsIE1lc3NhZ2VTZXJ2aWNlLlNFU1NJT05fNDA0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlclNlcnZpY2UuZ2V0VXNlckJ5SWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgICAgICBpZiAoIXVzZXIpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKDQwNCwgTWVzc2FnZVNlcnZpY2UuVVNFUl80MDQpO1xyXG5cclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiBVc2VyU2VydmljZS5yZW1vdmVQcml2YXRlKHVzZXIpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IGxvZ2luID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvblNlcnZpY2UuY3JlYXRlU2Vzc2lvbih1c2VyLl9pZCk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc2Vzc2lvbjogc2Vzc2lvbi5faWQgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yOiBleC5tc2cgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBsb2dvdXQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCBTZXNzaW9uU2VydmljZS5kZWxldGVTZXNzaW9uKHJlcS5wYXJhbXMuaWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5TRVNTSU9OXzQwNCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7fSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yOiBleC5tc2cgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWxldGVBY2NvdW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBpZiAoIShhd2FpdCBTZXNzaW9uU2VydmljZS5kZWxldGVTZXNzaW9uKHJlcS5wYXJhbXMuaWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5TRVNTSU9OXzQwNCk7XHJcbiAgICAgICAgICAgIGlmICghKGF3YWl0IFVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIodXNlci5faWQpKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoNDA0LCBNZXNzYWdlU2VydmljZS5VU0VSXzQwNCk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7fSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhleC5zdGF0dXNDb2RlIHx8IDUwMCkuanNvbih7IGVycm9yczogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdXBkYXRlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHZhbGlkYXRlVXNlcihyZXEpO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IFVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlciwgcmVxLmJvZHkuZm9ybSk7XHJcblxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXI6IFVzZXJTZXJ2aWNlLnJlbW92ZVByaXZhdGUodXBkYXRlZFVzZXIpIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoZXguc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oeyBlcnJvcjogZXgubXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHZhbGlkYXRlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdmFsaWRhdGVVc2VyKHJlcSk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcclxuICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKGV4LnN0YXR1c0NvZGUgfHwgNTAwKS5qc29uKHsgZXJyb3I6IGV4Lm1zZyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB2YWxpZGF0ZVVzZXIgPSBhc3luYyAocmVxKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJTZXJ2aWNlLmdldFVzZXJCeVVzZXJuYW1lKHJlcS5ib2R5LmZvcm0udXNlcm5hbWUpO1xyXG4gICAgICAgIGlmICghKHVzZXIgJiYgKGF3YWl0IFVzZXJTZXJ2aWNlLnZhbGlkYXRlUGFzc3dvcmQodXNlciwgcmVxLmJvZHkuZm9ybS5wYXNzd29yZCkpKSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcig0MDEsIE1lc3NhZ2VTZXJ2aWNlLkxPR0lOXzQwMSk7XHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxyXG4gICAgICAgIGxvZ2luOiBsb2dpbixcclxuICAgICAgICBsb2dvdXQ6IGxvZ291dCxcclxuICAgICAgICByZXRyaWV2ZVVzZXI6IHJldHJpZXZlVXNlcixcclxuICAgICAgICBkZWxldGVBY2NvdW50OiBkZWxldGVBY2NvdW50LFxyXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcclxuICAgIH1cclxufSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyQ29udHJvbGxlcjsiLCJjb25zdCBNZXNzYWdlU2VydmljZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBFTUFJTF80MDY6ICdFbWFpbCBpcyBhbHJlYWR5IGluIHVzZScsXHJcbiAgICAgICAgVVNFUk5BTUVfNDA2OiAnVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgIFNFU1NJT05fNDA0OiAnWW91IGFyZSBub3QgbG9nZ2VkIGluJyxcclxuICAgICAgICBVU0VSXzQwNDogJ1RoaXMgdXNlciBkb2VzIG5vdCBleGlzdCcsXHJcbiAgICAgICAgTE9HSU5fNDAxOiAnSW52YWxpZCB1c2VybmFtZS9wYXNzd29yZCdcclxuICAgIH07XHJcbn0oKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZVNlcnZpY2U7IiwiY29uc3QgU2Vzc2lvbiA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9zZXNzaW9uJyk7XHJcblxyXG5jb25zdCBTZXNzaW9uU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGdldFNlc3Npb24gPSBhc3luYyAoaWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgU2Vzc2lvbi5maW5kQnlJZChpZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRlbGV0ZVNlc3Npb24gPSBhc3luYyAoc2Vzc2lvbl9pZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBTZXNzaW9uLmZpbmRCeUlkQW5kRGVsZXRlKHNlc3Npb25faWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVNlc3Npb24gPSBhc3luYyAodXNlcklkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFNlc3Npb24uY3JlYXRlKHVzZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTZXNzaW9uOiBnZXRTZXNzaW9uLFxyXG4gICAgICAgIGRlbGV0ZVNlc3Npb246IGRlbGV0ZVNlc3Npb24sXHJcbiAgICAgICAgY3JlYXRlU2Vzc2lvbjogY3JlYXRlU2Vzc2lvblxyXG4gICAgfVxyXG59KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25TZXJ2aWNlOyIsImNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvdXNlcicpO1xyXG5cclxuY29uc3QgVXNlclNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZ2V0VXNlckJ5VXNlcm5hbWUgPSBhc3luYyAodXNlcm5hbWUpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5nZXRVc2VyQnlQcm9wZXJ0eSh7IHVzZXJuYW1lOiB1c2VybmFtZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ2V0VXNlckJ5RW1haWwgPSBhc3luYyAoZW1haWwpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5nZXRVc2VyQnlQcm9wZXJ0eSh7IGVtYWlsOiBlbWFpbCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVnaXN0ZXJVc2VyID0gYXN5bmMgKGZvcm0pID0+IHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBhd2FpdCBVc2VyLmNyZWF0ZVVzZXIobmV3IFVzZXIoe1xyXG4gICAgICAgICAgICB1c2VybmFtZTogZm9ybS51c2VybmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IGZvcm0ucGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGVtYWlsOiBmb3JtLmVtYWlsLFxyXG4gICAgICAgICAgICBuYW1lOiBmb3JtLm5hbWVcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHZhbGlkYXRlUGFzc3dvcmQgPSBhc3luYyAodXNlciwgcGFzc3dvcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cGRhdGVVc2VyID0gYXN5bmMgKHVzZXIsIGZvcm0pID0+IHtcclxuICAgICAgICBpZiAoZm9ybS5uZXdVc2VybmFtZSlcclxuICAgICAgICAgICAgdXNlci51c2VybmFtZSA9IGZvcm0ubmV3VXNlcm5hbWU7XHJcbiAgICAgICAgaWYgKGZvcm0ubmV3UGFzc3dvcmQpXHJcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBhd2FpdCBVc2VyLmdlbmVyYXRlUGFzc3dvcmQoZm9ybS5uZXdQYXNzd29yZCk7XHJcbiAgICAgICAgaWYgKGZvcm0ubmV3RW1haWwpXHJcbiAgICAgICAgICAgIHVzZXIuZW1haWwgPSBmb3JtLm5ld0VtYWlsO1xyXG4gICAgICAgIGlmIChmb3JtLm5ld05hbWUpXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSA9IGZvcm0ubmV3TmFtZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZE9uZUFuZFVwZGF0ZSh7IF9pZDogdXNlci5faWQgfSwgdXNlciwgeyBuZXc6IHRydWUgfSlcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbW92ZVByaXZhdGUgPSAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdldFVzZXJCeUlkID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFVzZXIuZmluZEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWxldGVVc2VyID0gYXN5bmMgKHVzZXJfaWQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgVXNlci5maW5kQnlJZEFuZERlbGV0ZSh1c2VyX2lkKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRVc2VyQnlJZDogZ2V0VXNlckJ5SWQsXHJcbiAgICAgICAgZ2V0VXNlckJ5VXNlcm5hbWU6IGdldFVzZXJCeVVzZXJuYW1lLFxyXG4gICAgICAgIGdldFVzZXJCeUVtYWlsOiBnZXRVc2VyQnlFbWFpbCxcclxuICAgICAgICByZWdpc3RlclVzZXI6IHJlZ2lzdGVyVXNlcixcclxuICAgICAgICBkZWxldGVVc2VyOiBkZWxldGVVc2VyLFxyXG4gICAgICAgIHVwZGF0ZVVzZXI6IHVwZGF0ZVVzZXIsXHJcbiAgICAgICAgcmVtb3ZlUHJpdmF0ZTogcmVtb3ZlUHJpdmF0ZSxcclxuICAgICAgICB2YWxpZGF0ZVBhc3N3b3JkOiB2YWxpZGF0ZVBhc3N3b3JkLFxyXG4gICAgfVxyXG59KCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJTZXJ2aWNlOyIsImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbmNvbnN0IGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoJ2Nvb2tpZS1wYXJzZXInKTtcclxuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XHJcbmNvbnN0IGV4cHJlc3NWYWxpZGF0b3IgPSByZXF1aXJlKCdleHByZXNzLXZhbGlkYXRvcicpO1xyXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnZXhwcmVzcy1zZXNzaW9uJyk7XHJcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcclxuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vY29uZmlnL2tleXMnKS5tb25nb1VSSTtcclxuY29uc3Qgd2VicGFjayA9IHJlcXVpcmUoJ3dlYnBhY2snKTtcclxuY29uc3Qgd2VicGFja0Rldk1pZGRsZXdhcmUgPSByZXF1aXJlKCd3ZWJwYWNrLWRldi1taWRkbGV3YXJlJyk7XHJcbmNvbnN0IHdlYnBhY2tDb25maWcgPSByZXF1aXJlKCcuLi8uLi93ZWJwYWNrLmNvbmZpZy5zZXJ2ZXIuanMnKTtcclxuY29uc3Qgd2VicGFja0NvbXBpbGVyID0gd2VicGFjayh3ZWJwYWNrQ29uZmlnKTtcclxuY29uc3Qgcm9vdCA9IHBhdGgucmVzb2x2ZSgpO1xyXG5cclxuLy8gY29ubmVjdCB0byBtb25nbyB1c2luZyBtb25nb29zZW9cclxubW9uZ29vc2UuY29ubmVjdChkYiwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSlcclxuXHQudGhlbigoKSA9PiBjb25zb2xlLmxvZygnTW9uZ29EYiBjb25uZWN0ZWQuLi4nKSlcclxuXHQuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG5cclxuY29uc3QgdXNlclJvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzL2FwaS91c2VyLXJvdXRlcycpO1xyXG5cclxuLy8gZGVjbGFyZSBleHByZXNzXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuXHJcbi8vIHVzZSB3ZWJwYWNrLWRldi1taWRkbGV3YXJlIGlmIGluIGRldmVsb3BtZW50IG1vZGVcclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WLnRyaW0oKSA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG5cdGNvbnNvbGUubG9nKCdydW5uaW5nIGluIGRldmVsb3BtZW50IG1vZGUuLi4nKTtcclxuXHRhcHAudXNlKHdlYnBhY2tEZXZNaWRkbGV3YXJlKHdlYnBhY2tDb21waWxlciwge1xyXG5cdFx0cHVibGljUGF0aDogJy8nXHJcblx0fSkpO1xyXG59IGVsc2Uge1xyXG5cdGNvbnNvbGUubG9nKCdydW5uaW5nIGluIHByb2R1Y3Rpb24gbW9kZS4uLicpO1xyXG59XHJcblxyXG4vLyBib2R5IHBhcnNlciBtaWRkbGV3YXJlXHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XHJcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xyXG5cclxuLy8gc2V0IHN0YXRpYyBmb2xkZXJcclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljJykpKTtcclxuXHJcbi8vIGV4cHJlc3Mgc2Vzc2lvblxyXG5hcHAudXNlKHNlc3Npb24oe1xyXG5cdHNlY3JldDogJ3NlY3JldCcsXHJcblx0c2F2ZVVuaXRpYWxpemVkOiB0cnVlLFxyXG5cdHJlc2F2ZTogdHJ1ZVxyXG59KSlcclxuXHJcbi8vIHBhc3Nwb3J0IGluaXRcclxuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xyXG5hcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XHJcblxyXG4vLyBleHByZXNzIHZhbGlkYXRvciwgdGFrZW4gZnJvbSBnaXRodWJcclxuYXBwLnVzZShleHByZXNzVmFsaWRhdG9yKHtcclxuXHRlcnJvckZvcm1hdHRlcjogKHBhcmFtLCBtc2csIHZhbHVlKSA9PiB7XHJcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBwYXJhbS5zcGxpdCgnLicpLFxyXG5cdFx0XHRyb290ID0gbmFtZXNwYWNlLnNoaWZ0KDApLFxyXG5cdFx0XHRmb3JtUGFyYW0gPSByb290O1xyXG5cclxuXHRcdHdoaWxlIChuYW1lc3BhY2UubGVuZ3RoKSB7XHJcblx0XHRcdGZvcm1QYXJhbSArPSAnWycgKyBuYW1lc3BhY2Uuc2hpZnQoKSArICddJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRwYXJhbTogZm9ybVBhcmFtLFxyXG5cdFx0XHRtc2c6IG1zZyxcclxuXHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHR9O1xyXG5cdH1cclxufSkpO1xyXG5cclxuLy8gcmVuZGVyIHRoZSBtYWluIHBhZ2VcclxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xyXG5cdHJlcy5zZW5kRmlsZSgnZGlzdC9pbmRleC5odG1sJywgeyByb290OiBwYXRoLnJlc29sdmUoKSB9KTtcclxufSk7XHJcblxyXG4vLyByb3V0ZXMgXHJcbmFwcC51c2UoJy91c2VyJywgdXNlclJvdXRlcyk7XHJcblxyXG4vLyBzZXQgdXAgcG9ydFxyXG5hcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgODAwMCkpO1xyXG5hcHAubGlzdGVuKGFwcC5nZXQoJ3BvcnQnKSwgKCkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKGBTZXJ2ZXIgc3RhcnRlZCBvbiBwb3J0ICR7YXBwLmdldCgncG9ydCcpfWApO1xyXG59KSIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuY29uc3Qgbm9kZUV4dGVybmFscyA9IHJlcXVpcmUoJ3dlYnBhY2stbm9kZS1leHRlcm5hbHMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHR0YXJnZXQ6ICdub2RlJyxcclxuXHRtb2RlOiAnZGV2ZWxvcG1lbnQnLFxyXG5cdG91dHB1dDoge1xyXG5cdFx0cGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKSxcclxuXHRcdGZpbGVuYW1lOiAnc2VydmVyLmJ1bmRsZS5qcycsXHJcblx0XHRwdWJsaWNQYXRoOiAnLydcclxuXHR9LFxyXG5cdGV4dGVybmFsczogW25vZGVFeHRlcm5hbHMoKV0sXHJcblx0ZGV2dG9vbDogJ2lubGluZS1zb3VyY2UtbWFwJyxcclxuXHRlbnRyeToge1xyXG5cdFx0YXBwOiAnLi9zcmMvc2VydmVyL3NlcnZlci5qcydcclxuXHR9LFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VicGFja1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWRldi1taWRkbGV3YXJlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stbm9kZS1leHRlcm5hbHNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==