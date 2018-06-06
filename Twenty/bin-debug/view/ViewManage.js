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
    function ViewManage(root) {
        var _this = _super.call(this) || this;
        _this.rootView = root;
        _this._backGroundPanel = new BackGroundPanel(root);
        _this._startGamePanel = new StartGamePanel();
        _this.showStartGameView();
        return _this;
    }
    ViewManage.prototype.showStartGameView = function () {
        if (this._startGamePanel) {
            this.rootView.addChild(this._startGamePanel);
        }
    };
    return ViewManage;
}(egret.EventDispatcher));
__reflect(ViewManage.prototype, "ViewManage");
//# sourceMappingURL=ViewManage.js.map