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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/document.js");
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

/***/ "./node_modules/nextcloud-auth/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nextcloud-auth/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getRequestToken", {
  enumerable: true,
  get: function get() {
    return _requesttoken.getRequestToken;
  }
});
Object.defineProperty(exports, "getCurrentUser", {
  enumerable: true,
  get: function get() {
    return _user.getCurrentUser;
  }
});

var _requesttoken = __webpack_require__(/*! ./requesttoken */ "./node_modules/nextcloud-auth/dist/requesttoken.js");

var _user = __webpack_require__(/*! ./user */ "./node_modules/nextcloud-auth/dist/user.js");
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/nextcloud-auth/dist/requesttoken.js":
/*!**********************************************************!*\
  !*** ./node_modules/nextcloud-auth/dist/requesttoken.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestToken = getRequestToken;

/// <reference types="nextcloud-typings" />
function getRequestToken() {
  return OC.requestToken;
}
//# sourceMappingURL=requesttoken.js.map

/***/ }),

/***/ "./node_modules/nextcloud-auth/dist/user.js":
/*!**************************************************!*\
  !*** ./node_modules/nextcloud-auth/dist/user.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentUser = getCurrentUser;

/// <reference types="nextcloud-typings" />

/**
 * @todo inline https://github.com/nextcloud/server/blob/master/core/src/OC/currentuser.js
 */
function getCurrentUser() {
  var user = OC.getCurrentUser();

  if (user.uid === false) {
    return null;
  }

  return {
    uid: user.uid,
    displayName: user.displayName
  };
}
//# sourceMappingURL=user.js.map

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

/***/ "./src/document.js":
/*!*************************!*\
  !*** ./src/document.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nextcloud-router */ "./node_modules/nextcloud-router/dist/index.js");
/* harmony import */ var nextcloud_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nextcloud_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nextcloud-auth */ "./node_modules/nextcloud-auth/dist/index.js");
/* harmony import */ var nextcloud_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/config */ "./src/services/config.tsx");
/* harmony import */ var _helpers_guestName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/guestName */ "./src/helpers/guestName.js");
/* harmony import */ var _services_postMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/postMessage */ "./src/services/postMessage.tsx");
/* harmony import */ var _helpers_mobile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/mobile */ "./src/helpers/mobile.js");
/* harmony import */ var _helpers_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/url */ "./src/helpers/url.js");







var PostMessages = new _services_postMessage__WEBPACK_IMPORTED_MODULE_4__["default"]({
  parent: window.parent,
  loolframe: function loolframe() {
    return document.getElementById('loleafletframe').contentWindow;
  }
});

var showLoadingIndicator = function showLoadingIndicator() {
  return document.getElementById('loadingContainer').classList.add('icon-loading');
};

var hideLoadingIndicator = function hideLoadingIndicator() {
  return document.getElementById('loadingContainer').classList.remove('icon-loading');
};

showLoadingIndicator();
$.widget('oc.guestNamePicker', {
  _create: function _create() {
    hideLoadingIndicator();
    var text = document.createElement('div');
    text.setAttribute('style', 'margin: 0 auto; margin-top: 100px; text-align: center;');
    text.innerHTML = t('richdocuments', 'Please choose your nickname to continue as guest user.');
    var div = document.createElement('div');
    div.setAttribute('style', 'margin: 0 auto; width: 250px; display: flex;');
    var nick = '<input type="text" placeholder="' + t('richdocuments', 'Nickname') + '" id="nickname" style="flex-grow: 1; border-right:none; border-top-right-radius: 0; border-bottom-right-radius: 0">';
    var btn = '<input style="border-left:none; border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -3px" type="button" id="btn" type="button" value="' + t('richdocuments', 'Set') + '">';
    div.innerHTML = nick + btn;
    $('#documents-content').prepend(div);
    $('#documents-content').prepend(text);

    var setGuestNameSubmit = function setGuestNameSubmit() {
      var username = $('#nickname').val();
      Object(_helpers_guestName__WEBPACK_IMPORTED_MODULE_3__["setGuestNameCookie"])(username);
      window.location.reload(true);
    };

    $('#nickname').keyup(function (event) {
      if (event.which === 13) {
        setGuestNameSubmit();
      }
    });
    $('#btn').click(function () {
      return setGuestNameSubmit();
    });
  }
});
/**
 * Type definitions for WOPI Post message objects
 *
 * @typedef {Object} View
 * @property {Number} ViewId
 * @property {string} UserName
 * @property {string} UserId
 * @property {Number} Color
 * @property {Boolean} ReadOnly
 * @property {Boolean} IsCurrentView
 */

