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
//# sourceMappingURL=Tile.js.map