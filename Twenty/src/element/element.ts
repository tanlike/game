class element extends egret.Sprite{
    public num: number;             //数字
    public index: number;           //位置
    public box: egret.TextField;       //方块
    private color: Array<number> = [];   //颜色
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true   
    private _distance:egret.Point = new egret.Point();  //鼠标点击的位置与元素的坐标差

    public constructor(_num: number,_index: number){
        super();
        this.createColorList();
        this.num = _num;
        this.index = _index;

        this.box = new egret.TextField;
        this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.box.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
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
        this.box.touchEnabled = true;

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

    public move(end: number){
        //var from_point = Util.getPointXYByIndex(from);
        var end_point = Util.getPointXYByIndex(end);
        //egret.Tween.get(this.box).to({x:from_point.x,y:from_point.y},300,egret.Ease.sineIn);
        this.box.x = end_point.x;
        this.box.y = end_point.y;
    }

    public moveXY(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    private mouseDown(evt:egret.TouchEvent)
    {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.box.x;
        this._distance.y = evt.stageY - this.box.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    //    console.log("Mouse Down.x" + this._distance.x);
    //    console.log("Mouse Down.y" + this._distance.y);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
          //  console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x = evt.stageX - this._distance.x;
            var y = evt.stageY - this._distance.y;
            if(this.mouseRange(x,y)){
                this.x = x;
                this.y = y;
            }
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
       // console.log("Mouse Up.");
        this._touchStatus = false;
        this.box.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseRange(x,y): boolean{
        var left_bottom: egret.Point = new egret.Point();
        var right_top: egret.Point = new egret.Point();
        left_bottom = Util.getPointXYByIndex(0);
        right_top = Util.getPointXYByIndex(55);
        console.log('x:' + left_bottom.x + '<=' + x + '<=' + right_top.x);
        if(x >= left_bottom.x && x <= right_top.x){
            console.log('y:' + right_top.y + '<=' + y + '<=' + left_bottom.y);
            if(y <= left_bottom.y && y >= right_top.y){
                var point = new egret.Point(x,y);
                console.log('当前位置是否有box=' + DataManage.instance().map[Util.GetIndexByPoint(point)]);
                if(DataManage.instance().map[Util.GetIndexByPoint(point)]){
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}