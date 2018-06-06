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
    DataManage._isInit = false;
    return DataManage;
}());
__reflect(DataManage.prototype, "DataManage");
//# sourceMappingURL=DataManage.js.map