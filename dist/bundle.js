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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/kdr/magic/proj/filtersort/js/index.js: Expected corresponding JSX closing tag for <input> (102:105)\\n\\n\\u001b[0m \\u001b[90m 100 | \\u001b[39m\\tlet loaded \\u001b[33m=\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33mLoading\\u001b[39m \\u001b[33mWasm\\u001b[39m \\u001b[33mButton\\u001b[39m\\u001b[33m...\\u001b[39m\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 101 | \\u001b[39m\\t\\u001b[36mif\\u001b[39m (wasmLoaded) {\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 102 | \\u001b[39m\\t\\tloaded \\u001b[33m=\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33minput\\u001b[39m type\\u001b[33m=\\u001b[39m\\u001b[32m\\\"text\\\"\\u001b[39m onChange\\u001b[33m=\\u001b[39m{(e) \\u001b[33m=>\\u001b[39m {doSomeWasm(immutableListings\\u001b[33m,\\u001b[39m e\\u001b[33m.\\u001b[39mtarget\\u001b[33m.\\u001b[39mvalue)}}\\u001b[33m>\\u001b[39m\\u001b[33mWASM\\u001b[39m \\u001b[33mNOW\\u001b[39m\\u001b[33m!\\u001b[39m\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mbutton\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m\\t\\t                                                                                                       \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 103 | \\u001b[39m\\t}\\u001b[0m\\n\\u001b[0m \\u001b[90m 104 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 105 | \\u001b[39m\\t\\u001b[36mreturn\\u001b[39m (\\u001b[0m\\n    at Object.raise (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:7017:17)\\n    at Object.jsxParseElementAt (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:4082:16)\\n    at Object.jsxParseElement (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:4108:17)\\n    at Object.parseExprAtom (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:4115:19)\\n    at Object.parseExprSubscripts (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9259:23)\\n    at Object.parseMaybeUnary (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9239:21)\\n    at Object.parseExprOps (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9109:23)\\n    at Object.parseMaybeConditional (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9082:23)\\n    at Object.parseMaybeAssign (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9037:21)\\n    at Object.parseMaybeAssign (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9069:25)\\n    at Object.parseExpression (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:8989:23)\\n    at Object.parseStatementContent (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10819:23)\\n    at Object.parseStatement (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10690:17)\\n    at Object.parseBlockOrModuleBlockBody (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11264:25)\\n    at Object.parseBlockBody (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11251:10)\\n    at Object.parseBlock (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11235:10)\\n    at Object.parseStatementContent (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10766:21)\\n    at Object.parseStatement (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10690:17)\\n    at Object.parseIfStatement (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11042:28)\\n    at Object.parseStatementContent (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10735:21)\\n    at Object.parseStatement (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10690:17)\\n    at Object.parseBlockOrModuleBlockBody (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11264:25)\\n    at Object.parseBlockBody (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11251:10)\\n    at Object.parseBlock (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:11235:10)\\n    at Object.parseFunctionBody (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10252:24)\\n    at Object.parseArrowExpression (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:10209:10)\\n    at Object.parseParenAndDistinguishExpression (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9838:12)\\n    at Object.parseExprAtom (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9594:21)\\n    at Object.parseExprAtom (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:4120:20)\\n    at Object.parseExprSubscripts (/home/kdr/magic/proj/filtersort/node_modules/@babel/parser/lib/index.js:9259:23)\");\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });