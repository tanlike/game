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
//# sourceMappingURL=StartGamePanel.js.map