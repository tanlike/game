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
        return _this;
    }
    return GameOverPanelF;
}(egret.Sprite));
__reflect(GameOverPanelF.prototype, "GameOverPanelF");
//# sourceMappingURL=GameOverPanelF.js.map