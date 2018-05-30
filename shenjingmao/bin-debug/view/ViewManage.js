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
        _this._GameOverPanelS = new GameOverPanelS(textures);
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
            this._GameOverPanelS.updataData();
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
//# sourceMappingURL=ViewManage.js.map