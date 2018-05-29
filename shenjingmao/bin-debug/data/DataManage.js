var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManage = (function () {
    function DataManage() {
        this.stepNum = 0; //计录步数
        this.catDefaultIndex = 40; //神经猫的位置
        this._isS = false; //是否赢了
        this._tileDatas = []; //tile是否可走
        this._catIndex = this.catDefaultIndex;
        if (!DataManage._isInit) {
            throw (new Error("error!"));
        }
        this._catAI = new CatAI();
        this.createData();
    }
    DataManage.instance = function () {
        if (!DataManage._isInit) {
            DataManage._isInit = true;
            this._dataManage = new DataManage();
        }
        return DataManage._dataManage;
    };
    //创建地图数据，初始可走
    DataManage.prototype.createData = function () {
        for (var i = 0; i < DataManage.tileNum; i++) {
            this._tileDatas[i] = true;
        }
    };
    //游戏开始时，初始化游戏数据
    DataManage.prototype.init_tileDatas = function () {
        DataManage.catIsAction1mc = true;
        for (var i = 0; i < DataManage.tileNum; i++) {
            this._tileDatas[i] = true;
        }
    };
    //初始化地图障碍
    DataManage.prototype.selectTile = function () {
        var num = 10 + Math.floor(Math.random() * 10);
        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * DataManage.tileNum);
            this._tileDatas[index] = false;
        }
        this._tileDatas[this.catDefaultIndex] = true;
    };
    //将此位置设为不可走
    DataManage.prototype.closeTileByIndex = function (index) {
        this._tileDatas[index] = false;
    };
    //获取位置的障碍信息
    DataManage.prototype.getStatusByIndex = function (index) {
        return this._tileDatas[index];
    };
    //创建猫的位置
    DataManage.prototype.createCatPoint = function () {
        this._catIndex = this.catDefaultIndex;
    };
    //获取猫的位置
    DataManage.prototype.getCatIndex = function () {
        return this._catIndex;
    };
    //神经猫是否有位置可移动，如果可走，更新神经猫的位置
    DataManage.prototype.isHaveNextPointByCat = function () {
        if (this._catAI.isExit(this._catIndex)) {
            this._isS = false;
            return false;
        }
        var nextPointIndex = this._catAI.findNextPoint(this._catIndex);
        if (nextPointIndex == null) {
            DataManage.catIsAction1mc = false;
            this._catIndex = this._catAI.getNear(this._catIndex);
            if (this._catIndex) {
                return true;
            }
            this._isS = true;
            return false;
        }
        if (nextPointIndex == -1) {
            this._isS = true;
            return false;
        }
        this._catIndex = nextPointIndex;
        return true;
    };
    DataManage._isInit = false; //只允许一次初始化
    DataManage.catIsAction1mc = true; //神经猫是否播放动作1
    DataManage.tileNum = 81; //地图总tile
    return DataManage;
}());
__reflect(DataManage.prototype, "DataManage");
//# sourceMappingURL=DataManage.js.map