var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
        point.x = 120 + 45 * (index % 9) + space;
        point.y = 400 + 45 * Math.floor(index / 9);
        return point;
    };
    Util.GetIndexByPoint = function (p) {
        return p.y * 9 + p.x;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map