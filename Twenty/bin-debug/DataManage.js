var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManage = (function () {
    function DataManage() {
        this.map = []; //格子中是否有元素
        this.elements = []; //56个格子中存放的box
        this.maxNum = 5; //最大数字
        this.isGameOver = false; //游戏是否结束 
        if (DataManage._isInit) {
            throw (new Error('error!'));
        }
        this.init();
    }
    DataManage.instance = function () {
        if (!DataManage._isInit) {
            this._instance = new DataManage();
            this._isInit = true;
        }
        return this._instance;
    };
    DataManage.prototype.init = function () {
        for (var i = 0; i < 56; i++) {
            this.map.push(false);
        }
        this.elements = [];
        this.maxNum = 5;
        this.isGameOver = false;
    };
    DataManage.prototype.minToMaxSort = function () {
        DataManage.instance().elements.sort(function (a, b) {
            if (a.index < b.index) {
                return -1;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return 0;
            }
        });
    };
    DataManage.prototype.maxToMinSort = function () {
        DataManage.instance().elements.sort(function (a, b) {
            if (a.index < b.index) {
                return 1;
            }
            else if (a.index > b.index) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    //从数组中删除
    DataManage.prototype.delete = function (box) {
        var index = DataManage.instance().elements.indexOf(box);
        DataManage.instance().elements.splice(index, 1);
        box = null;
    };
    //获取碰撞数组
    DataManage.prototype.getHitList = function (box) {
        var arr = [];
        DataManage.instance().elements.forEach(function (value) {
            // console.log('box.index='+box.index+',value.index='+value.index+','+Util.hitTestP(box,value));
            if (Util.hitTestP(box, value)) {
                arr.push(value);
            }
        });
        return arr;
    };
    DataManage._isInit = false;
    return DataManage;
}());
__reflect(DataManage.prototype, "DataManage");
//# sourceMappingURL=DataManage.js.map