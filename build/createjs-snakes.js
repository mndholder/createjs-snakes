(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createjs-snakes"] = factory();
	else
		root["createjs-snakes"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATEJS_TIMING_MODE = createjs.Ticker.RAF_SYNCHED;
exports.CREATEJS_FRAMERATE = 20;
exports.GRADIENT_TOP_COLOR = '#182848';
exports.GRADIENT_BOTTOM_COLOR = '#4b6cb7';
exports.LINES_COUNT = 20;
exports.SNAKES_PER_LINE_COUNT = 3;
exports.SNAKE_LENGTH = 10;
exports.SNAKE_COLOR = '#FFF';
exports.SNAKE_ALPHA_FRAMES = [0, 0.1, 0.2, 0.3, 0.3, 0.3, 0.3, 0.25, 0.2, 0.15, 0.14, 0.13, 0.12, 0.1];
exports.SNAKE_FADE_STEP = 0.01;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_scene_1 = __webpack_require__(2);
exports.MainScene = main_scene_1.MainScene;
function start(canvas) {
    return new main_scene_1.MainScene(canvas).start();
}
exports.start = start;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scene_1 = __webpack_require__(3);
var snake_row_container_1 = __webpack_require__(4);
var constants = __webpack_require__(0);
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.containers = [];
        _this._initSceneObjects();
        return _this;
    }
    MainScene.prototype.render = function () {
        this.containers.forEach(function (container) { return container.play(); });
        _super.prototype.render.call(this);
    };
    MainScene.prototype.setBgColors = function (top, bottom) {
        this._initBackground(top, bottom);
    };
    MainScene.prototype._initSceneObjects = function () {
        this._initBackground(constants.GRADIENT_TOP_COLOR, constants.GRADIENT_BOTTOM_COLOR);
        this._initSnakeContainers();
    };
    MainScene.prototype._initBackground = function (topColor, bottomColor) {
        this.removeChild(this.backgroundShape);
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics
            .beginLinearGradientFill([topColor, bottomColor], [0, 1], 0, 20, 0, this.canvasHeight - 20)
            .drawRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.backgroundShape.cache(0, 0, this.canvasWidth, this.canvasHeight);
        this.addChildAt(this.backgroundShape, 0);
        return this.backgroundShape;
    };
    MainScene.prototype._initSnakeContainers = function () {
        var size = this.canvasHeight / constants.LINES_COUNT;
        for (var i = 0; i < constants.LINES_COUNT; i++) {
            var container = new snake_row_container_1.SnakeRowContainer(constants.SNAKES_PER_LINE_COUNT, size, constants.SNAKE_LENGTH, this.canvasWidth);
            this.containers.push(container);
            container.y = i * size;
            this.addChild(container);
        }
    };
    return MainScene;
}(scene_1.Scene));
exports.MainScene = MainScene;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._started = false;
        return _this;
    }
    Object.defineProperty(Scene.prototype, "canvasWidth", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "canvasHeight", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.start = function () {
        if (!this._started) {
            this._attachEvents();
            this._started = true;
            this.dispatchEvent(new createjs.Event('start', true, true));
        }
        return this;
    };
    Scene.prototype.stop = function () {
        this._started = false;
        this._detachEvents();
        this.dispatchEvent(new createjs.Event('stop', true, true));
        return this;
    };
    Scene.prototype.render = function () {
        this.update();
    };
    Scene.prototype._attachEvents = function () {
        this.render = this.render.bind(this);
        createjs.Ticker.addEventListener('tick', this.render);
    };
    Scene.prototype._detachEvents = function () {
        this.removeAllEventListeners();
        createjs.Ticker.removeEventListener('tick', this.render);
    };
    return Scene;
}(createjs.Stage));
exports.Scene = Scene;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = __webpack_require__(5);
var random_1 = __webpack_require__(6);
var SnakeRowContainer = /** @class */ (function (_super) {
    __extends(SnakeRowContainer, _super);
    function SnakeRowContainer(snakeCount, snakeSize, snakeLength, maxWidth) {
        if (snakeCount === void 0) { snakeCount = 3; }
        if (snakeSize === void 0) { snakeSize = 30; }
        if (snakeLength === void 0) { snakeLength = 10; }
        if (maxWidth === void 0) { maxWidth = 300; }
        var _this = _super.call(this) || this;
        _this.snakeCount = snakeCount;
        _this.snakeSize = snakeSize;
        _this.snakeLength = snakeLength;
        _this.maxWidth = maxWidth;
        random_1.randomlyDelay(_this._initSnakes.bind(_this), 0, 1000);
        return _this;
    }
    SnakeRowContainer.prototype.play = function () {
        this.children.forEach(function (snake) { return snake.play(); });
    };
    SnakeRowContainer.prototype._initSnakes = function () {
        var _this = this;
        for (var i = 0; i < this.snakeCount; i++) {
            random_1.randomlyDelay(this._createSnake.bind(this), 0, 3000).then(this.addChild.bind(this));
        }
        this.on('fade', function (_a) {
            var target = _a.target;
            _this.removeChild(target);
            _this.addChild(_this._createSnake());
        });
    };
    SnakeRowContainer.prototype._createSnake = function () {
        var x = random_1.rangeInt(0, this.maxWidth / this.snakeSize) * this.snakeSize;
        var snake = new snake_1.Snake(this.snakeLength, this.snakeSize);
        snake.y = 0;
        snake.x = x;
        snake.direction = random_1.chance(0.5) ? snake_1.SnakeDirection.Right : snake_1.SnakeDirection.Left;
        return snake;
    };
    return SnakeRowContainer;
}(createjs.Container));
exports.SnakeRowContainer = SnakeRowContainer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var constants = __webpack_require__(0);
var SnakeDirection;
(function (SnakeDirection) {
    SnakeDirection[SnakeDirection["Left"] = 0] = "Left";
    SnakeDirection[SnakeDirection["Right"] = 1] = "Right";
    SnakeDirection[SnakeDirection["Up"] = 2] = "Up";
    SnakeDirection[SnakeDirection["Down"] = 3] = "Down";
})(SnakeDirection = exports.SnakeDirection || (exports.SnakeDirection = {}));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(length, size, margin, padding, maxSteps) {
        if (length === void 0) { length = 10; }
        if (size === void 0) { size = 30; }
        if (margin === void 0) { margin = 2; }
        if (padding === void 0) { padding = 2; }
        if (maxSteps === void 0) { maxSteps = 10; }
        var _this = _super.call(this) || this;
        _this.length = length;
        _this.size = size;
        _this.margin = margin;
        _this.padding = padding;
        _this.maxSteps = maxSteps;
        _this.direction = SnakeDirection.Left;
        _this._currentFrames = [];
        _this._counter = 0;
        _this._steps = 0;
        _this._stepsLeft = 0;
        _this._stepsRight = 0;
        _this._stepsUp = 0;
        _this._stepsDown = 0;
        _this._addShape(0, 0);
        return _this;
    }
    Snake.prototype.play = function () {
        if (this._steps <= this.maxSteps) {
            this._move();
        }
        else {
            this._fade();
        }
    };
    Snake.prototype._move = function () {
        var _this = this;
        ++this._counter;
        this.children.forEach(function (shape, index) {
            shape.alpha = _this._getNextAlphaFrame(index);
        });
        if (this.children.length >= this.length) {
            this.removeChild(this.getChildAt(0));
            this._currentFrames.splice(0, 1);
        }
        if (this._counter % 3 === 0 && this.children.length < this.length) {
            this._counter = 0;
            this._steps++;
            switch (this.direction) {
                case SnakeDirection.Right:
                    this._addShape(++this._stepsRight * this.size);
                    break;
                case SnakeDirection.Left:
                    this._addShape(-(++this._stepsLeft * this.size));
                    break;
                case SnakeDirection.Down:
                    this._addShape(this.x, ++this._stepsDown * this.size);
                    break;
                case SnakeDirection.Up:
                    this._addShape(this.x, -(++this._stepsUp * this.size));
                    break;
            }
            var event_1 = new createjs.Event('step', true, true);
            event_1.data = { step: this._steps };
            this.dispatchEvent(event_1);
        }
    };
    Snake.prototype._fade = function () {
        var alive = false;
        this.children.forEach(function (shape) {
            shape.alpha -= constants.SNAKE_FADE_STEP;
            shape.alpha > 0 && (alive = true);
        });
        if (!alive) {
            this.dispatchEvent(new createjs.Event('fade', true, true));
        }
    };
    Snake.prototype._addShape = function (x, y) {
        if (y === void 0) { y = 0; }
        var shape = new createjs.Shape();
        shape.graphics
            .beginFill(constants.SNAKE_COLOR)
            .drawRect(x + this.padding, y + this.padding, this.size - this.padding, this.size - this.padding);
        shape.alpha = 0;
        this.addChild(shape);
    };
    Snake.prototype._getNextAlphaFrame = function (shapeIndex) {
        if (this._currentFrames[shapeIndex] === undefined) {
            this._currentFrames[shapeIndex] = 0;
        }
        else if (this._currentFrames[shapeIndex] < constants.SNAKE_ALPHA_FRAMES.length - 1) {
            this._currentFrames[shapeIndex]++;
        }
        return constants.SNAKE_ALPHA_FRAMES[this._currentFrames[shapeIndex]];
    };
    return Snake;
}(createjs.Container));
exports.Snake = Snake;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function range(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.random() * (max - min) + min;
}
exports.range = range;
function rangeInt(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.rangeInt = rangeInt;
function randomlyDelay(fn, from, to, ctx, args) {
    var _this = this;
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 1000; }
    if (ctx === void 0) { ctx = null; }
    if (args === void 0) { args = null; }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(fn.apply(ctx || _this, args));
        }, rangeInt(from, to));
    });
}
exports.randomlyDelay = randomlyDelay;
function chance(p) {
    if (p === void 0) { p = 0.1; }
    return Math.random() <= p;
}
exports.chance = chance;


/***/ })
/******/ ]);
});
//# sourceMappingURL=createjs-snakes.js.map