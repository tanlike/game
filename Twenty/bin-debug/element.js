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
        _this.addEventListener(GameEvent.BOXDROP, _this.drop, _this);
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
        console.log('--------------------------------------------------');
        var upBoxList = this.getUpAllBox();
        upBoxList.push(box);
        if (upBoxList.length > 0) {
            for (var i = 0; i < upBoxList.length; i++) {
                console.log('index=' + upBoxList[i].index);
                upBoxList[i].drop();
            }
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
    //单个碰撞处理
    element.prototype.simpleHitHandle = function (x, y, box) {
        if (x < this.box.x && box.box.x < this.box.x && Math.abs(box.box.y - this.box.y) < 80) {
            console.log('左移中碰到障碍');
            x = this.box.x;
        }
        if (x > this.box.x && box.box.x > this.box.x && Math.abs(box.box.y - this.box.y) < 80) {
            console.log('右移中碰到障碍');
            x = this.box.x;
        }
        if (y < this.box.y && box.box.y < this.box.y && Math.abs(box.box.x - this.box.x) < 80) {
            console.log('上移中碰到障碍');
            y = this.box.y;
        }
        if (y > this.box.y && box.box.y > this.box.y && Math.abs(box.box.x - this.box.x) < 80) {
            console.log('下移中碰到障碍');
            y = this.box.y;
        }
        console.log('---------------------------------------------');
        return new egret.Point(x, y);
    };
    //两个碰撞处理
    element.prototype.doubleHitHandle = function (x, y, box1, box2) {
        if (x < this.box.x) {
            if (box1.box.x < this.box.x && Math.abs(box1.box.y - this.box.y) < 80 || box2.box.x < this.box.x && Math.abs(box2.box.y - this.box.y) < 80) {
                // console.log('左移中碰到障碍');
                x = this.box.x;
            }
        }
        if (x > this.box.x) {
            if (box1.box.x > this.box.x && Math.abs(box1.box.y - this.box.y) < 80 || box2.box.x > this.box.x && Math.abs(box2.box.y - this.box.y) < 80) {
                //console.log('右移中碰到障碍');
                x = this.box.x;
            }
        }
        if (y < this.box.y) {
            if (box1.box.y < this.box.y && Math.abs(box1.box.x - this.box.x) < 80 || box2.box.y < this.box.y && Math.abs(box2.box.x - this.box.x) < 80) {
                //console.log('上移中碰到障碍');
                y = this.box.y;
            }
        }
        if (y > this.box.y) {
            if (box1.box.y > this.box.y && Math.abs(box1.box.x - this.box.x) < 80 || box2.box.y > this.box.y && Math.abs(box2.box.x - this.box.x) < 80) {
                //console.log('下移中碰到障碍');
                y = this.box.y;
            }
        }
        //     console.log('---------------------------------------------');
        return new egret.Point(x, y);
    };
    //获取砖块上方的所有方块
    element.prototype.getUpAllBox = function () {
        var upBoxList = [];
        var point = Util.getPointByIndex(this.index);
        for (var y = point.y - 1; y > 0; y--) {
            var index = Util.getIndexByPoint(new egret.Point(point.x, y));
            var box = Util.getElementByIndex(index);
            if (box) {
                upBoxList.push(box);
                console.log('上方砖块索引=' + box.index);
            }
            else {
                break;
            }
        }
        return upBoxList;
    };
    //下方无砖块时下落
    element.prototype.drop = function () {
        console.log('砖块下方移动后下落');
        var _index = this.index;
        DataManage.instance().map[this.index] = false;
        var point = Util.getPointByIndex(_index);
        for (var i = 1; i < 8 - point.y; i++) {
            this.index = _index - 7 * i;
            console.log('下方是否有障碍' + DataManage.instance().map[this.index]);
            if (DataManage.instance().map[this.index]) {
                var box = Util.getElementByIndex(this.index);
                if (this.isEquality(box)) {
                    this.moveto(this.index);
                    this.eliminate(box);
                }
                else {
                    this.index += 7;
                    this.moveto(this.index);
                    DataManage.instance().map[this.index] = true;
                }
                return;
            }
        }
        this.moveto(this.index);
        DataManage.instance().map[this.index] = true;
    };
    return element;
}(egret.Sprite));
__reflect(element.prototype, "element");
//# sourceMappingURL=element.js.map