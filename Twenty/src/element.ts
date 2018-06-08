class element extends egret.Sprite{
    public num: number;             //数字
    public index: number;           //位置
    public box: egret.TextField;       //方块
    private color: Array<number> = [];   //颜色

    public constructor(_num: number,_index: number){
        super();
        this.createColorList();
        this.num = _num;
        this.index = _index;

        this.box = new egret.TextField;
        this.box.text = _num + 1 + '';
        this.box.background = true;
        this.box.backgroundColor = this.color[_num];
        this.box.border = true;
        this.box.borderColor = 0xc2cbc2;
        this.box.size = 60;
        this.box.stroke = 4;
        this.box.strokeColor = 0xff0000;
        this.box.textAlign = egret.HorizontalAlign.CENTER;
        this.box.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.box.width = 80;
        this.box.height = 80;
        this.box.anchorOffsetX = 50;
        this.box.anchorOffsetY = 50;
        this.box.touchEnabled = false;

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

    public moveto(_index: number){
        var point = Util.getPointXYByIndex(_index);
        this.box.x = point.x;
        this.box.y = point.y;
    }

    public eliminate(box: element){
        DataManage.instance().elements.forEach((value,index) => {
            console.log('数组:' + index + ',' + value.index + ',' + value.num)
        })
        console.log('----------------------------------------------');
        this.num += 1;
        if(this.num > DataManage.instance().maxNum){
            DataManage.instance().maxNum = this.num;
        }
        var index: number = DataManage.instance().elements.indexOf(box);
        DataManage.instance().elements.splice(index,1);
        box.parent.removeChild(box);
        
        DataManage.instance().elements.forEach((value,index) => {
            console.log('数组:' + index + ',' + value.index + ',' + value.num)
        })

        this.updata();
    }

    public updata(){
        this.box.text = this.num + 1 + '';
    }
} 