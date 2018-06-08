var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    //根据索引位置返回x,y
    Util.getPointByIndex = function (index) {
        var point = new egret.Point();
        point.x = index % 7;
        point.y = 7 - Math.floor(index / 7);
        return point;
    };
    //根据索引位置绘制box的x.y
    Util.getPointXYByIndex = function (index) {
        var point = new egret.Point();
        point.x = 60 + 90 * (index % 7);
        point.y = 265 + 90 * (7 - Math.floor(index / 7));
        //console.log('index='+index +',' + 'point='+point);
        return point;
    };
    //根据x,y返回索引位置
    Util.getIndexByPoint = function (p) {
        return (7 - p.y) * 7 + p.x;
    };
    //碰撞检测
    Util.hitTestP = function (obj1, obj2) {
        var rect1 = obj1.getBounds(); //获取显示对象的测量边界
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    };
    //根据鼠标位置返回方块的索引
    Util.getIndexByXy = function (x, y) {
        for (var i = 0; i < 56; i++) {
            var point = this.getPointXYByIndex(i);
            if (x <= point.x && y >= point.y) {
                // console.log('index='+i);
                return i;
            }
        }
    };
    //通过索引获取砖块
    Util.getElementByIndex = function (index) {
        for (var _i = 0, _a = DataManage.instance().elements; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.index === index) {
                return value;
            }
        }
        return null;
    };
    //判断两个砖块的数字是否相等
    Util.isEquality = function (box1, box2) {
        console.log(box1.num + ',' + box2.num);
        if (box1.num === box2.num) {
            return true;
        }
        return false;
    };
    //判断两个砖块是否可以消除
    Util.isEliminate = function (box1, box2) {
        if (Math.abs(box1.box.x - box2.box.y) <= 1 && Math.abs(box1.box.y - box2.box.y) <= 1) {
            return true;
        }
        return false;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map