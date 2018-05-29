var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
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
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(textures) {
        var _this = _super.call(this) || this;
        _this.index = 0; //位置
        _this._isOpen = true; //是否可走
        _this._redSkin = new egret.Bitmap();
        _this._redSkin.texture = textures.getTexture("pot2");
        _this._blackSkin = new egret.Bitmap();
        _this._blackSkin.texture = textures.getTexture("pot1");
        _this.anchorOffsetX = 50;
        _this.anchorOffsetY = 50;
        _this.width = 45;
        _this.height = 45;
        _this.touchEnabled = true;
        _this.addChild(_this._blackSkin);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        return _this;
    }
    //获取可走状态
    Tile.prototype.getStatus = function () {
        return this._isOpen;
    };
    //设置为可走
    Tile.prototype.open = function () {
        if (!this._isOpen) {
            this._isOpen = true;
            this.removeChild(this._redSkin);
            this.addChild(this._blackSkin);
        }
    };
    //设置为不可走
    Tile.prototype.close = function () {
        if (this._isOpen) {
            this._isOpen = false;
            this.removeChild(this._blackSkin);
            this.addChild(this._redSkin);
        }
    };
    //点击后切换为不可走
    Tile.prototype.onClick = function () {
        if (!DataManage.instance()._isS) {
            if (this._isOpen) {
                var evt = new GameEvent(GameEvent.OPEN_TILE);
                evt.open_tile_index = this.index;
                this.dispatchEvent(evt);
            }
            this.close();
        }
    };
    return Tile;
}(egret.Sprite));
__reflect(Tile.prototype, "Tile");
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.open_tile_index = 0;
        return _this;
    }
    GameEvent.OPEN_TILE = "open_tile";
    GameEvent.START_GAME = "start_game";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
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
        //运行游戏
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    //加载资源
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
                        _a.sent(); //加载配置
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent(); //加载资源组
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
        this._viewManage = new ViewManage(this, RES.getRes("gameres_json"));
        this._viewManage.addEventListener(GameEvent.START_GAME, this.startGame, this);
        this._viewManage.addEventListener(GameEvent.OPEN_TILE, this.openTile, this);
    };
    //游戏开始，初始化地图数据，更新界面
    Main.prototype.startGame = function () {
        DataManage.instance().init_tileDatas();
        DataManage.instance().selectTile();
        DataManage.instance().createCatPoint();
        this._viewManage.updateAll();
    };
    //点击tile后关闭tile，如果神经猫无处可走，即游戏结束
    Main.prototype.openTile = function (evt) {
        DataManage.stepNum++;
        DataManage.instance().closeTileByIndex(evt.open_tile_index);
        var rel = DataManage.instance().isHaveNextPointByCat();
        if (rel) {
            this._viewManage.update();
        }
        else {
            this._viewManage.showGameOverView(DataManage.instance()._isS);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var CatAI = (function () {
    function CatAI() {
    }
    //由猫的位置寻找所有的通路达到边缘点
    CatAI.prototype.findPath = function (from) {
        var currentNodeIndexs = [from]; //通路的中心点集合
        var usedNodeIndexs = []; //使用过点集合
        var currentNodeIndex; //当前点位置
        var round; //周围点集合
        var len_round = 0; //周围可使用点的数量
        var rel = true;
        while (rel) {
            if (currentNodeIndexs.length == 0) {
                rel = false;
                return null;
            }
            var newIndexs = [];
            var l = currentNodeIndexs.length;
            for (var t = 0; t < l; t++) {
                currentNodeIndex = currentNodeIndexs.shift();
                round = this.findRound(currentNodeIndex);
                len_round = round.length;
                for (var i = 0; i < len_round; i++) {
                    if (this.map[round[i]]._isUsed) {
                        usedNodeIndexs.push(round[i]);
                    }
                    //中心点周围的点如果被使用或者在中心点集合中则忽略
                    if (usedNodeIndexs.indexOf(round[i]) > -1 || currentNodeIndexs.indexOf(round[i]) > -1) {
                        continue;
                    }
                    this.map[round[i]].preIndex = currentNodeIndex; //当前位置写入前置位置
                    if (this.isExit(round[i])) {
                        return round[i];
                    }
                    newIndexs.push(round[i]); //找出周围6个点中可用的点放入数组
                }
                usedNodeIndexs.push(currentNodeIndex); //当前使用过的点放入使用点集合
            }
            currentNodeIndexs = newIndexs; //在周围的6个点中的可用点中继续寻找中心点
        }
    };
    //寻找下一个移动的点
    CatAI.prototype.findNextPoint = function (catIndex) {
        this.initMap();
        var nextIndex = this.findPath(catIndex);
        //被围住可走
        if (nextIndex == null) {
            return null;
        }
        //被围住不可走,游戏结束
        if (nextIndex == -1) {
            return -1;
        }
        var rel = true;
        var preindex;
        while (rel) {
            preindex = this.map[nextIndex].preIndex;
            if (preindex != catIndex && preindex != -1) {
                nextIndex = preindex;
            }
            else {
                rel = false;
            }
        }
        return nextIndex;
    };
    //是否是出口
    CatAI.prototype.isExit = function (index) {
        var p = Util.getPointByIndex(index);
        var row = p.y;
        var column = p.x;
        if (row == 0 || row == 8 || column == 0 || column == 8) {
            return true;
        }
        return false;
    };
    //随机获取周围的一个点
    CatAI.prototype.getNear = function (_catIndex) {
        var round = this.findRound(_catIndex);
        return round[0];
    };
    //初始化猫的寻路路径
    CatAI.prototype.initMap = function () {
        if (this.map == null) {
            this.map = [];
            for (var i = 0; i < DataManage.tileNum; i++) {
                this.map.push(new CatNode());
            }
        }
        for (var i = 0; i < DataManage.tileNum; i++) {
            this.map[i].clean();
            if (!DataManage.instance().getStatusByIndex(i)) {
                this.map[i]._isUsed = true;
            }
        }
    };
    //返回猫周围6个点的序号
    CatAI.prototype.findRound = function (index) {
        var arr = [];
        var p = Util.getPointByIndex(index);
        var row = p.y;
        var column = p.x;
        var left = column - 1;
        var left_index = Util.GetIndexByPoint(new egret.Point(left, row));
        if (left >= 0 && !this.map[left_index]._isUsed) {
            arr.push(left_index);
        }
        var right = column + 1;
        var right_index = Util.GetIndexByPoint(new egret.Point(right, row));
        if (right <= 8 && !this.map[right_index]._isUsed) {
            arr.push(right_index);
        }
        var top = row - 1;
        var top_index = Util.GetIndexByPoint(new egret.Point(column, top));
        if (top >= 0 && !this.map[top_index]._isUsed) {
            arr.push(top_index);
        }
        var bottom = row + 1;
        var bottom_index = Util.GetIndexByPoint(new egret.Point(column, bottom));
        if (bottom <= 8 && !this.map[bottom_index]._isUsed) {
            arr.push(bottom_index);
        }
        if (row % 2 == 0) {
            var left_top_index = Util.GetIndexByPoint(new egret.Point(left, top));
            if (left >= 0 && top >= 0 && !this.map[left_top_index]._isUsed) {
                arr.push(left_top_index);
            }
            var left_bottom_index = Util.GetIndexByPoint(new egret.Point(left, bottom));
            if (left >= 0 && bottom <= 8 && !this.map[left_bottom_index]._isUsed) {
                arr.push(left_bottom_index);
            }
        }
        else {
            var right_top_index = Util.GetIndexByPoint(new egret.Point(right, top));
            if (right <= 8 && top >= 0 && !this.map[right_top_index]._isUsed) {
                arr.push(right_top_index);
            }
            var right_bottom_index = Util.GetIndexByPoint(new egret.Point(right, bottom));
            if (right <= 8 && bottom <= 8 && !this.map[right_bottom_index]._isUsed) {
                arr.push(right_bottom_index);
            }
        }
        arr = arr.sort();
        return arr;
    };
    return CatAI;
}());
__reflect(CatAI.prototype, "CatAI");
var CatNode = (function () {
    function CatNode() {
        this.preIndex = -1;
        this._isUsed = false;
    }
    CatNode.prototype.clean = function () {
        this.preIndex = -1;
        this._isUsed = false;
    };
    return CatNode;
}());
__reflect(CatNode.prototype, "CatNode");
var DataManage = (function () {
    function DataManage() {
        this.catDefaultIndex = 40; //神经猫的位置
        this._isS = false; //是否赢了
        this._tileDatas = []; //tile是否可走
        this._catIndex = this.catDefaultIndex;
        if (!DataManage._isInit) {
            throw (new Error("error!"));
        }
        this._catAI = new CatAI();
        this.createData();
    }
    DataManage.instance = function () {
        if (!DataManage._isInit) {
            DataManage._isInit = true;
            this._dataManage = new DataManage();
        }
        return DataManage._dataManage;
    };
    //创建地图数据，初始可走
    DataManage.prototype.createData = function () {
        for (var i = 0; i < DataManage.tileNum; i++) {
            this._tileDatas[i] = true;
        }
    };
    //游戏开始时，初始化游戏数据
    DataManage.prototype.init_tileDatas = function () {
        DataManage.stepNum = 0;
        DataManage.catIsAction1mc = true;
        this._isS = false;
        for (var i = 0; i < DataManage.tileNum; i++) {
            this._tileDatas[i] = true;
        }
    };
    //初始化地图障碍
    DataManage.prototype.selectTile = function () {
        var num = 10 + Math.floor(Math.random() * 10);
        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * DataManage.tileNum);
            this._tileDatas[index] = false;
        }
        this._tileDatas[this.catDefaultIndex] = true;
    };
    //将此位置设为不可走
    DataManage.prototype.closeTileByIndex = function (index) {
        this._tileDatas[index] = false;
    };
    //获取位置的障碍信息
    DataManage.prototype.getStatusByIndex = function (index) {
        return this._tileDatas[index];
    };
    //创建猫的位置
    DataManage.prototype.createCatPoint = function () {
        this._catIndex = this.catDefaultIndex;
    };
    //获取猫的位置
    DataManage.prototype.getCatIndex = function () {
        return this._catIndex;
    };
    //神经猫是否有位置可移动，如果可走，更新神经猫的位置
    DataManage.prototype.isHaveNextPointByCat = function () {
        if (this._catAI.isExit(this._catIndex)) {
            this._isS = false;
            return false;
        }
        var nextPointIndex = this._catAI.findNextPoint(this._catIndex);
        if (nextPointIndex == null) {
            DataManage.catIsAction1mc = false;
            this._catIndex = this._catAI.getNear(this._catIndex);
            if (this._catIndex) {
                return true;
            }
            this._isS = true;
            return false;
        }
        if (nextPointIndex == -1) {
            this._isS = true;
            return false;
        }
        this._catIndex = nextPointIndex;
        return true;
    };
    DataManage._isInit = false; //只允许一次初始化
    DataManage.stepNum = 0; //计录步数
    DataManage.catIsAction1mc = true; //神经猫是否播放动作1
    DataManage.tileNum = 81; //地图总tile
    return DataManage;
}());
__reflect(DataManage.prototype, "DataManage");
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super.call(this) || this;
        _this._isAction1mc = true;
        var data = RES.getRes("stay_mc_json");
        var texture = RES.getRes("stay_tex_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        _this._action1mc = new egret.MovieClip(mcFactory.generateMovieClipData("stay"));
        _this._action1mc.gotoAndPlay(1, -1);
        data = RES.getRes("weizhu_mc_json");
        texture = RES.getRes("weizhu_tex_png");
        mcFactory = new egret.MovieClipDataFactory(data, texture);
        _this._action2mc = new egret.MovieClip(mcFactory.generateMovieClipData("weizhu"));
        _this._action2mc.gotoAndPlay(1, -1);
        _this.anchorOffsetX = 30;
        _this.anchorOffsetY = 55;
        _this.playAction();
        return _this;
    }
    Cat.prototype.init = function () {
        this._isAction1mc = true;
        this.playAction();
    };
    Cat.prototype.playAction = function () {
        if (this.numChildren) {
            this.removeChildAt(0);
        }
        if (this._isAction1mc) {
            this.addChild(this._action1mc);
        }
        else {
            this.addChild(this._action2mc);
        }
    };
    Object.defineProperty(Cat.prototype, "isAction1", {
        get: function () {
            return this._isAction1mc;
        },
        set: function (val) {
            if (this._isAction1mc != val) {
                this._isAction1mc = val;
                this.playAction();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var BackGroundPanel = (function (_super) {
    __extends(BackGroundPanel, _super);
    function BackGroundPanel(root, textures) {
        var _this = _super.call(this) || this;
        _this.texture = textures.getTexture("bg");
        root.addChild(_this);
        return _this;
    }
    return BackGroundPanel;
}(egret.Bitmap));
__reflect(BackGroundPanel.prototype, "BackGroundPanel");
var GameOverButtonPanel = (function (_super) {
    __extends(GameOverButtonPanel, _super);
    function GameOverButtonPanel(textures) {
        var _this = _super.call(this) || this;
        _this._reStartBtn = new egret.Sprite();
        _this._reStartBtn.width = 200;
        _this._reStartBtn.height = 103;
        var bitmap = new egret.Bitmap();
        bitmap.texture = textures.getTexture("replay");
        _this._reStartBtn.addChild(bitmap);
        _this._reStartBtn.touchEnabled = true;
        _this.addChild(_this._reStartBtn);
        _this.x = (egret.MainContext.instance.stage.stageWidth - _this.width) / 2 + 120;
        _this.y = (egret.MainContext.instance.stage.stageHeight - _this.height) / 2 + 210;
        return _this;
    }
    return GameOverButtonPanel;
}(egret.Sprite));
__reflect(GameOverButtonPanel.prototype, "GameOverButtonPanel");
var GameOverPanelF = (function (_super) {
    __extends(GameOverPanelF, _super);
    function GameOverPanelF(textures) {
        var _this = _super.call(this) || this;
        var gameOverPanelS = new egret.Bitmap();
        gameOverPanelS.texture = textures.getTexture("failed");
        _this.addChild(gameOverPanelS);
        _this.width = 448;
        _this.height = 361;
        _this.x = (egret.MainContext.instance.stage.stageWidth - _this.width) / 2;
        _this.y = (egret.MainContext.instance.stage.stageHeight - _this.height) / 2;
        _this.addText();
        return _this;
    }
    GameOverPanelF.prototype.addText = function () {
        this.tap_textfield = new egret.TextField();
        this.tap_textfield.width = 400;
        this.tap_textfield.textColor = 0xff0000;
        this.tap_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.tap_textfield.text = "你没有抓住神！经！猫！";
        this.tap_textfield.size = 22;
        this.tap_textfield.x = 20;
        this.tap_textfield.y = 190;
        this.addChild(this.tap_textfield);
        this.rank_textfield = new egret.TextField();
        this.rank_textfield.width = 400;
        this.rank_textfield.textColor = 0xffffff;
        this.rank_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.rank_textfield.text = "精神病院长又发神经病了！";
        this.rank_textfield.size = 22;
        this.rank_textfield.strokeColor = 0x000000;
        this.rank_textfield.stroke = 2;
        this.rank_textfield.x = 20;
        this.rank_textfield.y = 230;
        this.addChild(this.rank_textfield);
    };
    return GameOverPanelF;
}(egret.Sprite));
__reflect(GameOverPanelF.prototype, "GameOverPanelF");
var GameOverPanelS = (function (_super) {
    __extends(GameOverPanelS, _super);
    function GameOverPanelS(textures) {
        var _this = _super.call(this) || this;
        var gameOverPanelS = new egret.Bitmap();
        gameOverPanelS.texture = textures.getTexture("victory");
        _this.addChild(gameOverPanelS);
        _this.width = 448;
        _this.height = 338;
        _this.x = (egret.MainContext.instance.stage.stageWidth - _this.width) / 2;
        _this.y = (egret.MainContext.instance.stage.stageHeight - _this.height) / 2;
        _this.addText();
        return _this;
    }
    GameOverPanelS.prototype.addText = function () {
        var step = DataManage.stepNum;
        this.step_textfield = new egret.TextField();
        this.step_textfield.textColor = 0xff0000;
        this.step_textfield.width = 400;
        this.step_textfield.size = 22;
        this.step_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.step_textfield.text = "您用" + step + "步抓住了神经猫";
        this.step_textfield.x = 20;
        this.step_textfield.y = 150;
        this.addChild(this.step_textfield);
        this.rank_textfield = new egret.TextField();
        this.rank_textfield.textColor = 0xffffff;
        this.rank_textfield.width = 400;
        this.rank_textfield.size = 22;
        this.rank_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.rank_textfield.strokeColor = 0x000000;
        this.rank_textfield.stroke = 2;
        var rank = (100 - step) * 10;
        this.rank_textfield.text = "神经全国排名" + rank + "位";
        this.rank_textfield.x = 20;
        this.rank_textfield.y = 190;
        this.addChild(this.rank_textfield);
        this.beat_textfield = new egret.TextField();
        this.beat_textfield.textColor = 0xff0000;
        this.beat_textfield.width = 400;
        this.beat_textfield.size = 22;
        this.beat_textfield.textAlign = egret.HorizontalAlign.CENTER;
        var beatNum = 100 - step;
        this.beat_textfield.text = "击败了精神病院" + beatNum + "%的精神病患者";
        this.beat_textfield.x = 20;
        this.beat_textfield.y = 230;
        this.addChild(this.beat_textfield);
        this.title_textfield = new egret.TextField();
        this.title_textfield.textColor = 0xff0000;
        this.title_textfield.width = 400;
        this.title_textfield.size = 30;
        this.title_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.title_textfield.text = "获得称号：M78星人";
        this.title_textfield.x = 20;
        this.title_textfield.y = 270;
        this.addChild(this.title_textfield);
    };
    return GameOverPanelS;
}(egret.Sprite));
__reflect(GameOverPanelS.prototype, "GameOverPanelS");
var StartGamePanel = (function (_super) {
    __extends(StartGamePanel, _super);
    function StartGamePanel(textures) {
        var _this = _super.call(this) || this;
        var startGameBitmap = new egret.Bitmap();
        startGameBitmap.texture = textures.getTexture("btn_start");
        _this.width = 400;
        _this.height = 588;
        _this.touchEnabled = true;
        _this.x = (egret.MainContext.instance.stage.stageWidth - _this.width) / 2;
        _this.y = (egret.MainContext.instance.stage.stageHeight - _this.height) / 2;
        _this.addChild(startGameBitmap);
        return _this;
    }
    return StartGamePanel;
}(egret.Sprite));
__reflect(StartGamePanel.prototype, "StartGamePanel");
var Util = (function () {
    function Util() {
    }
    Util.getPointByIndex = function (index) {
        var point = new egret.Point();
        point.x = index % 9;
        point.y = Math.floor(index / 9);
        return point;
    };
    Util.getPointXYByIndex = function (index) {
        var point = new egret.Point();
        var space = 0;
        if (Math.floor(index / 9) % 2 == 1) {
            space = 25;
        }
        point.x = 150 + 45 * (index % 9) + space;
        point.y = 450 + 45 * Math.floor(index / 9);
        return point;
    };
    Util.GetIndexByPoint = function (p) {
        return p.y * 9 + p.x;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
var ViewManage = (function (_super) {
    __extends(ViewManage, _super);
    function ViewManage(root, textures) {
        var _this = _super.call(this) || this;
        _this._tiles = [];
        _this._rootView = root;
        _this._textures = textures;
        _this._backGroundPanel = new BackGroundPanel(root, textures);
        _this._StartGamePanel = new StartGamePanel(textures);
        _this._StartGamePanel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.OnStartGameClick, _this);
        _this._GameOverPanelF = new GameOverPanelF(textures);
        _this._GameOverButtonPanel = new GameOverButtonPanel(textures);
        _this._GameOverButtonPanel._reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.OnReStartClick, _this);
        _this.showStartGameView();
        return _this;
    }
    ViewManage.prototype.createCat = function () {
        this._cat = new Cat();
    };
    //显示开始界面
    ViewManage.prototype.showStartGameView = function () {
        if (this._StartGamePanel) {
            this._rootView.addChild(this._StartGamePanel);
        }
    };
    //开始游戏按钮点击
    ViewManage.prototype.OnStartGameClick = function () {
        this._rootView.removeChild(this._StartGamePanel);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnStartGameClick, this);
        this.createTiles();
        this.createCat();
        var evt = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
    };
    //重新开始游戏点击
    ViewManage.prototype.OnReStartClick = function () {
        if (this._GameOverPanelF.parent) {
            this._rootView.removeChild(this._GameOverPanelF);
        }
        else {
            this._rootView.removeChild(this._GameOverPanelS);
        }
        this._rootView.removeChild(this._GameOverButtonPanel);
        var evt = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
    };
    //创建地图圆点
    ViewManage.prototype.createTiles = function () {
        for (var i = 0; i < DataManage.tileNum; i++) {
            var tile = new Tile(this._textures);
            tile.index = i;
            this._tiles.push(tile);
            tile.addEventListener(GameEvent.OPEN_TILE, this.OnOpenTile, this);
        }
        this.showTiles();
    };
    //VIEWmanage面板侦听事件的发送
    ViewManage.prototype.OnOpenTile = function (evt) {
        this.dispatchEvent(evt);
    };
    //显示地图圆点
    ViewManage.prototype.showTiles = function () {
        for (var i = 0; i < DataManage.tileNum; i++) {
            var p = Util.getPointXYByIndex(this._tiles[i].index);
            this._tiles[i].x = p.x;
            this._tiles[i].y = p.y;
            this._rootView.addChild(this._tiles[i]);
        }
    };
    //更新地图
    ViewManage.prototype.updateAll = function () {
        var len = DataManage.tileNum;
        for (var i = 0; i < len; i++) {
            if (DataManage.instance().getStatusByIndex(i)) {
                this._tiles[i].open();
            }
            else {
                this._tiles[i].close();
            }
        }
        if (this._cat.parent == null) {
            this._rootView.addChild(this._cat);
        }
        this._cat.init();
        this.update();
    };
    //更新猫的显示
    ViewManage.prototype.update = function () {
        var index = DataManage.instance().getCatIndex();
        var p = Util.getPointXYByIndex(index);
        this._cat.x = p.x;
        this._cat.y = p.y;
        this._cat.isAction1 = DataManage.catIsAction1mc;
    };
    //游戏结束
    ViewManage.prototype.showGameOverView = function (isS) {
        if (isS) {
            this._GameOverPanelS = new GameOverPanelS(RES.getRes("gameres_json"));
            this._rootView.addChild(this._GameOverPanelS);
        }
        else {
            this._rootView.addChild(this._GameOverPanelF);
        }
        this._rootView.addChild(this._GameOverButtonPanel);
    };
    return ViewManage;
}(egret.EventDispatcher));
__reflect(ViewManage.prototype, "ViewManage");
;window.Main = Main;