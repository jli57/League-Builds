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
/******/ 	__webpack_require__.p = "";
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
  mongoURI: 'mongodb://lljruffin:password1@ds050077.mlab.com:50077/league_builds'
};

/***/ }),

/***/ "./src/server/errors/HttpError.js":
/*!****************************************!*\
  !*** ./src/server/errors/HttpError.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HttpError =
/*#__PURE__*/
function (_Error) {
  _inherits(HttpError, _Error);

  function HttpError(statusCode) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HttpError);

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HttpError)).call.apply(_getPrototypeOf2, [this].concat(params))); // Maintains proper stack trace for where our error was thrown (only available on V8)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this)), HttpError);
    }

    _this.statusCode = statusCode;
    return _this;
  }

  return HttpError;
}(_wrapNativeSuper(Error));

module.exports = HttpError;

/***/ }),

/***/ "./src/server/models/session.js":
/*!**************************************!*\
  !*** ./src/server/models/session.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var SessionSchema = mongoose.Schema({
  userId: {
    type: String,
    index: true
  }
});
var Session = module.exports = mongoose.model('Session', SessionSchema);

module.exports.create =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var session;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            session = new Session({
              userId: id
            });
            _context.next = 3;
            return session.save();

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/server/models/user.js":
/*!***********************************!*\
  !*** ./src/server/models/user.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");

var UserSchema = mongoose.Schema({
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
  }
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(newUser) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.generatePassword(newUser.password);

          case 2:
            newUser.password = _context.sent;
            _context.next = 5;
            return newUser.save();

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.generatePassword =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return bcrypt.genSalt(10);

          case 2:
            salt = _context2.sent;
            _context2.next = 5;
            return bcrypt.hash(password, salt);

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.getUserByProperty =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(property) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne(property);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.comparePassword =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(password, hash) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return bcrypt.compare(password, hash);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/server/routes/api/user-routes.js":
/*!**********************************************!*\
  !*** ./src/server/routes/api/user-routes.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(/*! express */ "express");

var router = express.Router();

var UserController = __webpack_require__(/*! ../controller/user-controller */ "./src/server/routes/controller/user-controller.js");

router.post('/register', function (req, res) {
  UserController.register(req, res);
}); // retrieve user

router.get('/session/:id', function (req, res) {
  UserController.retrieveUser(req, res);
}); // update user

router.post("/update/:id", function (req, res) {
  UserController.update(req, res);
}); // delete user

router.delete('/delete/:id', function (req, res) {
  UserController.deleteAccount(req, res);
}); // confirm password

