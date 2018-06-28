export class Utils{

    private static startX: number = -427;
    private static startY: number = 196;
    private static width: number = 50;

    public static getXYByIndex(index: number): cc.Vec2{       //通过索引获取X,Y
        let x: number = index % 18;
        let y: number = Math.floor(index / 18);
        return new cc.Vec2(x,y);
    }  

    public static getIndexByXY(point: cc.Vec2): number{       //通过X,Y获取索引
        return point.y * 18 + point.x;
    }

    public static get2dXYByIndex(index: number): cc.Vec2{        //根据索引获取绘图坐标
        let point: cc.Vec2 = this.getXYByIndex(index);
        let x = this.startX + point.x * this.width;
        let y = this.startY - point.y * this.width;
        return new cc.Vec2(x,y);
    }

    public static getIndexBy2dXY(x: number, y: number): number{     //根据当前坐标返回索引
        let point: cc.Vec2 = new cc.Vec2();
        for(let i = 0; i < 18; i++){
            if(x < this.startX + i * this.width){
                point.x = i;
                break;
            }
        }
        for(let i = 7; i > 0; i--){
            if(y < this.startY - i * this.width){
                point.y = i;
                break;
            }
        }
        return this.getIndexByXY(point);
    }
}