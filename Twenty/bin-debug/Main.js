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
        _this._isEliminate = false; //记录砖块是否已消除
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
    //创建游戏背景
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
        this.stage.frameRate = Number(60);
    };
    //鼠标事件监听
    Main.prototype.init = function () {
        this.timer = new egret.Timer(10000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.creatOneRowBoxs, this);
        this.timer.start();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
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
    //鼠标点击得到box，监听移动事件，移除box在map中的数据
    Main.prototype.mouseDown = function (evt) {
        // console.log("Mouse Down.");
        this._clickElement = this.getElement(evt.stageX, evt.stageY);
        if (this._clickElement) {
            DataManage.instance().delete(this._clickElement);
            this._touchStatus = true;
            this._isEliminate = false;
            this.off_XY.x = evt.stageX - this._clickElement.x;
            this.off_XY.y = evt.stageY - this._clickElement.y;
            DataManage.instance().map[this._clickElement.index] = false;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
    };
    Main.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x = evt.stageX - this.off_XY.x;
            var y = evt.stageY - this.off_XY.y;
            var point = this.isInBorder(x, y); //边界处理
            x = point.x;
            y = point.y;
            var hitList = DataManage.instance().getHitList(this._clickElement);
            if (hitList.length > 0) {
                if (hitList.length == 1) {
                    if (this._clickElement.isEquality(hitList[0])) {
                        if (this._clickElement.isEliminate(hitList[0])) {
                            this._isEliminate = true;
                            this._clickElement.eliminate(hitList[0], true);
                            var boxs = this._clickElement.getUpAllBox();
                            boxs.forEach(function (value) {
                                //console.log('移动中消除后上方方块触发下落事件=' + value.index);
                                value.drop();
                            });
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                            return;
                        }
                    }
                    else {
                        point = this._clickElement.simpleHitHandle(x, y, hitList[0]);
                    }
                }
                else if (hitList.length == 2) {
                    //console.log('与两个物体发生碰撞');
                    if (this._clickElement.isEquality(hitList[0]) || this._clickElement.isEquality(hitList[1])) {
                        if (this._clickElement.isEquality(hitList[0])) {
                            //console.log('与不同字的障碍做碰撞处理');
                            point = this._clickElement.simpleHitHandle(x, y, hitList[1]);
                        }
                        else {
                            //console.log('与不同字的障碍做碰撞处理');
                            point = this._clickElement.simpleHitHandle(x, y, hitList[0]);
                        }
                    }
                    else {
                        // console.log('与两字碰撞且没有同字');
                        point = this._clickElement.doubleHitHandle(x, y, hitList[0], hitList[1]);
                    }
                }
                else if (hitList.length == 3) {
                    //  console.log('与三个障碍相撞');
                    point = new egret.Point(this._clickElement.x, this._clickElement.y);
                }
            }
            this._clickElement.x = point.x; //没有碰撞的处理，直接赋值
            this._clickElement.y = point.y;
            var _index = Util.getIndexByXy(point.x, point.y);
            var off_X = _index - this._clickElement.index;
            if (Math.abs(off_X) == 1) {
                var e = new GameEvent(GameEvent.BOXDROP);
                var upBoxList = this._clickElement.getUpAllBox();
                if (upBoxList.length > 0) {
                    for (var i = 0; i < upBoxList.length; i++) {
                        upBoxList[i].drop();
                    }
                }
            }
            this._clickElement.index = _index;
        }
    };
    Main.prototype.mouseUp = function (evt) {
        //  console.log("Mouse Up.");
        if (this._touchStatus && !this._isEliminate) {
            this.drop();
        }
        if (this.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        this._touchStatus = false;
    };
    //边界判断
    Main.prototype.isInBorder = function (x, y) {
        var left_bottom_x = 60;
        var left_bottom_y = 895;
        var right_top_x = 600;
        var right_top_y = 265;
        if (x < left_bottom_x) {
            x = left_bottom_x;
        }
        if (x > right_top_x) {
            x = right_top_x;
        }
        if (y < right_top_y) {
            y = right_top_y;
        }
        if (y > left_bottom_y) {
            y = left_bottom_y;
        }
        return new egret.Point(x, y);
    };
    //松开之后的下落，有障碍则停止，字相同则合成
    Main.prototype.drop = function () {
        var _index = this._clickElement.index;
        var point = Util.getPointByIndex(this._clickElement.index);
        for (var i = 0; i < 8 - point.y; i++) {
            this._clickElement.index = _index - 7 * i;
            if (DataManage.instance().map[this._clickElement.index]) {
                var box = Util.getElementByIndex(this._clickElement.index);
                if (this._clickElement.isEquality(box)) {
                    this._clickElement.eliminate(box, false);
                    this._clickElement.moveto(this._clickElement.index, true);
                }
                else {
                    this._clickElement.index += 7;
                    this._clickElement.moveto(this._clickElement.index, false);
                    DataManage.instance().map[this._clickElement.index] = true;
                    DataManage.instance().elements.push(this._clickElement);
                }
                return;
            }
        }
        this._clickElement.moveto(this._clickElement.index, false);
        DataManage.instance().map[this._clickElement.index] = true;
        DataManage.instance().elements.push(this._clickElement);
    };
    //生成砖块
    Main.prototype.creatOneRowBoxs = function () {
        DataManage.instance().maxToMinSort();
        //地图中所有方块上移，如果触顶则游戏结束
        for (var _i = 0, _a = DataManage.instance().elements; _i < _a.length; _i++) {
            var value = _a[_i];
            if (DataManage.instance().map[value.index]) {
                var point = Util.getPointByIndex(value.index);
                if (point.y == 0) {
                    DataManage.instance().isGameOver = true;
                    this.timer.stop();
                    return;
                }
                DataManage.instance().map[value.index] = false;
                value.index += 7;
                DataManage.instance().map[value.index] = true;
                value.moveto(value.index, false);
            }
        }
        //最下面一排生成新的方块，字数不能与上方的相等
        if (!DataManage.instance().isGameOver) {
            for (var i = 0; i < 7; i++) {
                var num = Math.floor(Math.random() * (DataManage.instance().maxNum - 2));
                var box = Util.getElementByIndex(i + 7);
                if (box && box.num == num) {
                    num = (num + 1) % DataManage.instance().maxNum;
                }
                var _element = new element(num, i);
                DataManage.instance().elements.push(_element);
                this.addChild(_element);
                DataManage.instance().map[i] = true;
                _element.moveto(_element.index, false);
            }
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
