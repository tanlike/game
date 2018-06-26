
export class Path {
    public index: number;       //索引
    public disPre: number;      //到父节点的距离
    public prePath: Path;       //父节点
    public disDes: number;      //到终点的距离

    constructor(index: number,dis: number,disDes: number,prePath: Path){
        this.index = index;
        this.disPre = dis;
        this.disDes = disDes;
        this.prePath = prePath;
    }

    public mul(): number{
        return this.disPre + this.disDes;
    }
}
