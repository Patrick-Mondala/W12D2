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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n  constructor() {\n    this.towers = [[3, 2, 1], [], []];\n  }\n\n  isValidMove(startTowerIdx, endTowerIdx) {\n      const startTower = this.towers[startTowerIdx];\n      const endTower = this.towers[endTowerIdx];\n\n      if (startTower.length === 0) {\n        return false;\n      } else if (endTower.length == 0) {\n        return true;\n      } else {\n        const topStartDisc = startTower[startTower.length - 1];\n        const topEndDisc = endTower[endTower.length - 1];\n        return topStartDisc < topEndDisc;\n      }\n  }\n\n  isWon() {\n      // move all the discs to the last or second tower\n      return (this.towers[2].length == 3) || (this.towers[1].length == 3);\n  }\n\n  move(startTowerIdx, endTowerIdx) {\n      if (this.isValidMove(startTowerIdx, endTowerIdx)) {\n        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());\n        return true;\n      } else {\n        return false;\n      }\n  }\n\n  print() {\n      console.log(JSON.stringify(this.towers));\n  }\n\n  promptMove(reader, callback) {\n      this.print();\n      reader.question(\"Enter a starting tower: \", start => {\n        const startTowerIdx = parseInt(start);\n        reader.question(\"Enter an ending tower: \", end => {\n          const endTowerIdx = parseInt(end);\n          callback(startTowerIdx, endTowerIdx);\n        });\n      });\n  }\n\n  run(reader, gameCompletionCallback) {\n      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {\n        if (!this.move(startTowerIdx, endTowerIdx)) {\n          console.log(\"Invalid move!\");\n        }\n\n        if (!this.isWon()) {\n          // Continue to play!\n          this.run(reader, gameCompletionCallback);\n        } else {\n          this.print();\n          console.log(\"You win!\");\n          gameCompletionCallback();\n        }\n      });\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/hanoi_view.js":
/*!***************************!*\
  !*** ./src/hanoi_view.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View {\n  constructor(game, $rootEL) {\n    this.game = game;\n    this.$rootEL = $rootEL;\n    this.setupTowers();\n    this.clickTower();\n  }\n\n  setupTowers() {\n    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {\n      let tower = $(\"<ul></ul>\");\n      tower.data(\"towerIdx\", towerIdx);\n      this.$rootEL.append(tower);\n    }\n\n    let towerFirst = this.$rootEL.children(\":first\");\n    for (let i = 0; i < 3; i++) {\n      let disc = $(\"<li></li>\");\n      disc.addClass(\"disc\");\n      switch (i) {\n        case 0:\n          disc.attr(\"id\", \"disc-one\");\n          break;\n        case 1:\n          disc.attr(\"id\", \"disc-two\");\n          break;\n        case 2:\n          disc.attr(\"id\", \"disc-three\");\n          break;\n        default:\n          break;\n      }\n      towerFirst.append(disc);\n    }\n  }\n\n  render() {\n    let $startPile = this.$rootEL.find(`[data-towerIdx]=\"${this.startPile}\"`)\n    // $(`ul:nth-child(${this.startPile})`)\n    console.log(\"found startpile: \" + $startPile);\n    let $endPile = this.$rootEL.find(`[data-towerIdx]=\"${this.endPile}\"`)\n    let $topDisk = $startPile.children(\":first\");\n    $startPile.remove($topDisk);\n    console.log($topDisk);\n    $endPile.append($topDisk);\n  }\n\n  clickTower() {\n      $(\"ul\").on(\"click\", event => {\n          console.log(event.currentTarget);\n        const tower = $(event.currentTarget);\n        this.pile = tower.data(\"towerIdx\");\n        if (this.startPile) {\n            let $startPile = $(\".selected\");\n            $startPile.removeAttr(\"id\", \"selected\");\n            let endPile = this.pile;\n\n            let move = this.game.move(this.startPile, endPile)\n\n            if (move) {\n              this.render();\n            } else {\n              alert(\"Invalid Move. Try again.\")\n            }\n\n            this.startPile = null;\n            this.pile = null;\n        } else {\n            this.startPile = this.pile;\n            tower.attr(\"id\", \"selected\");\n        }\n      });\n  }\n}\n\nmodule.exports = View;\n\n//# sourceURL=webpack:///./src/hanoi_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const HanoiGame = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst HanoiView = __webpack_require__(/*! ./hanoi_view */ \"./src/hanoi_view.js\")\n\n$(() => {\n  const $rootEl = $('.hanoi');\n  const game = new HanoiGame();\n  new HanoiView(game, $rootEl);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });