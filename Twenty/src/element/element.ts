class element extends egret.Sprite{
    public num: number;             //数字
    public index: number;           //位置
    public box: egret.TextField;       //方块
    private color: Array<number> = [];   //颜色

    public constructor(_num: number,_index: number){
        super();
        this.createColorList();
        this.num = _num;

        this.box = new egret.TextField;
        this.box.text = _num + 1 + '';
        this.box.background = true;
        this.box.backgroundColor = this.color[_num];
        this.box.border = true;
        this.box.borderColor = 0xc2cbc2;
        this.box.size = 30;
        this.box.stroke = 2;
        this.box.strokeColor = 0xff0000;
        this.box.textAlign = egret.HorizontalAlign.CENTER;
        this.box.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.box.width = 40;
        this.box.height = 40;
        this.box.anchorOffsetX = 50;
        this.box.anchorOffsetY = 50;

        var point = new egret.Point();
        point = Util.getPointXYByIndex(_index);
        this.box.x = point.x;
        this.box.y = point.y;

        this.addChild(this.box);
    }

    public createColorList(){
        for(var i:number = 0 ; i < 56; i++){
            this.color.push(0xff0000);
        }
    }

    public move(from: number,end: number){
        var from_point = Util.getPointXYByIndex(from);
        var end_point = Util.getPointXYByIndex(end);
        egret.Tween.get(this.box).to({x:from_point.x,y:from_point.y},300,egret.Ease.sineIn);
    }
}