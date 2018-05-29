var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CatAI = (function () {
    function CatAI() {
    }
    CatAI.prototype.findPath = function (from) {
        var currentNodeIndexs = [from]; //中心点集合
        var usedNodeIndexs = []; //使用过点集合
        var currentNodeIndex; //当前点位置
        var round; //周围点集合
        var len_round = 0;
        var rel = true;
        while (rel) {
            if (currentNodeIndexs.length == 0) {
                rel = false;
                return null;
            }
            var newIndexs = [];
            var l = currentNodeIndexs.length;
            for (var t = 0; t < l; t++) {
                currentNodeIndex = currentNodeIndexs.shift();
                round = this.findRound(currentNodeIndex);
                len_round = round.length;
                for (var i = 0; i < len_round; i++) {
                    if (this.map[round[i]]._isUsed) {
                        usedNodeIndexs.push(round[i]);
                    }
                    if (usedNodeIndexs.indexOf(round[i]) > -1 || currentNodeIndexs.indexOf(round[i]) > -1) {
                        continue;
                    }
                    this.map[round[i]].preIndex = currentNodeIndex;
                    if (this.isExit(round[i])) {
                        return round[i];
                    }
                    newIndexs.push(round[i]);
                }
                usedNodeIndexs.push(currentNodeIndex);
            }
            currentNodeIndexs = newIndexs;
        }
    };
    CatAI.prototype.findNextPoint = function (catIndex) {
        this.initMap();
        var nextIndex = this.findPath(catIndex);
        if (nextIndex == null) {
            return null;
        }
        if (nextIndex == -1) {
            return -1;
        }
        var rel = true;
        var preindex;
        while (rel) {
            preindex = this.map[nextIndex].preIndex;
            if (preindex != catIndex && preindex != -1) {
                nextIndex = preindex;
            }
            else {
                rel = false;
            }
        }
        return nextIndex;
    };
    CatAI.prototype.isExit = function (index) {
        var p = Util.getPointByIndex(index);
        var row = p.y;
        var column = p.x;
        if (row == 0 || row == 8 || column == 0 || column == 8) {
            return true;
        }
        return false;
    };
    CatAI.prototype.getNear = function (_catIndex) {
        var round = this.findRound(_catIndex);
        return round[0];
    };
    CatAI.prototype.initMap = function () {
        if (this.map == null) {
            this.map = [];
            for (var i = 0; i < DataManage.tileNum; i++) {
                this.map.push(new CatNode());
            }
        }
        for (var i = 0; i < DataManage.tileNum; i++) {
            this.map[i].clean();
            if (!DataManage.instance().getStatusByIndex(i)) {
                this.map[i]._isUsed = true;
            }
        }
    };
    CatAI.prototype.findRound = function (index) {
        var arr = [];
        var p = Util.getPointByIndex(index);
        var row = p.y;
        var column = p.x;
        var left = column - 1;
        var left_index = Util.GetIndexByPoint(new egret.Point(left, row));
        if (left >= 0 && !this.map[left_index]._isUsed) {
            arr.push(left_index);
        }
        var right = column + 1;
        var right_index = Util.GetIndexByPoint(new egret.Point(right, row));
        if (right <= 8 && !this.map[right_index]._isUsed) {
            arr.push(right_index);
        }
        var top = row - 1;
        var top_index = Util.GetIndexByPoint(new egret.Point(column, top));
        if (top >= 0 && !this.map[top_index]._isUsed) {
            arr.push(top_index);
        }
        var bottom = row + 1;
        var bottom_index = Util.GetIndexByPoint(new egret.Point(column, bottom));
        if (bottom <= 8 && !this.map[bottom_index]._isUsed) {
            arr.push(bottom_index);
        }
        if (row % 2 == 0) {
            var left_top_index = Util.GetIndexByPoint(new egret.Point(left, top));
            if (left >= 0 && top >= 0 && !this.map[left_top_index]._isUsed) {
                arr.push(left_top_index);
            }
            var left_bottom_index = Util.GetIndexByPoint(new egret.Point(left, bottom));
            if (left >= 0 && bottom <= 8 && !this.map[left_bottom_index]._isUsed) {
                arr.push(left_bottom_index);
            }
        }
        else {
            var right_top_index = Util.GetIndexByPoint(new egret.Point(right, top));
            if (right <= 8 && top >= 0 && !this.map[right_top_index]._isUsed) {
                arr.push(right_top_index);
            }
            var right_bottom_index = Util.GetIndexByPoint(new egret.Point(right, bottom));
            if (right <= 8 && bottom <= 8 && !this.map[right_bottom_index]._isUsed) {
                arr.push(right_bottom_index);
            }
        }
        arr = arr.sort();
        return arr;
    };
    return CatAI;
}());
__reflect(CatAI.prototype, "CatAI");
//# sourceMappingURL=CatAI.js.map