router.post("/validate", function (req, res) {
  UserController.validate(req, res);
});
router.post('/login', function (req, res) {
  UserController.login(req, res);
});
router.delete('/logout/:id', function (req, res) {
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserService = __webpack_require__(/*! ../services/user-service */ "./src/server/routes/services/user-service.js");

var SessionService = __webpack_require__(/*! ../services/session-service */ "./src/server/routes/services/session-service.js");

var MessageService = __webpack_require__(/*! ../services/messages-service */ "./src/server/routes/services/messages-service.js");

var HttpError = __webpack_require__(/*! ../../errors/HttpError */ "./src/server/errors/HttpError.js");

var UserController = function () {
  var register =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var errors, user, session;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              errors = [];
              _context.next = 4;
              return UserService.getUserByEmail(req.body.form.email);

            case 4:
              if (!_context.sent) {
                _context.next = 6;
                break;
              }

              errors.push({
                param: 'email',
                msg: MessageService.EMAIL_406
              });

            case 6:
              _context.next = 8;
              return UserService.getUserByUsername(req.body.form.username);

            case 8:
              if (!_context.sent) {
                _context.next = 10;
                break;
              }

              errors.push({
                param: 'username',
                msg: MessageService.USERNAME_406
              });

            case 10:
              if (!(errors.length > 0)) {
                _context.next = 12;
                break;
              }

              throw new HttpError(406, errors);

            case 12:
              _context.next = 14;
              return UserService.registerUser(req.body.form);

            case 14:
              user = _context.sent;
              _context.next = 17;
              return SessionService.createSession(user._id);

            case 17:
              session = _context.sent;
              res.status(201).json({
                session: session._id
              });
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              res.status(_context.t0.statusCode || 500).json({
                errors: _context.t0.msg
              });

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 21]]);
    }));

    return function register(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var retrieveUser =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var session, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return SessionService.getSession(req.params.id);

            case 3:
              session = _context2.sent;

              if (session) {
                _context2.next = 6;
                break;
              }

              throw new HttpError(404, MessageService.SESSION_404);

            case 6:
              _context2.next = 8;
              return UserService.getUserById(session.userId);

            case 8:
              user = _context2.sent;

              if (user) {
                _context2.next = 11;
                break;
              }

              throw new HttpError(404, MessageService.USER_404);

            case 11:
              res.status(200).json({
                user: UserService.removePrivate(user)
              });
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              res.status(_context2.t0.statusCode || 500).json({
                errors: _context2.t0.msg
              });

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 14]]);
    }));

    return function retrieveUser(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var login =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var user, session;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return validateUser(req);

            case 3:
              user = _context3.sent;
              _context3.next = 6;
              return SessionService.createSession(user._id);

            case 6:
              session = _context3.sent;
              res.status(201).json({
                session: session._id
              });
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              res.status(_context3.t0.statusCode || 500).json({
                error: _context3.t0.msg
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 10]]);
    }));

    return function login(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var logout =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return SessionService.deleteSession(req.params.id);

            case 3:
              if (_context4.sent) {
                _context4.next = 5;
                break;
              }

              throw new HttpError(404, MessageService.SESSION_404);

            case 5:
              res.status(200).json({});
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              res.status(_context4.t0.statusCode || 500).json({
                error: _context4.t0.msg
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 8]]);
    }));

    return function logout(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteAccount =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return validateUser(req);

            case 3:
              user = _context5.sent;
              _context5.next = 6;
              return SessionService.deleteSession(req.params.id);

            case 6:
              if (_context5.sent) {
                _context5.next = 8;
                break;
              }

              throw new HttpError(404, MessageService.SESSION_404);

            case 8:
              _context5.next = 10;
              return UserService.deleteUser(user._id);

            case 10:
              if (_context5.sent) {
                _context5.next = 12;
                break;
              }

              throw new HttpError(404, MessageService.USER_404);

            case 12:
              res.status(200).json({});
              _context5.next = 18;
              break;

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](0);
              res.status(_context5.t0.statusCode || 500).json({
                errors: _context5.t0.msg
              });

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 15]]);
    }));

    return function deleteAccount(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var update =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var user, updatedUser;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return validateUser(req);

            case 3:
              user = _context6.sent;
              _context6.next = 6;
              return UserService.updateUser(user, req.body.form);

            case 6:
              updatedUser = _context6.sent;
              res.status(200).json({
                user: UserService.removePrivate(updatedUser)
              });
              _context6.next = 13;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              res.status(_context6.t0.statusCode || 500).json({
                error: _context6.t0.msg
              });

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 10]]);
    }));

    return function update(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var validate =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return validateUser(req);

            case 3:
              res.status(200).json({});
              _context7.next = 9;
              break;

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);
              res.status(_context7.t0.statusCode || 500).json({
                error: _context7.t0.msg
              });

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 6]]);
    }));

    return function validate(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var validateUser =
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req) {
      var user;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return UserService.getUserByUsername(req.body.form.username);

            case 2:
              user = _context8.sent;
              _context8.t0 = user;

              if (!_context8.t0) {
                _context8.next = 8;
                break;
              }

              _context8.next = 7;
              return UserService.validatePassword(user, req.body.form.password);

            case 7:
              _context8.t0 = _context8.sent;

            case 8:
              if (_context8.t0) {
                _context8.next = 10;
                break;
              }

              throw new HttpError(401, MessageService.LOGIN_401);

            case 10:
              return _context8.abrupt("return", user);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function validateUser(_x15) {
      return _ref8.apply(this, arguments);
    };
  }();

  return {
    register: register,
    login: login,
    logout: logout,
    retrieveUser: retrieveUser,
    deleteAccount: deleteAccount,
    update: update,
    validate: validate
  };
}();

