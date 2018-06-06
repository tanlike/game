class Util{
    public static getPointByIndex(index : number) : egret.Point{
        var point : egret.Point = new egret.Point();
        point.x = index % 7 ;
        point.y = 7 - Math.floor(index / 7 );
        return point;
    }

    public static getPointXYByIndex(index : number) : egret.Point{
        var point : egret.Point = new egret.Point();
        point.x = 218 + 44 * (index % 7) ;
        point.y = 102 + 44 * (7 - Math.floor(index / 7));
        console.log('point='+point);
        return point;
    }

    public static GetIndexByPoint(p :　egret.Point) : number{
        return (7-p.y) * 7 + p.x;
    }
}