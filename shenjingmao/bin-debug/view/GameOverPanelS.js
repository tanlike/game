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
        this.step_textfield = new egret.TextField();
        this.step_textfield.textColor = 0xff0000;
        this.step_textfield.width = 400;
        this.step_textfield.size = 22;
        this.step_textfield.textAlign = egret.HorizontalAlign.CENTER;
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
        this.rank_textfield.x = 20;
        this.rank_textfield.y = 190;
        this.addChild(this.rank_textfield);
        this.beat_textfield = new egret.TextField();
        this.beat_textfield.textColor = 0xff0000;
        this.beat_textfield.width = 400;
        this.beat_textfield.size = 22;
        this.beat_textfield.textAlign = egret.HorizontalAlign.CENTER;
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
    GameOverPanelS.prototype.updataData = function () {
        this.step_textfield.text = "您用" + DataManage.stepNum + "步抓住了神经猫";
        var rank = Math.floor(Math.random() * DataManage.stepNum * 100);
        this.rank_textfield.text = "神经全国排名" + rank + "位";
        var beatNum = 100 - DataManage.stepNum;
        this.beat_textfield.text = "击败了精神病院" + beatNum + "%的精神病患者";
    };
    return GameOverPanelS;
}(egret.Sprite));
__reflect(GameOverPanelS.prototype, "GameOverPanelS");
//# sourceMappingURL=GameOverPanelS.js.map