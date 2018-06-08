var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._touchStatus = false; //是否已经点击
        _this.off_XY = new egret.Point(); //记录鼠标点击的偏移位置
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        this.bg = new egret.TextField;
        this.bg.width = 640;
        this.bg.height = 730;
        this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;
        this.bg.y = (this.stage.stageHeight - this.bg.height) / 2;
        this.bg.background = true;
        this.bg.backgroundColor = 0xc2c7cb;
        this.bg.border = true;
        this.bg.borderColor = 0xc2c7cb;
        this.bg.touchEnabled = true;
        this.addChild(this.bg);
        console.log('游戏开始');
        this.init();
        this.creatOneRowBoxs();
    };
    Main.prototype.init = function () {
        this.timer = new egret.Timer(1000, 0);
        //this.timer.addEventListener(egret.TimerEvent.TIMER,this.creatOneRowBoxs,this);
        this.timer.start();
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    };
    //获取鼠标点击位置的box
    Main.prototype.getElement = function (x, y) {
        for (var _i = 0, _a = DataManage.instance().elements; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.hitTestPoint(x, y)) {
                return value;
            }
        }
        return null;
    };
    Main.prototype.mouseDown = function (evt) {
        console.log("Mouse Down.");
        this._clickElement = this.getElement(evt.stageX, evt.stageY);
        if (this._clickElement) {
            // console.log('点击的box的索引=' + this._clickElement.index);
            // console.log('evt.stageX=' + evt.stageX + ',evt.stageY=' + evt.stageY);
            // console.log('this._clickElement.x=' + this._clickElement.box.x + ',this._clickElement.y=' + this._clickElement.box.y);
            this._touchStatus = true;
            this.off_XY.x = evt.stageX - this._clickElement.box.x;
            this.off_XY.y = evt.stageY - this._clickElement.box.y;
            DataManage.instance().map[this._clickElement.index] = false;
            this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        for (var i = 0; i < 56; i++) {
            if (DataManage.instance().map[i]) {
                for (var _i = 0, _a = DataManage.instance().elements; _i < _a.length; _i++) {
                    var value = _a[_i];
                    if (value.index == i) {
                        //console.log(i + '处有障碍');
                        break;
                    }
                }
            }
        }
    };
    Main.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x = evt.stageX - this.off_XY.x;
            var y = evt.stageY - this.off_XY.y;
            var point = this.isInBorder(x, y);
            this._clickElement.box.x = point.x;
            this._clickElement.box.y = point.y;
        }
    };
    Main.prototype.mouseUp = function (evt) {
        console.log("Mouse Up.");
        if (this._touchStatus) {
            this.drop(evt.stageX, evt.stageY);
        }
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        this._touchStatus = false;
    };
    //边界判断
    Main.prototype.isInBorder = function (x, y) {
        var left_bottom = new egret.Point();
        left_bottom = Util.getPointXYByIndex(0);
        var right_top = new egret.Point();
        right_top = Util.getPointXYByIndex(55);
        if (x < left_bottom.x) {
            x = left_bottom.x;
        }
        if (x > right_top.x) {
            x = right_top.x;
        }
        if (y < right_top.y) {
            y = right_top.y;
        }
        if (y > left_bottom.y) {
            y = left_bottom.y;
        }
        return new egret.Point(x, y);
    };
    //松开之后的下落
    Main.prototype.drop = function (x, y) {
        var index = Util.getIndexByXy(x, y);
        var point = Util.getPointByIndex(index);
        if (point.y == 7) {
            return;
        }
        for (var i = point.y; i < 7; i++) {
            var _index = index - 7;
            if (DataManage.instance().map[_index]) {
                var box = Util.getElementByIndex(_index);
                if (Util.isEquality(this._clickElement, box)) {
                    this._clickElement.moveto(_index);
                    this._clickElement.index = _index;
                    DataManage.instance().map[_index] = true;
                    //  if(Util.isEliminate(this._clickElement,box)){
                    this._clickElement.eliminate(box);
                    console.log('字相同移动到' + box.num);
                    //   }
                }
                else {
                    this._clickElement.moveto(index);
                    this._clickElement.index = index;
                    DataManage.instance().map[index] = true;
                    console.log('字不同移动到' + index);
                }
                return;
            }
            index = _index;
        }
        this._clickElement.moveto(index);
        this._clickElement.index = index;
        DataManage.instance().map[index] = true;
    };
    //生成砖块
    Main.prototype.creatOneRowBoxs = function () {
        DataManage.instance().maxToMinSort();
        for (var _i = 0, _a = DataManage.instance().elements; _i < _a.length; _i++) {
            var value = _a[_i];
            if (DataManage.instance().map[value.index]) {
                var point = Util.getPointByIndex(value.index);
                if (point.y == 0) {
                    DataManage.instance().isGameOver = true;
                    this.timer.stop();
                    return;
                }
                if (!DataManage.instance().isGameOver) {
                    DataManage.instance().map[value.index] = false;
                    value.index += 7;
                    DataManage.instance().map[value.index] = true;
                    value.moveto(value.index);
                }
            }
        }
        if (!DataManage.instance().isGameOver) {
            for (var i = 0; i < 7; i++) {
                var num = Math.floor(Math.random() * (DataManage.instance().maxNum - 2));
                var _element = new element(num, i);
                _element.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseDown, this);
                DataManage.instance().elements.push(_element);
                this.addChild(_element);
                DataManage.instance().map[i] = true;
            }
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map