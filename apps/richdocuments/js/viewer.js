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
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/viewer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/sloppy-array-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/sloppy-array-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.date.to-string.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.date.to-string.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

var ObjectPrototype = Object.prototype;

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (toString !== ObjectPrototype.toString) {
  redefine(ObjectPrototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "./node_modules/nextcloud-l10n/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nextcloud-l10n/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocale = getLocale;
exports.getLanguage = getLanguage;
exports.translate = translate;
exports.translatePlural = translatePlural;

/// <reference types="nextcloud-typings" />

/**
 * Returns the user's locale
 */
function getLocale() {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return 'en';
  }

  return OC.getLocale();
}
/**
 * Returns the user's language
 */


function getLanguage() {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return 'en';
  }

  return OC.getLanguage();
}

/**
 * Translate a string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} text the string to translate
 * @param {object} vars map of placeholder key to value
 * @param {Number} number to replace %n with
 * @param {object} [options] options object
 * @return {string}
 */
function translate(app, text, vars, count, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return text;
  }

  return OC.L10N.translate(app, text, vars, count, options);
}
/**
 * Translate a plural string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} textSingular the string to translate for exactly one object
 * @param {string} textPlural the string to translate for n objects
 * @param {number} count number to determine whether to use singular or plural
 * @param {Object} vars of placeholder key to value
 * @param {object} options options object
 * @return {string}
 */


function translatePlural(app, textSingular, textPlural, count, vars, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return textSingular;
  }

  return OC.L10N.translatePlural(app, textSingular, textPlural, count, vars, options);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/nextcloud-router/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/nextcloud-router/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.assign */ "./node_modules/core-js/modules/es.object.assign.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootUrl = exports.generateFilePath = exports.imagePath = exports.generateUrl = exports.generateOcsUrl = exports.generateRemoteUrl = exports.linkTo = void 0;

/// <reference types="nextcloud-typings" />

/**
 * Get an absolute url to a file in an app
 *
 * @param {string} app the id of the app the file belongs to
 * @param {string} file the file path relative to the app folder
 * @return {string} Absolute URL to a file
 */
var linkTo = function linkTo(app, file) {
  return generateFilePath(app, '', file);
};
/**
 * Creates a relative url for remote use
 *
 * @param {string} service id
 * @return {string} the url
 */


exports.linkTo = linkTo;

var linkToRemoteBase = function linkToRemoteBase(service) {
  return getRootUrl() + '/remote.php/' + service;
};
/**
 * @brief Creates an absolute url for remote use
 * @param {string} service id
 * @return {string} the url
 */


var generateRemoteUrl = function generateRemoteUrl(service) {
  return window.location.protocol + '//' + window.location.host + linkToRemoteBase(service);
};
/**
 * Get the base path for the given OCS API service
 *
 * @param {string} service name
 * @param {int} version OCS API version
 * @return {string} OCS API base path
 */


exports.generateRemoteUrl = generateRemoteUrl;

var generateOcsUrl = function generateOcsUrl(service, version) {
  version = version !== 2 ? 1 : 2;
  return window.location.protocol + '//' + window.location.host + getRootUrl() + '/ocs/v' + version + '.php/' + service + '/';
};

exports.generateOcsUrl = generateOcsUrl;

/**
 * Generate the absolute url for the given relative url, which can contain parameters
 *
 * Parameters will be URL encoded automatically
 *
 * @return {string} Absolute URL for the given relative URL
 */
var generateUrl = function generateUrl(url, params, options) {
  var allOptions = Object.assign({
    escape: true,
    noRewrite: false
  }, options || {});

  var _build = function _build(text, vars) {
    vars = vars || {};
    return text.replace(/{([^{}]*)}/g, function (a, b) {
      var r = vars[b];

      if (allOptions.escape) {
        return typeof r === 'string' || typeof r === 'number' ? encodeURIComponent(r.toString()) : encodeURIComponent(a);
      } else {
        return typeof r === 'string' || typeof r === 'number' ? r.toString() : a;
      }
    });
  };

  if (url.charAt(0) !== '/') {
    url = '/' + url;
  }

  if (OC.config.modRewriteWorking === true && !allOptions.noRewrite) {
    return getRootUrl() + _build(url, params || {});
  }

  return getRootUrl() + '/index.php' + _build(url, params || {});
};
/**
 * Get the absolute path to an image file
 * if no extension is given for the image, it will automatically decide
 * between .png and .svg based on what the browser supports
 *
 * @param {string} app the app id to which the image belongs
 * @param {string} file the name of the image file
 * @return {string}
 */


exports.generateUrl = generateUrl;

var imagePath = function imagePath(app, file) {
  if (file.indexOf('.') === -1) {
    //if no extension is given, use svg
    return generateFilePath(app, 'img', file + '.svg');
  }

  return generateFilePath(app, 'img', file);
};
/**
 * Get the absolute url for a file in an app
 *
 * @param {string} app the id of the app
 * @param {string} type the type of the file to link to (e.g. css,img,ajax.template)
 * @param {string} file the filename
 * @return {string} Absolute URL for a file in an app
 */


exports.imagePath = imagePath;

var generateFilePath = function generateFilePath(app, type, file) {
  var isCore = OC.coreApps.indexOf(app) !== -1;
  var link = getRootUrl();

  if (file.substring(file.length - 3) === 'php' && !isCore) {
    link += '/index.php/apps/' + app;

    if (file !== 'index.php') {
      link += '/';

      if (type) {
        link += encodeURI(type + '/');
      }

      link += file;
    }
  } else if (file.substring(file.length - 3) !== 'php' && !isCore) {
    link = OC.appswebroots[app];

    if (type) {
      link += '/' + type + '/';
    }

    if (link.substring(link.length - 1) !== '/') {
      link += '/';
    }

    link += file;
  } else {
    if ((app === 'settings' || app === 'core' || app === 'search') && type === 'ajax') {
      link += '/index.php/';
    } else {
      link += '/';
    }

    if (!isCore) {
      link += 'apps/';
    }

    if (app !== '') {
      app += '/';
      link += app;
    }

    if (type) {
      link += type + '/';
    }

    link += file;
  }

  return link;
};
/**
 * Return the web root path where this Nextcloud instance
 * is accessible, with a leading slash.
 * For example "/nextcloud".
 *
 * @return {string} web root path
 */


exports.generateFilePath = generateFilePath;

