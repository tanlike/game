
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private bg:egret.TextField;
    private createGameScene() {
        this.bg = new egret.TextField;
        this.bg.width = 640;
        this.bg.height = 730;
        this.bg.x = (this.stage.stageWidth - this.bg.width)  / 2;
        this.bg.y = (this.stage.stageHeight - this.bg.height)  / 2;
        this.bg.background = true;
        this.bg.backgroundColor = 0xc2c7cb;
        this.bg.border = true;
        this.bg.borderColor = 0xc2c7cb;
        this.bg.touchEnabled = true;
        this.addChild(this.bg);
        console.log('游戏开始');
        this.init();
        this.creatOneRowBoxs();
    }

    private timer: egret.Timer;         //定时器  

    public init(){
        this.timer = new egret.Timer(1000,0);
        //this.timer.addEventListener(egret.TimerEvent.TIMER,this.creatOneRowBoxs,this);
        this.timer.start();
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
    }

    private _touchStatus: boolean = false;              //是否已经点击
    private off_XY: egret.Point = new egret.Point();    //记录鼠标点击的偏移位置
    private _clickElement: element;         //记录点击的对象

    //获取鼠标点击位置的box
    private getElement(x,y): element{
        for(var value of DataManage.instance().elements){
            if(value.hitTestPoint(x,y)){
                return value;
            }
        }
        return null;
    }

    private mouseDown(evt:egret.TouchEvent)
    {
        console.log("Mouse Down.");
        this._clickElement = this.getElement(evt.stageX,evt.stageY);
        if(this._clickElement){
           // console.log('点击的box的索引=' + this._clickElement.index);
           // console.log('evt.stageX=' + evt.stageX + ',evt.stageY=' + evt.stageY);
           // console.log('this._clickElement.x=' + this._clickElement.box.x + ',this._clickElement.y=' + this._clickElement.box.y);
            this._touchStatus = true;
            this.off_XY.x = evt.stageX - this._clickElement.box.x;
            this.off_XY.y = evt.stageY - this._clickElement.box.y;
            DataManage.instance().map[this._clickElement.index] = false;
            this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }

        for(var i = 0;i < 56; i++){
            if(DataManage.instance().map[i]){
                for(var value of DataManage.instance().elements){
                    if(value.index == i){
                        //console.log(i + '处有障碍');
                        break;
                    }
                }
            }
        }
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
           // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x: number = evt.stageX - this.off_XY.x;
            var y: number = evt.stageY - this.off_XY.y;
            var point:egret.Point = this.isInBorder(x,y);
            this._clickElement.box.x = point.x;
            this._clickElement.box.y = point.y;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        if(this._touchStatus){
            this.drop(evt.stageX,evt.stageY);
        }
        this.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        this._touchStatus = false;
    }

    //边界判断
    private isInBorder(x,y): egret.Point{
        var left_bottom: egret.Point = new egret.Point();
        left_bottom = Util.getPointXYByIndex(0);
        var right_top: egret.Point = new egret.Point();
        right_top = Util.getPointXYByIndex(55);
        if(x < left_bottom.x){
            x = left_bottom.x;
        }
        if(x > right_top.x){
            x = right_top.x;
        }
        if(y < right_top.y){
            y = right_top.y;
        }
        if(y > left_bottom.y){
            y = left_bottom.y
        }
        return new egret.Point(x,y);
    }
    //松开之后的下落
    private drop(x: number,y: number){
        var index: number = Util.getIndexByXy(x,y);
        var point:egret.Point = Util.getPointByIndex(index);
        if(point.y == 7){
            return;
        }
        for(var i:number = point.y; i < 7 ; i++)
        {
            var _index:number = index - 7;
            if(DataManage.instance().map[_index]){
                var box: element = Util.getElementByIndex(_index);
                if(Util.isEquality(this._clickElement,box)){
                    this._clickElement.moveto(_index);
                    this._clickElement.index = _index;
                    DataManage.instance().map[_index] = true;
                  //  if(Util.isEliminate(this._clickElement,box)){
                        this._clickElement.eliminate(box);
                        console.log('字相同移动到' + box.num);
                 //   }
                }else{
                    this._clickElement.moveto(index);
                    this._clickElement.index = index;
                    DataManage.instance().map[index] = true;
                    console.log('字不同移动到' + index);
                }
                return;
            }
            index = _index;
        }
        this._clickElement.moveto(index);
        this._clickElement.index = index;
        DataManage.instance().map[index] = true;
    }

    //生成砖块
    private creatOneRowBoxs(){
        DataManage.instance().maxToMinSort();
        for(var value of DataManage.instance().elements){ 
            if(DataManage.instance().map[value.index]){
                var point = Util.getPointByIndex(value.index)
                if(point.y == 0){
                    DataManage.instance().isGameOver = true;
                    this.timer.stop();
                    return;
                }
                if(!DataManage.instance().isGameOver){
                    DataManage.instance().map[value.index] = false;
                    value.index += 7;
                    DataManage.instance().map[value.index] = true;
                    value.moveto(value.index);
                }
            }    
        }
        if(!DataManage.instance().isGameOver){
            for(var i:number=0;i < 7; i++){
                var num = Math.floor(Math.random() * (DataManage.instance().maxNum - 2));
                var _element = new element(num,i);
                _element.addEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseDown,this);
                DataManage.instance().elements.push(_element);
                this.addChild(_element);
                DataManage.instance().map[i] = true;
            }
        }
    }
}