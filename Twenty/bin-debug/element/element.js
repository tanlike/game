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
        _this._touchStatus = false; //当前触摸状态，按下时，值为true   
        _this._distance = new egret.Point(); //鼠标点击的位置与元素的坐标差
        _this.createColorList();
        _this.num = _num;
        _this.index = _index;
        _this.box = new egret.TextField;
        _this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        _this.box.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
        _this.box.text = _num + 1 + '';
        _this.box.background = true;
        _this.box.backgroundColor = _this.color[_num];
        _this.box.border = true;
        _this.box.borderColor = 0xc2cbc2;
        _this.box.size = 30;
        _this.box.stroke = 2;
        _this.box.strokeColor = 0xff0000;
        _this.box.textAlign = egret.HorizontalAlign.CENTER;
        _this.box.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.box.width = 40;
        _this.box.height = 40;
        _this.box.anchorOffsetX = 50;
        _this.box.anchorOffsetY = 50;
        _this.box.touchEnabled = true;
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
    element.prototype.move = function (end) {
        //var from_point = Util.getPointXYByIndex(from);
        var end_point = Util.getPointXYByIndex(end);
        //egret.Tween.get(this.box).to({x:from_point.x,y:from_point.y},300,egret.Ease.sineIn);
        this.box.x = end_point.x;
        this.box.y = end_point.y;
    };
    element.prototype.moveXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    element.prototype.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.box.x;
        this._distance.y = evt.stageY - this.box.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        //    console.log("Mouse Down.x" + this._distance.x);
        //    console.log("Mouse Down.y" + this._distance.y);
    };
    element.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            //  console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x = evt.stageX - this._distance.x;
            var y = evt.stageY - this._distance.y;
            if (this.mouseRange(x, y)) {
                this.x = x;
                this.y = y;
            }
        }
    };
    element.prototype.mouseUp = function (evt) {
        // console.log("Mouse Up.");
        this._touchStatus = false;
        this.box.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    element.prototype.mouseRange = function (x, y) {
        var left_bottom = new egret.Point();
        var right_top = new egret.Point();
        left_bottom = Util.getPointXYByIndex(0);
        right_top = Util.getPointXYByIndex(55);
        console.log('x:' + left_bottom.x + '<=' + x + '<=' + right_top.x);
        if (x >= left_bottom.x && x <= right_top.x) {
            console.log('y:' + right_top.y + '<=' + y + '<=' + left_bottom.y);
            if (y <= left_bottom.y && y >= right_top.y) {
                var point = new egret.Point(x, y);
                console.log('当前位置是否有box=' + DataManage.instance().map[Util.GetIndexByPoint(point)]);
                if (DataManage.instance().map[Util.GetIndexByPoint(point)]) {
                    return false;
                }
                return true;
            }
        }
        return false;
    };
    return element;
}(egret.Sprite));
__reflect(element.prototype, "element");
//# sourceMappingURL=element.js.map