var getRootUrl = function getRootUrl() {
  return OC.webroot;
};

exports.getRootUrl = getRootUrl;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: languageToBCP47, getNextcloudVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "languageToBCP47", function() { return languageToBCP47; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextcloudVersion", function() { return getNextcloudVersion; });
/* harmony import */ var nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nextcloud-l10n */ "./node_modules/nextcloud-l10n/dist/index.js");
/* harmony import */ var nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__);
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */


var languageToBCP47 = function languageToBCP47() {
  var language = Object(nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__["getLanguage"])().replace(/_/g, '-');
  var locale = Object(nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__["getLocale"])(); // German formal should just be treated as 'de'

  if (language === 'de-DE') {
    language = 'de';
  } // special case where setting the bc47 region depending on the locale setting makes sense


  var whitelist = {
    de: {
      'de_CH': 'de-CH',
      'gsw': 'de-CH',
      'gsw_CH': 'de-CH'
    }
  };
  var matchingWhitelist = whitelist[language];

  if (typeof matchingWhitelist !== 'undefined' && typeof matchingWhitelist[locale] !== 'undefined') {
    return matchingWhitelist[locale];
  } // loleaflet expects a BCP47 language tag syntax
  // when a the nextcloud language constist of two parts we sent both
  // as the region is then provided by the language setting


  return language;
};

var getNextcloudVersion = function getNextcloudVersion() {
  return parseInt(OC.config.version.split('.')[0]);
};



/***/ }),

/***/ "./src/helpers/types.js":
/*!******************************!*\
  !*** ./src/helpers/types.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var getFileType = function getFileType(document, ooxml) {
  var documentTypes = {
    document: {
      extension: 'odt',
      mime: 'application/vnd.oasis.opendocument.text'
    },
    spreadsheet: {
      extension: 'ods',
      mime: 'application/vnd.oasis.opendocument.spreadsheet'
    },
    presentation: {
      extension: 'odp',
      mime: 'application/vnd.oasis.opendocument.presentation'
    }
  };

  if (ooxml) {
    documentTypes = {
      document: {
        extension: 'docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      },
      spreadsheet: {
        extension: 'xlsx',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      presentation: {
        extension: 'pptx',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
    };
  }

  return documentTypes[document];
};

/* harmony default export */ __webpack_exports__["default"] = ({
  getFileType: getFileType
});

/***/ }),

/***/ "./src/helpers/url.js":
/*!****************************!*\
  !*** ./src/helpers/url.js ***!
  \****************************/
/*! exports provided: getSearchParam, getWopiUrl, getDocumentUrlFromTemplate, getDocumentUrlForPublicFile, getDocumentUrlForFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchParam", function() { return getSearchParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWopiUrl", function() { return getWopiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocumentUrlFromTemplate", function() { return getDocumentUrlFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocumentUrlForPublicFile", function() { return getDocumentUrlForPublicFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocumentUrlForFile", function() { return getDocumentUrlForFile; });
/* harmony import */ var nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nextcloud-router */ "./node_modules/nextcloud-router/dist/index.js");
/* harmony import */ var nextcloud_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nextcloud_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/helpers/index.js");
/* harmony import */ var _services_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/config */ "./src/services/config.tsx");
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */




var getSearchParam = function getSearchParam(name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);

  if (results === null) {
    return null;
  }

  return decodeURI(results[1]) || 0;
};

var getWopiUrl = function getWopiUrl(_ref) {
  var fileId = _ref.fileId,
      title = _ref.title,
      readOnly = _ref.readOnly,
      closeButton = _ref.closeButton,
      revisionHistory = _ref.revisionHistory;
  // WOPISrc - URL that loolwsd will access (ie. pointing to ownCloud)
  // index.php is forced here to avoid different wopi srcs for the same document
  var wopiurl = window.location.protocol + '//' + window.location.host + Object(nextcloud_router__WEBPACK_IMPORTED_MODULE_0__["getRootUrl"])() + '/index.php/apps/richdocuments/wopi/files/' + fileId;
  console.debug('[getWopiUrl] ' + wopiurl);
  var wopisrc = encodeURIComponent(wopiurl); // urlsrc - the URL from discovery xml that we access for the particular
  // document; we add various parameters to that.
  // The discovery is available at
  //   https://<loolwsd-server>:9980/hosting/discovery

  return _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('urlsrc') + 'WOPISrc=' + wopisrc + '&title=' + encodeURIComponent(title) + '&lang=' + Object(_index__WEBPACK_IMPORTED_MODULE_1__["languageToBCP47"])() + (closeButton ? '&closebutton=1' : '') + (revisionHistory ? '&revisionhistory=1' : '') + (readOnly ? '&permission=readonly' : '');
};

var getDocumentUrlFromTemplate = function getDocumentUrlFromTemplate(templateId, fileName, fileDir, fillWithTemplate) {
  return OC.generateUrl('apps/richdocuments/indexTemplate?templateId={templateId}&fileName={fileName}&dir={dir}&requesttoken={requesttoken}', {
    templateId: templateId,
    fileName: fileName,
    dir: fileDir,
    requesttoken: OC.requestToken
  });
};

var getDocumentUrlForPublicFile = function getDocumentUrlForPublicFile(fileName, fileId) {
  return OC.generateUrl('apps/richdocuments/public?shareToken={shareToken}&fileName={fileName}&requesttoken={requesttoken}&fileId={fileId}', {
    shareToken: document.getElementById('sharingToken').value,
    fileName: fileName,
    fileId: fileId,
    requesttoken: OC.requestToken
  });
};

var getDocumentUrlForFile = function getDocumentUrlForFile(fileDir, fileId) {
  return OC.generateUrl('apps/richdocuments/index?fileId={fileId}&requesttoken={requesttoken}', {
    fileId: fileId,
    dir: fileDir,
    requesttoken: OC.requestToken
  });
};



/***/ }),

/***/ "./src/services/config.tsx":
/*!*********************************!*\
  !*** ./src/services/config.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.values = {};
        this.loadFromGlobal('userId');
        this.loadFromGlobal('urlsrc');
        this.loadFromGlobal('directEdit');
        this.loadFromGlobal('permissions');
        this.loadFromGlobal('instanceId');
    }
    ConfigService.prototype.loadFromGlobal = function (key) {
        // @ts-ignore
        this.values[key] = window['richdocuments_' + key];
    };
    ConfigService.prototype.update = function (key, value) {
        // @ts-ignore
        this.values[key] = value;
    };
    ConfigService.prototype.get = function (key) {
        if (typeof this.values[key] === 'undefined') {
            this.loadFromGlobal(key);
        }
        return this.values[key];
    };
    return ConfigService;
}());
var Config = new ConfigService();
/* harmony default export */ __webpack_exports__["default"] = (Config);


