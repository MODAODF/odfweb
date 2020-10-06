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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/personal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/personal.js":
/*!*************************!*\
  !*** ./src/personal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  var PersonalSettings = function PersonalSettings() {
    this.templateInput = document.getElementById('templateInputField');
    this.templateSelectButton = document.getElementById('templateSelectButton');
    this.templateResetButton = document.getElementById('templateResetButton');
    var self = this;
    this.templateSelectButton.addEventListener('click', function () {
      OC.dialogs.filepicker(t('richdocuments', 'Select a personal template folder'), function (datapath, returntype) {
        self.updateSetting(datapath);
      }, false, 'httpd/unix-directory', true, OC.dialogs.FILEPICKER_TYPE_CHOOSE);
    });
    this.templateResetButton.addEventListener('click', this.resetSettings.bind(this));
  };

  PersonalSettings.prototype.updateSetting = function (path) {
    var self = this;

    this._updateSetting({
      templateFolder: path
    }, function () {
      self.templateInput.value = path;
    }, function () {});
  };

  PersonalSettings.prototype.resetSettings = function () {
    var self = this;

    this._updateSetting({
      templateFolder: ''
    }, function () {
      self.templateInput.value = '';
    }, function () {});
  };

  PersonalSettings.prototype._updateSetting = function (data, successCallback, errorCallback) {
    OC.msg.startAction('#documents-admin-msg', t('richdocuments', 'Saving…'));
    var request = new XMLHttpRequest();
    request.open('POST', OC.filePath('richdocuments', 'ajax', 'personal.php'), true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('requesttoken', OC.requestToken);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.response);
        OC.msg.finishedAction('#documents-admin-msg', response);
        successCallback(response);
      } else {
        errorCallback(this.response);
      }
    };

    request.onerror = function () {
      errorCallback(this.response);
    };

    request.send(JSON.stringify(data));
  };

  return new PersonalSettings();
});

/***/ })

/******/ });
//# sourceMappingURL=personal.js.map