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
//# sourceMappingURL=GameOverPanelF.js.map