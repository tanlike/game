class CatAI{
    public constructor(){
    }

    public findPath(from : number) : number{
        var currentNodeIndexs : Array<number> = [from];     //中心点集合
        var usedNodeIndexs : Array<number> = [];            //使用过点集合
        var currentNodeIndex : number;                      //当前点位置
        var round : Array<number>;                          //周围点集合
        var len_round : number = 0;
        var rel : boolean = true;

        while(rel){
            if(currentNodeIndexs.length == 0){
                rel = false;
                return null;
            }
            var newIndexs : Array<number> = [];
            var l : number = currentNodeIndexs.length;
            for(var t : number = 0;t < l; t++){
                currentNodeIndex = currentNodeIndexs.shift();
                round = this.findRound(currentNodeIndex);
                len_round = round.length;
                for(var i:number = 0; i < len_round; i++){
                    if(this.map[round[i]]._isUsed){
                        usedNodeIndexs.push(round[i]);
                    }
                    if(usedNodeIndexs.indexOf(round[i]) > -1 || currentNodeIndexs.indexOf(round[i]) > -1){
                        continue;
                    }
                    this.map[round[i]].preIndex = currentNodeIndex;
                    if(this.isExit(round[i])){
                        return round[i];
                    }
                    newIndexs.push(round[i]);
                }
                usedNodeIndexs.push(currentNodeIndex);
            }
            currentNodeIndexs = newIndexs;
        }
    }

    public findNextPoint(catIndex : number) : number{
        this.initMap();
        var nextIndex : number = this.findPath(catIndex);

        if(nextIndex == null){
            return null;
        }
        if(nextIndex == -1){
            return -1
        }
        var rel : boolean = true;
        var preindex : number;
        while(rel){
            preindex = this.map[nextIndex].preIndex;
            if(preindex != catIndex && preindex != -1){
                nextIndex = preindex;
            }
            else{
                rel = false;
            }
        }
        return nextIndex;
    }

    public isExit(index : number) : boolean {
        var p : egret.Point = Util.getPointByIndex(index);
        var row : number = p.y;
        var column : number = p.x;
        if(row == 0 || row == 8 || column == 0 || column == 8){
            return true;
        }
        return false;
    }

    public getNear(_catIndex : number) : number{
        var round : Array<number> = this.findRound(_catIndex);
        return round[0];
    }

    private map : Array<CatNode>;

    private initMap(){
        if(this.map == null){
            this.map = [];
            for(var i:number = 0;i<DataManage.tileNum;i++){
                this.map.push(new CatNode());
            }
        }
        for(var i:number = 0;i<DataManage.tileNum;i++){
            this.map[i].clean();
            if(!DataManage.instance().getStatusByIndex(i)){
                this.map[i]._isUsed = true;
            }
        }
    }

    private findRound(index : number) : Array<number>{
        var arr : Array<number> = [];
        var p : egret.Point = Util.getPointByIndex(index);
        var row : number = p.y;
        var column : number = p.x;

        var left : number = column - 1;
        var left_index : number = Util.GetIndexByPoint(new egret.Point(left,row));
        if(left >= 0 && !this.map[left_index]._isUsed){
            arr.push(left_index);
        }

        var right : number = column + 1;
        var right_index : number = Util.GetIndexByPoint(new egret.Point(right,row));
        if(right <= 8 && !this.map[right_index]._isUsed){
            arr.push(right_index);
        }

        var top : number = row - 1;
        var top_index : number = Util.GetIndexByPoint(new egret.Point(column,top))
        if(top >= 0 && !this.map[top_index]._isUsed){
            arr.push(top_index);
        }

        var bottom : number = row + 1;
        var bottom_index : number = Util.GetIndexByPoint(new egret.Point(column,bottom));
        if(bottom <= 8 && !this.map[bottom_index]._isUsed){
            arr.push(bottom_index);
        }

        if(row % 2 == 0){
            var left_top_index : number = Util.GetIndexByPoint(new egret.Point(left,top));
            if(left >= 0 && top >= 0 && !this.map[left_top_index]._isUsed){
                arr.push(left_top_index);
            }

            var left_bottom_index : number = Util.GetIndexByPoint(new egret.Point(left,bottom));
            if(left >= 0 && bottom <= 8 && !this.map[left_bottom_index]._isUsed){
                arr.push(left_bottom_index);
            }
        }
        else{
            var right_top_index : number = Util.GetIndexByPoint(new egret.Point(right,top));
            if(right <= 8 && top >= 0 && !this.map[right_top_index]._isUsed){
                arr.push(right_top_index);
            }

            var right_bottom_index : number = Util.GetIndexByPoint(new egret.Point(right,bottom));
            if(right <= 8 && bottom <= 8 && !this.map[right_bottom_index]._isUsed){
                arr.push(right_bottom_index);
            }
        }
        arr = arr.sort();
        return arr;
    }
}