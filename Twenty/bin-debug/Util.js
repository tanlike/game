var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.getPointByIndex = function (index) {
        var point = new egret.Point();
        point.x = index % 7;
        point.y = 7 - Math.floor(index / 7);
        return point;
    };
    Util.getPointXYByIndex = function (index) {
        var point = new egret.Point();
        point.x = 218 + 44 * (index % 7);
        point.y = 102 + 44 * (7 - Math.floor(index / 7));
        console.log('point=' + point);
        return point;
    };
    Util.GetIndexByPoint = function (p) {
        return (7 - p.y) * 7 + p.x;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map