/***/ }),

/***/ "./src/services/postMessage.tsx":
/*!**************************************!*\
  !*** ./src/services/postMessage.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PostMessageService = /** @class */ (function () {
    function PostMessageService(targets) {
        var _this = this;
        this.postMessageHandlers = [];
        this.targets = targets;
        window.addEventListener('message', function (event) {
            _this.handlePostMessage(event.data);
        }, false);
    }
    PostMessageService.prototype.sendPostMessage = function (target, message, targetOrigin) {
        if (targetOrigin === void 0) { targetOrigin = '*'; }
        var targetElement;
        if (typeof this.targets[target] === 'function') {
            targetElement = this.targets[target]();
        }
        else {
            targetElement = this.targets[target];
        }
        targetElement.postMessage(message, targetOrigin);
        console.debug('PostMessageService.sendPostMessage', target, message);
    };
    PostMessageService.prototype.sendWOPIPostMessage = function (target, msgId, values) {
        if (values === void 0) { values = {}; }
        var msg = {
            MessageId: msgId,
            SendTime: Date.now(),
            Values: values
        };
        this.sendPostMessage(target, JSON.stringify(msg));
    };
    PostMessageService.parsePostMessage = function (data) {
        var msgId, args, deprecated;
        try {
            var msg = JSON.parse(data);
            msgId = msg.MessageId;
            args = msg.Values;
            deprecated = !!msg.Values.Deprecated;
        }
        catch (exc) {
            msgId = data;
        }
        return { msgId: msgId, args: args, deprecated: deprecated };
    };
    PostMessageService.prototype.registerPostMessageHandler = function (callback) {
        this.postMessageHandlers.push(callback);
    };
    PostMessageService.prototype.unregisterPostMessageHandler = function (callback) {
        var handlerIndex = this.postMessageHandlers.findIndex(function (cb) { return cb === callback; });
        delete this.postMessageHandlers[handlerIndex];
    };
    PostMessageService.prototype.handlePostMessage = function (data) {
        var parsed = PostMessageService.parsePostMessage(data);
        if (typeof parsed === 'undefined' || parsed === null) {
            return;
        }
        this.postMessageHandlers.forEach(function (fn) {
            if (parsed.deprecated) {
                console.debug('PostMessageService.handlePostMessage', 'Ignoring deprecated post message', parsed.msgId);
                return;
            }
            fn({
                data: data,
                parsed: parsed
            });
        });
    };
    return PostMessageService;
}());
/* harmony default export */ __webpack_exports__["default"] = (PostMessageService);


/***/ }),