module.exports = UserController;

/***/ }),

/***/ "./src/server/routes/services/messages-service.js":
/*!********************************************************!*\
  !*** ./src/server/routes/services/messages-service.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var MessageService = function () {
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Session = __webpack_require__(/*! ../../models/session */ "./src/server/models/session.js");

var SessionService = function () {
  var getSession =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Session.findById(id);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getSession(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var deleteSession =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(session_id) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Session.findByIdAndDelete(session_id);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function deleteSession(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createSession =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(userId) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Session.create(userId);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function createSession(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    getSession: getSession,
    deleteSession: deleteSession,
    createSession: createSession
  };
}();

module.exports = SessionService;

/***/ }),

/***/ "./src/server/routes/services/user-service.js":
/*!****************************************************!*\
  !*** ./src/server/routes/services/user-service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = __webpack_require__(/*! ../../models/user */ "./src/server/models/user.js");

var UserService = function () {
  var getUserByUsername =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(username) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return User.getUserByProperty({
                username: username
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getUserByUsername(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getUserByEmail =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(email) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return User.getUserByProperty({
                email: email
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getUserByEmail(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var registerUser =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(form) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return User.createUser(new User({
                username: form.username,
                password: form.password,
                email: form.email,
                name: form.name
              }));

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function registerUser(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var validatePassword =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(user, password) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return User.comparePassword(password, user.password);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function validatePassword(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  var updateUser =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(user, form) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (form.newUsername) user.username = form.newUsername;

              if (!form.newPassword) {
                _context5.next = 5;
                break;
              }

              _context5.next = 4;
              return User.generatePassword(form.newPassword);

            case 4:
              user.password = _context5.sent;

            case 5:
              if (form.newEmail) user.email = form.newEmail;
              if (form.newName) user.name = form.newName;
              _context5.next = 9;
              return User.findOneAndUpdate({
                _id: user._id
              }, user, {
                new: true
              });

            case 9:
              return _context5.abrupt("return", _context5.sent);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function updateUser(_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  var removePrivate = function removePrivate(user) {
    return {
      username: user.username,
      email: user.email,
      name: user.name
    };
  };

  var getUserById =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return User.findById(id);

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function getUserById(_x8) {
      return _ref6.apply(this, arguments);
    };
  }();

  var deleteUser =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(user_id) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return User.findByIdAndDelete(user_id);

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function deleteUser(_x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  return {
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    getUserByEmail: getUserByEmail,
    registerUser: registerUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    removePrivate: removePrivate,
    validatePassword: validatePassword
  };
}();

module.exports = UserService;

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var express = __webpack_require__(/*! express */ "express");

var path = __webpack_require__(/*! path */ "path");

var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");

var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

var expressValidator = __webpack_require__(/*! express-validator */ "express-validator");

var session = __webpack_require__(/*! express-session */ "express-session");

var passport = __webpack_require__(/*! passport */ "passport");

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var db = __webpack_require__(/*! ./config/keys */ "./src/server/config/keys.js").mongoURI; // connect to mongo using mongoose


mongoose.connect(db, {
  useNewUrlParser: true
}).then(function () {
  return console.log('MongoDb connected...');
}).catch(function (err) {
  return console.log(err);
});

var userRoutes = __webpack_require__(/*! ./routes/api/user-routes */ "./src/server/routes/api/user-routes.js"); // declare express


var app = express(); // body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // set static folder

app.use(express.static(path.join(__dirname, 'public'))); // express session

app.use(session({
  secret: 'secret',
  saveUnitialized: true,
  resave: true
})); // passport init

app.use(passport.initialize());
app.use(passport.session()); // express validator, taken from github

app.use(expressValidator({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(0),
        formParam = root;

    while (namespace.length) {
      formParam += (_readOnlyError("formParam"), '[' + namespace.shift() + ']');
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
})); // routes 

app.use('/user', userRoutes); // lset up port

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("Server started on port ".concat(app.get('port')));
});
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

/***/ })

/******/ });
//# sourceMappingURL=server.bundle.js.map