var documentsMain = {
  isEditorMode: false,
  isViewerMode: false,
  isFrameReady: false,
  ready: false,
  fileName: null,
  baseName: null,
  canShare: false,
  canEdit: false,
  renderComplete: false,
  // false till page is rendered with all required data about the document(s)
  $deferredVersionRestoreAck: null,
  wopiClientFeatures: null,
  // generates docKey for given fileId
  _generateDocKey: function _generateDocKey(wopiFileId) {
    var canonicalWebroot = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('canonical_webroot');
    var ocurl = Object(nextcloud_router__WEBPACK_IMPORTED_MODULE_0__["getRootUrl"])() + '/index.php/apps/richdocuments/wopi/files/' + wopiFileId;

    if (canonicalWebroot) {
      if (!canonicalWebroot.startsWith('/')) {
        canonicalWebroot = '/' + canonicalWebroot;
      }

      _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].update('canonical_webroot', canonicalWebroot);
      ocurl = ocurl.replace(Object(nextcloud_router__WEBPACK_IMPORTED_MODULE_0__["getRootUrl"])(), canonicalWebroot);
    }

    return ocurl;
  },
  UI: {
    /* Editor wrapper HTML */
    container: '<div id="mainContainer" class="claro">' + '</div>',
    viewContainer: '<div id="revViewerContainer" class="claro">' + '<div id="revViewer"></div>' + '</div>',
    showViewer: function showViewer(fileId, title) {
      // remove previous viewer, if open, and set a new one
      if (documentsMain.isViewerMode) {
        $('#revViewer').remove();
        $('#revViewerContainer').prepend($('<div id="revViewer">'));
      }

      var urlsrc = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_6__["getWopiUrl"])({
        fileId: fileId,
        title: title,
        readOnly: true
      }); // access_token - must be passed via a form post

      var accessToken = encodeURIComponent(documentsMain.token); // form to post the access token for WOPISrc

      var form = '<form id="loleafletform_viewer" name="loleafletform_viewer" target="loleafletframe_viewer" action="' + urlsrc + '" method="post">' + '<input name="access_token" value="' + accessToken + '" type="hidden"/></form>'; // iframe that contains the Collabora Online Viewer

      var frame = '<iframe id="loleafletframe_viewer" name="loleafletframe_viewer" nonce="' + btoa(Object(nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__["getRequestToken"])()) + '" style="width:100%;height:100%;position:absolute;"/>';
      $('#revViewer').append(form);
      $('#revViewer').append(frame); // submit that

      $('#loleafletform_viewer').submit();
      documentsMain.isViewerMode = true; // for closing revision mode

      $('#revViewerContainer .closeButton').click(function (e) {
        e.preventDefault();
        documentsMain.onCloseViewer();
      });
    },
    loadRevViewerContainer: function loadRevViewerContainer() {
      if (!$('revViewerContainer').length) {
        $(document.body).prepend(documentsMain.UI.viewContainer);
        var closeButton = $('<button class="icon-close closeButton" title="' + t('richdocuments', 'Close version preview') + '"/>');
        $('#revViewerContainer').prepend(closeButton);
      }
    },
    showEditor: function showEditor(title, fileId, action) {
      if (!documentsMain.renderComplete) {
        setTimeout(function () {
          documentsMain.UI.showEditor(title, fileId, action);
        }, 10);
        console.debug('Waiting for page to render…');
        return;
      }

      OC.Util.History.addOnPopStateHandler(_.bind(documentsMain.onClose));
      OC.Util.History.pushState();
      PostMessages.sendPostMessage('parent', 'loading');
      hideLoadingIndicator();
      $(document.body).addClass('claro');
      $(document.body).prepend(documentsMain.UI.container);
      var urlsrc = Object(_helpers_url__WEBPACK_IMPORTED_MODULE_6__["getWopiUrl"])({
        fileId: fileId,
        title: title,
        readOnly: false,
        closeButton: true,
        revisionHistory: true
      }); // access_token - must be passed via a form post

      var accessToken = encodeURIComponent(documentsMain.token); // form to post the access token for WOPISrc

      var form = '<form id="loleafletform" name="loleafletform" target="loleafletframe" action="' + urlsrc + '" method="post">' + '<input name="access_token" value="' + accessToken + '" type="hidden"/></form>'; // iframe that contains the Collabora Online

      var frame = '<iframe id="loleafletframe" name="loleafletframe" nonce="' + btoa(Object(nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__["getRequestToken"])()) + '" scrolling="no" allowfullscreen style="width:100%;height:100%;position:absolute;" />';
      $('#mainContainer').append(form);
      $('#mainContainer').append(frame); // Listen for App_LoadingStatus as soon as possible

      $('#loleafletframe').ready(function () {
        var editorInitListener = function editorInitListener(_ref) {
          var parsed = _ref.parsed,
              data = _ref.data;
          console.debug('[document] editorInitListener: Received post message ', parsed);
          var msgId = parsed.msgId,
              args = parsed.args;

          if (msgId !== 'App_LoadingStatus') {
            return;
          } // Pass though all messages to viewer.js if not direct editing


          if (!Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["isDirectEditing"])()) {
            PostMessages.sendPostMessage('parent', data);
          }

          switch (args.Status) {
            case 'Frame_Ready':
              documentsMain.isFrameReady = true;
              documentsMain.wopiClientFeatures = args.Features;
              Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('documentLoaded');
              break;

            case 'Document_Loaded':
              PostMessages.unregisterPostMessageHandler(editorInitListener); // Hide buttons when using the mobile app integration

              if (Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["isDirectEditing"])()) {
                PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Button', {
                  id: 'fullscreen'
                });
                PostMessages.sendWOPIPostMessage('loolframe', 'Hide_Menu_Item', {
                  id: 'fullscreen'
                });
              }

              break;

            case 'Failed':
              // Loading failed but editor shows the error
              documentsMain.isFrameReady = true;
              break;
          }
        };

        PostMessages.registerPostMessageHandler(editorInitListener); // In case of editor inactivity

        setTimeout(function () {
          if (!documentsMain.isFrameReady) {
            var message = {
              'MessageId': 'App_LoadingStatus',
              'Values': {
                'Status': 'Timeout'
              }
            };
            editorInitListener({
              data: JSON.stringify(message),
              parsed: message
            });
          }
        }, 15000);
      });
      $('#loleafletframe').load(function () {
        var ViewerToLool = ['Action_FollowUser', 'Host_VersionRestore', 'Action_RemoveView'];
        PostMessages.registerPostMessageHandler(function (_ref2) {
          var parsed = _ref2.parsed,
              data = _ref2.data;
          console.debug('[document] Received post message ', parsed);
          var msgId = parsed.msgId,
              args = parsed.args,
              deprecated = parsed.deprecated;

          if (deprecated) {
            return;
          }

          if (documentsMain.isViewerMode) {
            var _fileId = args.fileId,
                _title = args.title,
                version = args.version;

            switch (parsed.msgId) {
              case 'Action_loadRevViewer':
                documentsMain.UI.loadRevViewerContainer();

                if (_fileId) {
                  _fileId += '_' + _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('instanceId');

                  if (version) {
                    _fileId += "_".concat(version);
                    _title += "_".concat(version);
                  }

                  documentsMain.UI.showViewer(_fileId, _title);
                }

                break;

              case 'Host_VersionRestore':
                // resolve the deferred object immediately if client doesn't support version states
                if (!documentsMain.wopiClientFeatures || !documentsMain.wopiClientFeatures.VersionStates) {
                  console.error('No version support'); // Not forwarding message to collabora

                  return;
                }

                documentsMain.onCloseViewer();
                break;

              case 'App_VersionRestore':
                // Status = Pre_Restore_Ack -> Ready to restore version
                break;

              default:
                return;
            }
          } // Pass all messages to viewer if not direct editing or


          if (!Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["isDirectEditing"])() && ViewerToLool.indexOf(msgId) === -1) {
            PostMessages.sendPostMessage('parent', data);
          } // Pass messages from viewer to lool


          if (ViewerToLool.indexOf(msgId) >= 0) {
            return PostMessages.sendPostMessage('loolframe', data);
          }

          if (Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["isMobileInterfaceAvailable"])()) {
            if (msgId === 'Download_As') {
              return Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('downloadAs', args);
            }

            if (msgId === 'File_Rename') {
              return Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('fileRename', args);
            } else if (msgId === 'UI_Paste') {
              documentsMain.callMobileMessage('paste');
              return;
            }

            if (msgId === 'UI_Close') {
              Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('close');
            } else if (msgId === 'UI_InsertGraphic') {
              Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('insertGraphic');
            } else if (msgId === 'UI_Share') {
              Object(_helpers_mobile__WEBPACK_IMPORTED_MODULE_5__["callMobileMessage"])('share');
            } // Fallback to web UI for SaveAs, otherwise ignore other post messages


            if (msgId !== 'UI_SaveAs') {
              return;
            }
          }

          switch (parsed.msgId) {
            case 'UI_Close':
            case 'close':
              documentsMain.onClose();
              break;
            // Messages received from the viewer

            case 'postAsset':
              documentsMain.postAsset(args.FileName, args.Url);
              break;

            case 'UI_FileVersions':
            case 'rev-history':
              documentsMain.UI.loadRevViewerContainer();
              documentsMain.UI.showViewer(documentsMain.fileId, documentsMain.title);
              break;

            case 'RD_Version_Restored':
              $('#loleafletform_viewer').submit();
              break;

            default:
              console.debug('[document] Unhandled post message', parsed);
          }

          if (msgId === 'UI_SaveAs') {
            // TODO Move to file picker dialog with input field
            OC.dialogs.prompt(t('richdocuments', 'Please enter the filename to store the document as.'), t('richdocuments', 'Save As'), function (result, value) {
              if (result === true && value) {
                PostMessages.sendWOPIPostMessage('loolframe', 'Action_SaveAs', {
                  'Filename': value
                });
              }
            }, true, t('richdocuments', 'New filename'), false).then(function () {
              var $dialog = $('.oc-dialog:visible');
              var $buttons = $dialog.find('button');
              $buttons.eq(0).text(t('richdocuments', 'Cancel'));
              $buttons.eq(1).text(t('richdocuments', 'Save'));
            });
          }
        }); // Tell the LOOL iframe that we are ready now

        PostMessages.sendWOPIPostMessage('loolframe', 'Host_PostmessageReady', {});
      }); // submit that

      $('#loleafletform').submit();
    },
    hideEditor: function hideEditor() {
      // Fade out editor
      $('#mainContainer').fadeOut('fast', function () {
        $('#mainContainer').remove();
        $('#content-wrapper').fadeIn('fast');
        $(document.body).removeClass('claro');
      });
    }
  },
  onStartup: function onStartup() {
    var fileId; // Does anything indicate that we need to autostart a session?

    fileId = window.getURLParameter('fileId').replace(/^\W*/, '');

    if (fileId && Number.isInteger(Number(fileId)) && $('#nickname').length === 0) {
      documentsMain.isEditorMode = true;
      documentsMain.originalFileId = fileId;
    }

    documentsMain.ready = true;
  },
  initSession: function initSession() {
    documentsMain.urlsrc = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('urlsrc');
    documentsMain.fullPath = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('path');
    documentsMain.token = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('token');
    documentsMain.fileId = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('fileId');
    documentsMain.fileName = _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('title');
    documentsMain.canEdit = Boolean(_services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('permissions') & OC.PERMISSION_UPDATE);
    documentsMain.canShare = typeof OC.Share !== 'undefined' && _services_config__WEBPACK_IMPORTED_MODULE_2__["default"].get('permissions') & OC.PERMISSION_SHARE;
    $('footer,nav').hide(); // fade out file list and show the document

    $('#content-wrapper').fadeOut('fast').promise().done(function () {
      documentsMain.loadDocument(documentsMain.fileName, documentsMain.fileId);
    });
  },
  loadDocument: function loadDocument(title, fileId) {
    documentsMain.UI.showEditor(title, fileId, 'write');
  },
  onEditorShutdown: function onEditorShutdown(message) {
    OC.Notification.show(message);
    $(window).off('beforeunload');
    $(window).off('unload');

    if (documentsMain.isEditorMode) {
      documentsMain.isEditorMode = false;
    } else {
      setTimeout(OC.Notification.hide, 7000);
    }

    documentsMain.UI.hideEditor();
    $('footer,nav').show();
  },
  onClose: function onClose() {
    documentsMain.isEditorMode = false;
    $(window).off('beforeunload');
    $(window).off('unload');
    $('footer,nav').show();
    documentsMain.UI.hideEditor();
    PostMessages.sendPostMessage('parent', 'close', '*');
  },
  onCloseViewer: function onCloseViewer() {
    $('#revisionsContainer *').off();
    $('#revPanelContainer').remove();
    $('#revViewerContainer').remove();
    documentsMain.isViewerMode = false;
    $('#loleafletframe').focus();
  },
  postAsset: function postAsset(filename, url) {
    PostMessages.sendWOPIPostMessage('loolframe', 'Action_InsertGraphic', {
      filename: filename,
      url: url
    });
  },
  postGrabFocus: function postGrabFocus() {
    PostMessages.sendWOPIPostMessage('loolframe', 'Grab_Focus');
  }
};
$(document).ready(function () {
  if (!OCA.RichDocuments) {
    OCA.RichDocuments = {};
  }

  if (!OC.Share) {
    OC.Share = {};
  }

  OCA.RichDocuments.documentsMain = documentsMain;

  if (Object(_helpers_guestName__WEBPACK_IMPORTED_MODULE_3__["shouldAskForGuestName"])()) {
    PostMessages.sendPostMessage('parent', 'loading');
    $('#documents-content').guestNamePicker();
  } else {
    documentsMain.initSession();
  }

  documentsMain.renderComplete = true;
  var viewport = document.querySelector('meta[name=viewport]');
  viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  documentsMain.onStartup();
  window.documentsMain = documentsMain;
});