/***/ "./src/view/FilesAppIntegration.js":
/*!*****************************************!*\
  !*** ./src/view/FilesAppIntegration.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1';
/* harmony default export */ __webpack_exports__["default"] = ({
  fileModel: null,
  fileList: FileList,

  /* Views: people currently editing the file */
  views: {},
  followingEditor: false,
  following: null,
  init: function init(_ref) {
    var fileName = _ref.fileName,
        fileId = _ref.fileId,
        sendPostMessage = _ref.sendPostMessage,
        fileList = _ref.fileList;
    this.fileName = fileName;
    this.fileId = fileId;
    this.fileList = fileList;
    this.sendPostMessage = sendPostMessage;
  },
  initAfterReady: function initAfterReady() {
    if (typeof this.getFileList() !== 'undefined') {
      this.getFileModel();
      this.getFileList().hideMask();
    }

    var headerRight = document.querySelector('#header .header-right');
    var richdocumentsHeader = document.createElement('div');
    richdocumentsHeader.id = 'richdocuments-header';
    headerRight.insertBefore(richdocumentsHeader, headerRight.firstChild);

    this._addAvatarList();

    if (!isPublic) {
      this._addHeaderShareButton();

      this._addHeaderFileActions();

      this.addVersionSidebarEvents();
    }
  },
  close: function close() {
    if (this.getFileList()) {
      this.getFileList().setViewerMode(false);
      this.getFileList().reload();
    }

    this.fileModel = null;

    if (!isPublic) {
      this.removeVersionSidebarEvents();
    }

    $('#richdocuments-header').remove();
  },
  share: function share() {
    if (isPublic || !this.getFileList()) {
      console.error('[FilesAppIntegration] Sharing is not supported');
      return;
    }

    this.getFileList().showDetailsView(this.fileName, 'shareTabView');
    OC.Apps.showAppSidebar();
  },
  insertGraphic: function insertGraphic(callback) {
    if (isPublic) {
      console.error('[FilesAppIntegration] insertGraphic is not supported');
    }

    OC.dialogs.filepicker(t('richdocuments', 'Insert from {name}', {
      name: OC.theme.name
    }), function (path, type) {
      if (type === OC.dialogs.FILEPICKER_TYPE_CHOOSE) {
        var filename = path.substring(path.lastIndexOf('/') + 1);
        $.ajax({
          type: 'POST',
          url: OC.generateUrl('apps/richdocuments/assets'),
          data: {
            path: path
          }
        }).done(function (resp) {
          callback(filename, resp.url);
        });
      }
    }, false, ['image/png', 'image/gif', 'image/jpeg', 'image/svg'], true, OC.dialogs.FILEPICKER_TYPE_CHOOSE);
  },
  getFileList: function getFileList() {
    if (this.fileList) {
      return this.fileList;
    }

    if (OCA.Files.App) {
      return OCA.Files.App.fileList;
    }

    if (OCA.Sharing.PublicApp) {
      return OCA.Sharing.PublicApp.fileList;
    }

    return null;
  },
  getFileModel: function getFileModel() {
    var _this = this;

    if (this.fileModel !== null) {
      return this.fileModel;
    }

    if (!this.getFileList()) {
      return null;
    }

    this.getFileList()._updateDetailsView(this.fileName, false);

    this.fileModel = this.getFileList().getModelForFile(this.fileName);

    if (this.fileModel !== null) {
      this.fileModel.on('change', function () {
        _this._addHeaderFileActions();
      });
    }

    return this.fileModel;
  },
  setViews: function setViews(views) {
    var _this2 = this;

    this.views = {};
    views.forEach(function (view) {
      _this2.views[view.ViewId] = view;
    });
    this.renderAvatars();
  },
  followReset: function followReset(event) {
    this.sendPostMessage('Action_FollowUser', {
      Follow: false
    });
    this.following = null;
    this.followingEditor = false;
    this.renderAvatars();
  },
  followCurrentEditor: function followCurrentEditor(event) {
    this.sendPostMessage('Action_FollowUser', {
      Follow: true
    });
    this.following = null;
    this.followingEditor = true;
    this.renderAvatars();
  },
  followView: function followView(view) {
    this.sendPostMessage('Action_FollowUser', {
      ViewId: view.ViewId,
      Follow: true
    });
    this.following = view.ViewId;
    this.followingEditor = false;
    this.renderAvatars();
  },
  _addAvatarList: function _addAvatarList() {
    // Add the avatar toolbar if possible
    var avatarList = $('<div id="richdocuments-avatars">');
    avatarList.on('click', function (e) {
      e.stopPropagation();
      $('#editors-menu').toggle();
    });
    $('#richdocuments-header').append(avatarList);
  },
  _addHeaderShareButton: function _addHeaderShareButton() {
    var _this3 = this;

    if ($('header').length) {
      var $button = $('<div id="richdocuments-sharing"><a class="icon-shared icon-white"></a></div>');
      $('#richdocuments-header').append($button);
      $button.on('click', function () {
        if (!$('#app-sidebar').is(':visible')) {
          return _this3.share();
        }

        OC.Apps.hideAppSidebar();
      });
      $('.searchbox').hide();
    }
  },
  _addHeaderFileActions: function _addHeaderFileActions() {
    var _this4 = this;

    console.debug('[FilesAppIntegration] Adding header file actions');
    OC.unregisterMenu($('#richdocuments-actions .icon-more'), $('#richdocuments-actions-menu'));
    $('#richdocuments-actions').remove();
    var actionsContainer = $('<div id="richdocuments-actions"><div class="icon-more icon-white"></div><ul id="richdocuments-actions-menu" class="popovermenu"></ul></div>');
    var actions = actionsContainer.find('#richdocuments-actions-menu').empty();
    var context = {
      '$file': this.getFileList().$el.find('[data-id=' + this.originalFileId + ']').first(),
      fileActions: this.getFileList().fileActions,
      fileList: this.getFileList(),
      fileInfoModel: this.getFileModel()
    };

    var isFavorite = function isFavorite(fileInfo) {
      return fileInfo.get('tags') && fileInfo.get('tags').indexOf(OC.TAG_FAVORITE) >= 0;
    };

    var $favorite = $('<li><a></a></li>').click(function (event) {
      $favorite.find('a').removeClass('icon-starred').removeClass('icon-star-dark').addClass('icon-loading-small');

      _this4.getFileList().fileActions.triggerAction('Favorite', _this4.getFileModel(), _this4.getFileList());

      _this4.getFileModel().trigger('change', _this4.getFileModel());
    });

    if (isFavorite(context.fileInfoModel)) {
      $favorite.find('a').text(t('files', 'Remove from favorites'));
      $favorite.find('a').addClass('icon-starred');
    } else {
      $favorite.find('a').text(t('files', 'Add to favorites'));
      $favorite.find('a').addClass('icon-star-dark');
    }

    var $info = $('<li><a class="icon-info"></a></li>').click(function () {
      _this4.getFileList().fileActions.actions.all.Details.action(_this4.fileName, context);

      OC.hideMenus();
    });
    $info.find('a').text(t('files', 'Details'));
    var $download = $('<li><a class="icon-download">Download</a></li>').click(function () {
      _this4.getFileList().fileActions.actions.all.Download.action(_this4.fileName, context);

      OC.hideMenus();
    });
    $download.find('a').text(t('files', 'Download'));
    actions.append($favorite).append($info).append($download);
    $('#richdocuments-header').append(actionsContainer);
    OC.registerMenu($('#richdocuments-actions .icon-more'), $('#richdocuments-actions-menu'), false, true);
  },

  /**
   * @param {View} view
   * @private
   */
  _userEntry: function _userEntry(view) {
    var _this5 = this;

    var entry = $('<li></li>');
    entry.append(this._avatarForView(view));
    var label = $('<div class="label"></div>');
    label.text(view.UserName);

    if (view.ReadOnly === '1') {
      label.text(view.UserName + ' ' + t('richdocuments', '(read only)'));
    }

    label.click(function (event) {
      event.stopPropagation();

      _this5.followView(view);
    });

    if (this.following === view.ViewId) {
      $('#editors-menu').find('li').removeClass('active');
      entry.addClass('active');
    }

    entry.append(label);
    var isFileOwner = !isPublic && this.getFileModel() && typeof this.getFileModel().get('shareOwner') === 'undefined';
    var canEdit = this.getFileModel() && !!(this.getFileModel().get('permissions') & OC.PERMISSION_UPDATE);

    if (isFileOwner && canEdit && !view.IsCurrentView) {
      var removeButton = $('<div class="icon-close" title="Remove user"/>');
      removeButton.click(function () {
        _this5.sendPostMessage('Action_RemoveView', {
          ViewId: view.ViewId
        });
      });
      entry.append(removeButton);
    }

    return entry;
  },

  /**
   * @param {View} view
   * @returns {$|HTMLElement}
   * @private
   */
  _avatarForView: function _avatarForView(view) {
    var userId = view.UserId === '' ? view.UserName : view.UserId;
    var avatarContainer = $('<div class="richdocuments-avatar"><div class="avatar" title="' + view.UserName + '" data-user="' + userId + '"></div></div>');
    var avatar = avatarContainer.find('.avatar');
    avatar.css({
      'border-color': '#' + ('000000' + Number(view.Color).toString(16)).substr(-6),
      'border-width': '2px',
      'border-style': 'solid'
    });

    if (view.ReadOnly === '1') {
      avatarContainer.addClass('read-only');
      $(avatar).attr('title', view.UserName + ' ' + t('richdocuments', '(read only)'));
    } else {
      $(avatar).attr('title', view.UserName);
    }

    $(avatar).avatar(userId, 32, undefined, true, undefined, view.UserName);
    return avatarContainer;
  },
  renderAvatars: function renderAvatars() {
    var _this6 = this;

    var avatardiv = $('#header .header-right #richdocuments-avatars');
    avatardiv.empty();
    var popover = $('<div id="editors-menu" class="popovermenu menu-center"><ul></ul></div>');
    var users = []; // Add new avatars

    var i = 0;

    for (var viewId in this.views) {
      /**
       * @type {View}
       */
      var view = this.views[viewId];
      view.UserName = view.UserName !== '' ? view.UserName : t('richdocuments', 'Guest');
      popover.find('ul').append(this._userEntry(view));

      if (view.UserId === OC.currentUser) {
        continue;
      }

      if (view.UserId !== '' && users.indexOf(view.UserId) > -1) {
        continue;
      }

      users.push(view.UserId);

      if (i++ < 3) {
        avatardiv.append(this._avatarForView(view));
      }
    }

    var followCurrentEditor = $('<li><input type="checkbox" class="checkbox" /><label class="label">' + t('richdocuments', 'Follow current editor') + '</label></li>');
    followCurrentEditor.find('label').click(function (event) {
      event.stopPropagation();

      if (_this6.followingEditor) {
        _this6.followReset();
      } else {
        _this6.followCurrentEditor();
      }
    });
    followCurrentEditor.find('.checkbox').prop('checked', this.followingEditor);
    popover.find('ul').append(followCurrentEditor);
    avatardiv.append(popover);
  },
  addVersionSidebarEvents: function addVersionSidebarEvents() {
    $(document.querySelector('#content')).on('click.revisions', '#app-sidebar .preview-container', this.showVersionPreview.bind(this));
    $(document.querySelector('#content')).on('click.revisions', '#app-sidebar .downloadVersion', this.showVersionPreview.bind(this));
    $(document.querySelector('#content')).on('mousedown.revisions', '#app-sidebar .revertVersion', this.restoreVersion.bind(this));
  },
  removeVersionSidebarEvents: function removeVersionSidebarEvents() {
    $(document.querySelector('#content')).off('click.revisions');
    $(document.querySelector('#content')).off('click.revisions');
    $(document.querySelector('#content')).off('mousedown.revisions');
  },
  addCurrentVersion: function addCurrentVersion() {
    if (this.getFileModel()) {
      var preview = OC.MimeType.getIconUrl(this.getFileModel().get('mimetype'));
      var mtime = this.getFileModel().get('mtime');
      $('#versionsTabView').prepend('<ul id="lastSavedVersion"><li data-revision="0"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n' + '<div><a class="downloadVersion">' + t('richdocuments', 'Last saved version') + '<span class="versiondate has-tooltip live-relative-timestamp" data-timestamp="' + mtime + '"></span></div></div></li></ul>');
      $('#versionsTabView').prepend('<ul id="currentVersion"><li data-revision="" class="active"><div><div class="preview-container"><img src="' + preview + '" width="44" /></div><div class="version-container">\n' + '<div><a class="downloadVersion">' + t('richdocuments', 'Current version') + '</a></div></div></li></ul>');
      $('.live-relative-timestamp').each(function () {
        $(this).text(OC.Util.relativeModifiedDate(parseInt($(this).attr('data-timestamp'), 10)));
      });
    }
  },
  showRevHistory: function showRevHistory() {
    if (this.getFileList()) {
      this.getFileList().showDetailsView(this.fileName, 'versionsTabView');
      this.addCurrentVersion();
    }
  },
  showVersionPreview: function showVersionPreview(e) {
    e.preventDefault();
    var element = e.currentTarget.parentElement.parentElement;

    if ($(e.currentTarget).hasClass('downloadVersion')) {
      element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    }

    var version = element.dataset.revision;
    var fileId = this.fileId;
    var title = this.fileName;
    console.debug('[FilesAppIntegration] showVersionPreview', version, fileId, title);
    this.sendPostMessage('Action_loadRevViewer', {
      fileId: fileId,
      title: title,
      version: version
    });
    $(element.parentElement.parentElement).find('li').removeClass('active');
    $(element).addClass('active');
  },
  restoreVersion: function restoreVersion(e) {
    var _this7 = this;

    e.preventDefault();
    e.stopPropagation();
    this.sendPostMessage('Host_VersionRestore', {
      Status: 'Pre_Restore'
    });
    var version = e.currentTarget.parentElement.parentElement.dataset.revision;

    this._restoreVersionCallback = function () {
      _this7._restoreDAV(version);

      _this7._restoreVersionCallback = null;
    };

    return false;
  },
  restoreVersionExecute: function restoreVersionExecute() {
    if (this._restoreVersionCallback !== null) {
      this._restoreVersionCallback();
    }
  },
  restoreVersionAbort: function restoreVersionAbort() {
    this._restoreVersionCallback = null;
  },
  _restoreSuccess: function _restoreSuccess(response) {
    if (response.status === 'error') {
      OC.Notification.showTemporary(t('richdocuments', 'Failed to revert the document to older version'));
    } // Reload the document frame to get the new file
    // TODO: ideally we should have a post messsage that can be sent to collabora to just reload the file once the restore is finished


    document.getElementById('richdocumentsframe').src = document.getElementById('richdocumentsframe').src;
    OC.Apps.hideAppSidebar();
  },
  _restoreError: function _restoreError() {
    OC.Notification.showTemporary(t('richdocuments', 'Failed to revert the document to older version'));
  },
  _restoreDAV: function _restoreDAV(version) {
    var restoreUrl = OC.linkToRemoteBase('dav') + '/versions/' + OC.getCurrentUser().uid + '/versions/' + this.fileId + '/' + version;
    $.ajax({
      type: 'MOVE',
      url: restoreUrl,
      headers: {
        Destination: OC.linkToRemote('dav') + '/versions/' + OC.getCurrentUser().uid + '/restore/target'
      },
      success: this._restoreSuccess.bind(this),
      error: this._restoreError.bind(this)
    });
  },

  /* Ask for a new filename and open the files app in a new tab
   * the parameters richdocuments_create and richdocuments_filename are
   * parsed by viewer.js and open a template picker in the new tab
   */
  createNewFile: function createNewFile(type) {
    OC.dialogs.prompt(t('richdocuments', 'Please enter the filename for the new document'), t('richdocuments', 'Save As'), function (result, value) {
      if (result === true && value) {
        if (type === 'text') {
          type = 'document';
        }

        var dir = parent.$('#dir').val();
        var url = OC.generateUrl('/apps/files/?dir=' + dir + '&richdocuments_create=' + type + '&richdocuments_filename=' + encodeURI(value));
        window.open(url, '_blank');
      }
    }, true, t('richdocuments', 'New filename'), false).then(function () {
      var $dialog = parent.$('.oc-dialog:visible');
      var $buttons = $dialog.find('button');
      $buttons.eq(0).text(t('richdocuments', 'Cancel'));
      $buttons.eq(1).text(t('richdocuments', 'Create a new document'));
    });
  }
});

