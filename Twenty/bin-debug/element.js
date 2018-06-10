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
var element = (function (_super) {
    __extends(element, _super);
    function element(_num, _index) {
        var _this = _super.call(this) || this;
        _this.color = []; //颜色
        _this.createColorList();
        _this.num = _num;
        _this.index = _index;
        _this.box = new egret.TextField;
        _this.box.text = _num + 1 + '';
        _this.box.background = true;
        _this.box.backgroundColor = _this.color[_num];
        _this.box.border = true;
        _this.box.borderColor = 0xc2cbc2;
        _this.box.size = 60;
        _this.box.stroke = 4;
        _this.box.strokeColor = 0xff0000;
        _this.box.textAlign = egret.HorizontalAlign.CENTER;
        _this.box.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.box.width = 80;
        _this.box.height = 80;
        _this.box.anchorOffsetX = 50;
        _this.box.anchorOffsetY = 50;
        _this.box.touchEnabled = false;
        var point = new egret.Point();
        point = Util.getPointXYByIndex(_index);
        _this.box.x = point.x;
        _this.box.y = point.y;
        _this.addChild(_this.box);
        return _this;
    }
    element.prototype.createColorList = function () {
        for (var i = 0; i < 56; i++) {
            this.color.push(0xff0000);
        }
    };
    element.prototype.moveto = function (_index) {
        var point = Util.getPointXYByIndex(_index);
        this.box.x = point.x;
        this.box.y = point.y;
    };
    element.prototype.eliminate = function (box) {
        box.num += 1;
        if (box.num > DataManage.instance().maxNum) {
            DataManage.instance().maxNum = box.num;
        }
        box.box.text = box.num + 1 + '';
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    //判断两个砖块的数字是否相等
    element.prototype.isEquality = function (box) {
        if (this.num === box.num) {
            return true;
        }
        return false;
    };
    //判断两个砖块是否可以消除
    element.prototype.isEliminate = function (box) {
        if (this.index === box.index) {
            return true;
        }
        return false;
    };
    return element;
}(egret.Sprite));
__reflect(element.prototype, "element");
//# sourceMappingURL=element.js.map