/***/ }),

/***/ "./src/helpers/guestName.js":
/*!**********************************!*\
  !*** ./src/helpers/guestName.js ***!
  \**********************************/
/*! exports provided: getGuestNameCookie, setGuestNameCookie, shouldAskForGuestName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGuestNameCookie", function() { return getGuestNameCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGuestNameCookie", function() { return setGuestNameCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldAskForGuestName", function() { return shouldAskForGuestName; });
/* harmony import */ var _services_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/config */ "./src/services/config.tsx");
/* harmony import */ var nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nextcloud-auth */ "./node_modules/nextcloud-auth/dist/index.js");
/* harmony import */ var nextcloud_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobile */ "./src/helpers/mobile.js");
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




var getGuestNameCookie = function getGuestNameCookie() {
  var name = 'guestUser=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArr = decodedCookie.split(';');

  for (var i = 0; i < cookieArr.length; i++) {
    var c = cookieArr[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

var setGuestNameCookie = function setGuestNameCookie(username) {
  if (username !== '') {
    document.cookie = 'guestUser=' + encodeURIComponent(username) + '; path=/';
  }
};

var shouldAskForGuestName = function shouldAskForGuestName() {
  return !_mobile__WEBPACK_IMPORTED_MODULE_2__["default"].isDirectEditing() && Object(nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__["getCurrentUser"])().uid === null && _services_config__WEBPACK_IMPORTED_MODULE_0__["default"].get('userId') === null && getGuestNameCookie() === '' && _services_config__WEBPACK_IMPORTED_MODULE_0__["default"].get('permissions') & OC.PERMISSION_UPDATE;
};



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

/***/ "./src/helpers/mobile.js":
/*!*******************************!*\
  !*** ./src/helpers/mobile.js ***!
  \*******************************/
/*! exports provided: default, isDirectEditing, callMobileMessage, isMobileInterfaceAvailable, isMobileInterfaceOnAndroid, isMobileInterfaceOnIos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirectEditing", function() { return isDirectEditing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callMobileMessage", function() { return callMobileMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobileInterfaceAvailable", function() { return isMobileInterfaceAvailable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobileInterfaceOnAndroid", function() { return isMobileInterfaceOnAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobileInterfaceOnIos", function() { return isMobileInterfaceOnIos; });
/* harmony import */ var _services_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/config */ "./src/services/config.tsx");
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


var isDirectEditing = function isDirectEditing() {
  return _services_config__WEBPACK_IMPORTED_MODULE_0__["default"].get('directEdit');
};

var isMobileInterfaceAvailable = function isMobileInterfaceAvailable() {
  return window.RichDocumentsMobileInterface || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface;
};

var isMobileInterfaceOnIos = function isMobileInterfaceOnIos() {
  return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface;
};

var isMobileInterfaceOnAndroid = function isMobileInterfaceOnAndroid() {
  return window.RichDocumentsMobileInterface;
};

var callMobileMessage = function callMobileMessage(messageName, attributes) {
  console.debug('callMobileMessage', messageName, attributes);
  var message = messageName;

  if (typeof attributes !== 'undefined') {
    message = {
      MessageName: messageName,
      Values: attributes
    };
  }

  var attributesString = null;

  try {
    attributesString = JSON.stringify(attributes);
  } catch (e) {
    attributesString = null;
  } // Forward to mobile handler


  if (window.RichDocumentsMobileInterface && typeof window.RichDocumentsMobileInterface[messageName] === 'function') {
    if (attributesString === null || typeof attributesString === 'undefined') {
      window.RichDocumentsMobileInterface[messageName]();
    } else {
      window.RichDocumentsMobileInterface[messageName](attributesString);
    }
  } // iOS webkit fallback


  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface) {
    window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage(message);
  }
};

/* harmony default export */ __webpack_exports__["default"] = ({
  isDirectEditing: isDirectEditing,
  callMobileMessage: callMobileMessage
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


/***/ })

/******/ });
//# sourceMappingURL=document.js.map