/***/ }),

/***/ "./src/viewer.js":
/*!***********************!*\
  !*** ./src/viewer.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/url */ "./src/helpers/url.js");
/* harmony import */ var _services_postMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/postMessage */ "./src/services/postMessage.tsx");
/* harmony import */ var _services_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/config */ "./src/services/config.tsx");
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/types */ "./src/helpers/types.js");
/* harmony import */ var _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/FilesAppIntegration */ "./src/view/FilesAppIntegration.js");





var FRAME_DOCUMENT = 'FRAME_DOCUMENT';
var PostMessages = new _services_postMessage__WEBPACK_IMPORTED_MODULE_1__["default"]({
  FRAME_DOCUMENT: function FRAME_DOCUMENT() {
    return document.getElementById('richdocumentsframe').contentWindow;
  }
});
var preloadCreate = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('richdocuments_create');
var preloadOpen = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('richdocuments_open');
var Preload = {};

if (preloadCreate) {
  Preload.create = {
    type: Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('richdocuments_create'),
    filename: Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('richdocuments_filename')
  };
}

if (preloadOpen) {
  Preload.open = {
    filename: preloadOpen,
    id: Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('richdocuments_fileId'),
    dir: Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getSearchParam"])('dir')
  };
}

var isDownloadHidden = document.getElementById('hideDownload') && document.getElementById('hideDownload').value === 'true';
var isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1';
var odfViewer = {
  open: false,
  receivedLoading: false,
  supportedMimes: OC.getCapabilities().richdocuments.mimetypes.concat(OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen),
  excludeMimeFromDefaultOpen: OC.getCapabilities().richdocuments.mimetypesNoDefaultOpen,
  hideDownloadMimes: ['image/jpeg', 'image/svg+xml', 'image/cgm', 'image/vnd.dxf', 'image/x-emf', 'image/x-wmf', 'image/x-wpg', 'image/x-freehand', 'image/bmp', 'image/png', 'image/gif', 'image/tiff', 'image/jpg', 'image/jpeg', 'text/plain', 'application/pdf'],
  register: function register() {
    var EDIT_ACTION_NAME = 'Edit with ' + OC.getCapabilities().richdocuments.productName;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = odfViewer.supportedMimes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mime = _step.value;
        OCA.Files.fileActions.register(mime, EDIT_ACTION_NAME, 0, OC.imagePath('core', 'actions/rename'), this.onEdit, t('richdocuments', 'Edit with {productName}', {
          productName: OC.getCapabilities().richdocuments.productName
        }));

        if (odfViewer.excludeMimeFromDefaultOpen.indexOf(mime) === -1 || isDownloadHidden) {
          OCA.Files.fileActions.setDefault(mime, EDIT_ACTION_NAME);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  onEdit: function onEdit(fileName, context) {
    if (odfViewer.open === true) {
      return;
    }

    odfViewer.open = true;
    var fileList = null;

    if (context) {
      fileList = context.fileList;
      var fileDir = context.dir;
      var fileId = context.fileId || context.$file.attr('data-id');
      var templateId = context.templateId;
      context.fileList.setViewerMode(true);
      context.fileList.setPageTitle(fileName);
      context.fileList.showMask();
    }

    odfViewer.receivedLoading = false;
    var documentUrl = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getDocumentUrlForFile"])(fileDir, fileId);

    if (isPublic) {
      documentUrl = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getDocumentUrlForPublicFile"])(fileName, fileId);
    }

    if (typeof templateId !== 'undefined') {
      documentUrl = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_0__["getDocumentUrlFromTemplate"])(templateId, fileName, fileDir);
    }
    /**
     * We need to reload the page to set a proper CSP if the file is federated
     * and the reload didn't happen for the exact same file
     */


    var canAccessCSP = function canAccessCSP(url, callback) {
      var canEmbed = false;
      var frame = document.createElement('iframe');
      frame.setAttribute('src', url);
      frame.setAttribute('onload', function () {
        canEmbed = true;
      });
      document.body.appendChild(frame);
      setTimeout(function () {
        if (!canEmbed) {
          callback();
        }

        document.body.removeChild(frame);
      }, 50);
    };

    var reloadForFederationCSP = function reloadForFederationCSP(fileName) {
      var preloadId = Preload.open ? parseInt(Preload.open.id) : -1;
      var fileModel = fileList.findFile(fileName);
      var shareOwnerId = fileModel.shareOwnerId;

      if (typeof shareOwnerId !== 'undefined') {
        var lastIndex = shareOwnerId.lastIndexOf('@'); // only redirect if remote file, not opened though reload and csp blocks the request

        if (shareOwnerId.substr(lastIndex).indexOf('/') !== -1 && fileModel.id !== preloadId) {
          canAccessCSP('https://' + shareOwnerId.substr(lastIndex) + '/status.php', function () {
            window.location = OC.generateUrl('/apps/richdocuments/open?fileId=' + fileId);
          });
        }
      }

      return false;
    };

    if (context) {
      reloadForFederationCSP(fileName);
    }

    OC.addStyle('richdocuments', 'mobile');
    var $iframe = $('<iframe id="richdocumentsframe" nonce="' + btoa(OC.requestToken) + '" scrolling="no" allowfullscreen src="' + documentUrl + '" />');
    odfViewer.loadingTimeout = setTimeout(function () {
      if (!odfViewer.receivedLoading) {
        odfViewer.onClose();
        OC.Notification.showTemporary(t('richdocuments', 'Failed to load {productName} - please try again later', {
          productName: OC.getCapabilities().richdocuments.productName || 'Collabora Online'
        }));
      }
    }, 15000);
    $iframe.src = documentUrl;
    $('body').css('overscroll-behavior-y', 'none');
    var viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    if (isPublic) {
      // force the preview to adjust its height
      $('#preview').append($iframe).css({
        height: '100%'
      });
      $('body').css({
        height: '100%'
      });
      $('#content').addClass('full-height');
      $('footer').addClass('hidden');
      $('#imgframe').addClass('hidden');
      $('.directLink').addClass('hidden');
      $('.directDownload').addClass('hidden');
      $('#controls').addClass('hidden');
      $('#content').addClass('loading');
    } else {
      $('body').css('overflow', 'hidden');
      $('#app-content').append($iframe);
      $iframe.hide();
    }

    $('#app-content #controls').addClass('hidden');
    setTimeout(function () {
      _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].init({
        fileName: fileName,
        fileId: fileId,
        fileList: fileList,
        sendPostMessage: function sendPostMessage(msgId, values) {
          PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values);
        }
      });
    });
  },
  onReceiveLoading: function onReceiveLoading() {
    odfViewer.receivedLoading = true;
    $('#richdocumentsframe').show();
    $('html, body').scrollTop(0);
    $('#content').removeClass('loading');
    _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].initAfterReady();
  },
  onClose: function onClose() {
    odfViewer.open = false;
    clearTimeout(odfViewer.loadingTimeout);
    odfViewer.receivedLoading = false;
    $('link[href*="richdocuments/css/mobile"]').remove();
    $('#app-content #controls').removeClass('hidden');
    $('#richdocumentsframe').remove();
    $('.searchbox').show();
    $('body').css('overflow', 'auto');

    if (isPublic) {
      $('#content').removeClass('full-height');
      $('footer').removeClass('hidden');
      $('#imgframe').removeClass('hidden');
      $('.directLink').removeClass('hidden');
      $('.directDownload').removeClass('hidden');
    }

    OC.Util.History.replaceState();
    _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].close();
  },
  registerFilesMenu: function registerFilesMenu(response) {
    _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].update('ooxml', response.doc_format === 'ooxml');

    var registerFilesMenu = function registerFilesMenu(OCA) {
      OCA.FilesLOMenu = {
        attach: function attach(newFileMenu) {
          var self = this;
          var ooxml = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('ooxml');
          var document = _helpers_types__WEBPACK_IMPORTED_MODULE_3__["default"].getFileType('document', ooxml);
          var spreadsheet = _helpers_types__WEBPACK_IMPORTED_MODULE_3__["default"].getFileType('spreadsheet', ooxml);
          var presentation = _helpers_types__WEBPACK_IMPORTED_MODULE_3__["default"].getFileType('presentation', ooxml);
          newFileMenu.addMenuEntry({
            id: 'add-' + document.extension,
            displayName: t('richdocuments', 'New Document'),
            templateName: t('richdocuments', 'New Document') + '.' + document.extension,
            iconClass: 'icon-filetype-document',
            fileType: 'x-office-document',
            actionHandler: function actionHandler(filename) {
              if (OC.getCapabilities().richdocuments.templates) {
                self._openTemplatePicker('document', document.mime, filename);
              } else {
                self._createDocument(document.mime, filename);
              }
            }
          });
          newFileMenu.addMenuEntry({
            id: 'add-' + spreadsheet.extension,
            displayName: t('richdocuments', 'New Spreadsheet'),
            templateName: t('richdocuments', 'New Spreadsheet') + '.' + spreadsheet.extension,
            iconClass: 'icon-filetype-spreadsheet',
            fileType: 'x-office-spreadsheet',
            actionHandler: function actionHandler(filename) {
              if (OC.getCapabilities().richdocuments.templates) {
                self._openTemplatePicker('spreadsheet', spreadsheet.mime, filename);
              } else {
                self._createDocument(spreadsheet.mime, filename);
              }
            }
          });
          newFileMenu.addMenuEntry({
            id: 'add-' + presentation.extension,
            displayName: t('richdocuments', 'New Presentation'),
            templateName: t('richdocuments', 'New Presentation') + '.' + presentation.extension,
            iconClass: 'icon-filetype-presentation',
            fileType: 'x-office-presentation',
            actionHandler: function actionHandler(filename) {
              if (OC.getCapabilities().richdocuments.templates) {
                self._openTemplatePicker('presentation', presentation.mime, filename);
              } else {
                self._createDocument(presentation.mime, filename);
              }
            }
          });
        },
        _createDocument: function _createDocument(mimetype, filename) {
          OCA.Files.Files.isFileNameValid(filename);
          filename = FileList.getUniqueName(filename);
          $.post(OC.generateUrl('apps/richdocuments/ajax/documents/create'), {
            mimetype: mimetype,
            filename: filename,
            dir: $('#dir').val()
          }, function (response) {
            if (response && response.status === 'success') {
              FileList.add(response.data, {
                animate: true,
                scrollTo: true
              });
            } else {
              OC.dialogs.alert(response.data.message, t('core', 'Could not create file'));
            }
          });
        },
        _createDocumentFromTemplate: function _createDocumentFromTemplate(templateId, mimetype, filename) {
          OCA.Files.Files.isFileNameValid(filename);
          filename = FileList.getUniqueName(filename);
          $.post(OC.generateUrl('apps/richdocuments/ajax/documents/create'), {
            mimetype: mimetype,
            filename: filename,
            dir: $('#dir').val()
          }, function (response) {
            if (response && response.status === 'success') {
              FileList.add(response.data, {
                animate: false,
                scrollTo: false
              });
              odfViewer.onEdit(filename, {
                fileId: -1,
                dir: $('#dir').val(),
                templateId: templateId,
                fileList: FileList
              });
            } else {
              OC.dialogs.alert(response.data.message, t('core', 'Could not create file'));
            }
          });
        },
        _openTemplatePicker: function _openTemplatePicker(type, mimetype, filename) {
          var self = this;
          $.ajax({
            url: OC.linkToOCS('apps/richdocuments/api/v1/templates', 2) + type,
            dataType: 'json'
          }).then(function (response) {
            if (response.ocs.data.length === 1) {
              var id = response.ocs.data[0].id;

              self._createDocumentFromTemplate(id, mimetype, filename);

              return;
            }

            self._buildTemplatePicker(response.ocs.data).then(function () {
              var buttonlist = [{
                text: t('core', 'Cancel'),
                classes: 'cancel',
                click: function click() {
                  $(this).ocdialog('close');
                }
              }, {
                text: t('richdocuments', 'Create'),
                classes: 'primary',
                click: function click() {
                  var templateId = this.dataset.templateId;

                  self._createDocumentFromTemplate(templateId, mimetype, filename);

                  $(this).ocdialog('close');
                }
              }];
              $('#template-picker').ocdialog({
                closeOnEscape: true,
                modal: true,
                buttons: buttonlist
              }).on('click', '.foldersTab label', function () {
                $('.folderWrapper').each(function () {
                  $(this).toggleClass('hidden');
                });
              });
            });
          });
        },
        _buildTemplatePicker: function _buildTemplatePicker(data) {
          var self = this;
          return $.get(OC.filePath('richdocuments', 'templates', 'templatePicker.html'), function (tmpl) {
            var $tmpl = $(tmpl); // init template picker

            var $dlg = $tmpl.octemplate({
              dialog_name: 'template-picker',
              dialog_title: t('richdocuments', 'Select template'),
              defultTemplate_title: t('richdocuments', 'User Templates'),
              templaterepo_title: t('richdocuments', 'Templaterepo')
            }); // create templates list

            var templates = _.values(data);

            templates.forEach(function (template) {
              self._appendTemplateFromData($dlg[0], template);
            });
            $('body').append($dlg);
          });
        },
        _appendTemplateFromData: function _appendTemplateFromData(dlg, data) {
          var template = dlg.querySelector('.template-model').cloneNode(true);
          template.className = '';

          if (!data.preview) {
            template.querySelector('img').classList.add('emptyImg');
          } else {
            template.querySelector('img').src = data.preview;
          }

          template.querySelector('h2').textContent = data.name;

          template.onclick = function () {
            dlg.dataset.templateId = data.id;
          };

          if (!dlg.dataset.templateId) {
            dlg.dataset.templateId = data.id;
          }

          if (!data.templaterepoFolder) {
            dlg.querySelector('.defultFolder').appendChild(template);
          } else {
            dlg.querySelector('.templaterepoFolder').appendChild(template);
          }
        }
      };
    };

    registerFilesMenu(OCA);
    OC.Plugins.register('OCA.Files.NewFileMenu', OCA.FilesLOMenu); // Open the template picker if there was a create parameter detected on load

    if (Preload.create && Preload.create.type && Preload.create.filename) {
      var fileType = _helpers_types__WEBPACK_IMPORTED_MODULE_3__["default"].getFileType(Preload.create.type, _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('ooxml'));

      OCA.FilesLOMenu._openTemplatePicker(Preload.create.type, fileType.mime, Preload.create.filename + '.' + fileType.extension);
    }

    if (Preload.open) {
      FileList.$fileList.one('updated', function () {
        odfViewer.onEdit(Preload.open.filename, {
          fileId: Preload.open.id,
          dir: document.getElementById('dir').value,
          fileList: FileList
        });
      });
    }
  }
};
window.OCA.RichDocuments = {};
$(document).ready(function () {
  // register file actions and menu
  if (typeof OCA !== 'undefined' && typeof OCA.Files !== 'undefined' && typeof OCA.Files.fileActions !== 'undefined') {
    // check if texteditor app is enabled and loaded...
    if (typeof OCA.Files_Texteditor === 'undefined' && typeof OCA.Text === 'undefined') {
      odfViewer.supportedMimes.push('text/plain');
    }

    odfViewer.register();
    $.get(OC.filePath('richdocuments', 'ajax', 'settings.php')).done(function (settings) {
      // TODO: move ooxml setting to capabilities so we don't need this request
      odfViewer.registerFilesMenu(settings);
    });
  } // Open documents if a public page is opened for a supported mimetype


  var isSupportedMime = isPublic && odfViewer.supportedMimes.indexOf($('#mimetype').val()) !== -1 && odfViewer.excludeMimeFromDefaultOpen.indexOf($('#mimetype').val()) === -1;
  var showSecureView = isPublic && isDownloadHidden && odfViewer.hideDownloadMimes.indexOf($('#mimetype').val()) !== -1;

  if (isSupportedMime || showSecureView) {
    odfViewer.onEdit(document.getElementById('filename').value);
  }

  PostMessages.registerPostMessageHandler(function (_ref) {
    var parsed = _ref.parsed;
    console.debug('[viewer] Received post message', parsed);
    var msgId = parsed.msgId,
        args = parsed.args,
        deprecated = parsed.deprecated;

    if (deprecated) {
      return;
    }

    switch (msgId) {
      case 'loading':
        odfViewer.onReceiveLoading();
        break;

      case 'App_LoadingStatus':
        if (args.Status === 'Timeout') {
          odfViewer.onClose();
          OC.Notification.showTemporary(t('richdocuments', 'Failed to connect to {productName}. Please try again later or contact your server administrator.', {
            productName: OC.getCapabilities().richdocuments.productName
          }));
        }

        break;

      case 'UI_Share':
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].share();
        break;

      case 'UI_CreateFile':
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].createNewFile(args.DocumentType);
        break;

      case 'UI_InsertGraphic':
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].insertGraphic(function (filename, url) {
          PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, 'postAsset', {
            FileName: filename,
            Url: url
          });
        });
        break;

      case 'File_Rename':
        FileList.reload();
        OC.Apps.hideAppSidebar();
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].fileName = args.NewName;
        break;

      case 'close':
        odfViewer.onClose();
        break;

      case 'Get_Views_Resp':
      case 'Views_List':
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].setViews(args);
        break;

      case 'UI_FileVersions':
      case 'rev-history':
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].showRevHistory();
        break;

      case 'App_VersionRestore':
        if (args.Status === 'Pre_Restore_Ack') {
          _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].restoreVersionExecute();
        }

        break;
    } // legacy view handling


    if (msgId === 'View_Added') {
      _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].views[args.ViewId] = args;
      _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].renderAvatars();
    } else if (msgId === 'View_Removed') {
      delete _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].views[args.ViewId];
      _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].renderAvatars();
    } else if (msgId === 'FollowUser_Changed') {
      if (args.IsFollowEditor) {
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].followingEditor = true;
      } else {
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].followingEditor = false;
      }

      if (args.IsFollowUser) {
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].following = args.FollowedViewId;
      } else {
        _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].following = null;
      }

      _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"].renderAvatars();
    }
  });
  window.FilesAppIntegration = _view_FilesAppIntegration__WEBPACK_IMPORTED_MODULE_4__["default"];
});

/***/ })

/******/ });
//# sourceMappingURL=viewer.js.map