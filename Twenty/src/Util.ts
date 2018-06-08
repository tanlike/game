class Util{
    //根据索引位置返回x,y
    public static getPointByIndex(index: number): egret.Point{
        var point : egret.Point = new egret.Point();
        point.x = index % 7 ;
        point.y = 7 - Math.floor(index / 7 );
        return point;
    }
    //根据索引位置绘制box的x.y
    public static getPointXYByIndex(index : number): egret.Point{
        var point : egret.Point = new egret.Point();
        point.x = 60 + 90 * (index % 7) ;
        point.y = 265 + 90 * (7 - Math.floor(index / 7));
        //console.log('index='+index +',' + 'point='+point);
        return point;
    }
    //根据x,y返回索引位置
    public static getIndexByPoint(p :　egret.Point): number{
        return (7-p.y) * 7 + p.x;
    }

    //碰撞检测
    public static hitTestP(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
        var rect1:egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    }
    //根据鼠标位置返回方块的索引
    public static getIndexByXy(x: number,y: number): number{
        for(var i:number = 0;i < 56; i++){
            var point = this.getPointXYByIndex(i);
            if(x <= point.x && y >= point.y){
               // console.log('index='+i);
                return i;
            }
        }
    }
    //通过索引获取砖块
    public  static getElementByIndex(index:number): element{
        for(var value of DataManage.instance().elements){
            if(value.index === index){
                return value;
            }
        }
        return null;
    }
    //判断两个砖块的数字是否相等
    public static isEquality(box1: element,box2: element): boolean{
        console.log(box1.num + ',' + box2.num)
        if(box1.num === box2.num){
            return true;
        }
        return false;
    }
    //判断两个砖块是否可以消除
    public static isEliminate(box1: element,box2: element): boolean{
        if(Math.abs(box1.box.x - box2.box.y) <= 1 && Math.abs(box1.box.y - box2.box.y) <= 1){
            return true;
        }
        return false;
    }
}