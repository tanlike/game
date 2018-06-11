
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
        this.timer = new egret.Timer(10000,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.creatOneRowBoxs,this);
        this.timer.start();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
    }

    private _touchStatus: boolean = false;              //是否已经点击
    private off_XY: egret.Point = new egret.Point();    //记录鼠标点击的偏移位置
    private _clickElement: element;         //记录点击的对象
    private _isEliminate: boolean = false;          //记录砖块是否已消除

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
            DataManage.instance().delete(this._clickElement);
            this._touchStatus = true;
            this._isEliminate = false;
            this.off_XY.x = evt.stageX - this._clickElement.box.x;
            this.off_XY.y = evt.stageY - this._clickElement.box.y;
            DataManage.instance().map[this._clickElement.index] = false;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
    }

    private mouseMove(evt:egret.TouchEvent)     //如果可消除，消除，如果不可，设置砖块的坐标
    {
        if( this._touchStatus ){
           // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x: number = evt.stageX - this.off_XY.x;
            var y: number = evt.stageY - this.off_XY.y;
            var point:egret.Point = this.isInBorder(x,y);           //边界处理
            x = point.x;
            y = point.y;

           // this._clickElement.index = Util.getIndexByXy(x,y);

           // console.log('获取对象的index=' + this._clickElement.index + ',x = ' + x + ',y = ' + y);

            var hitList = DataManage.instance().getHitList(this._clickElement);
            if(hitList.length > 0){                     //没有碰撞对象则不作处理
               // console.log('碰撞数量=' + hitList.length);
                if(hitList.length == 1){                //只有一个碰撞对象
                    if(this._clickElement.isEquality(hitList[0])){          //比对数字是否相等
                        if(this._clickElement.isEliminate(hitList[0])){     //位置重合可消除
                            this._isEliminate = true;
                            this._clickElement.eliminate(hitList[0]);
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                           // console.log('移动中消除');
                        }
                    }else{
                        point = this._clickElement.simpleHitHandle(x,y,hitList[0]);
                    }
                }else if(hitList.length == 2){           //有两个或以上碰撞对象
                    //console.log('与两个物体发生碰撞');
                    if(this._clickElement.isEquality(hitList[0]) || this._clickElement.isEquality(hitList[1])){
                        if(this._clickElement.isEquality(hitList[0])){
                            //console.log('与不同字的障碍做碰撞处理');
                            point = this._clickElement.simpleHitHandle(x,y,hitList[1]);
                        }else{
                            //console.log('与不同字的障碍做碰撞处理');
                            point = this._clickElement.simpleHitHandle(x,y,hitList[0]);
                        }
                    }else{
                       // console.log('与两字碰撞且没有同字');
                        console.log(hitList[0].index);
                        console.log(hitList[1].index);
                        point = this._clickElement.doubleHitHandle(x,y,hitList[0],hitList[1]);
                    }
                }
            }
            this._clickElement.box.x = point.x;
            this._clickElement.box.y = point.y;
            var _index: number = Util.getIndexByXy(point.x,point.y);
            var off_X: number = _index - this._clickElement.index
            if(Math.abs(off_X) == 1){
             //   console.log('左右偏离1格后,上方方块下落');
                var e: GameEvent = new GameEvent(GameEvent.BOXDROP);
                var upBoxList: Array<element> = this._clickElement.getUpAllBox();
                if(upBoxList.length > 0){
                    for(var i:number = 0; i< upBoxList.length; i++){
                        upBoxList[i].dispatchEvent(e);
                    }
                }
            }
            this._clickElement.index = _index;
           // console.log('坐标变换x=' + point.x + ',y=' + point.y + ',index=' + this._clickElement.index);


        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        if(this._touchStatus &&　!this._isEliminate){
            this.drop();
        }
        if(this.stage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        this._touchStatus = false;
    }

    //边界判断
    private isInBorder(x,y): egret.Point{
        var left_bottom_x: number = 60;
        var left_bottom_y: number = 895;
        var right_top_x: number = 600;
        var right_top_y: number = 265;
        if(x < left_bottom_x){
            x = left_bottom_x;
        }
        if(x > right_top_x){
            x = right_top_x;
        }
        if(y < right_top_y){
            y = right_top_y;
        }
        if(y > left_bottom_y){
            y = left_bottom_y;
        }
        return new egret.Point(x,y);
    }
    //松开之后的下落
    private drop(){
        var _index: number = this._clickElement.index;
        var point:egret.Point = Util.getPointByIndex(this._clickElement.index);
        for(var i:number = 0; i < 8 - point.y ; i++)
        {
            this._clickElement.index = _index - 7 * i;
            if(DataManage.instance().map[this._clickElement.index]){
                var box: element = Util.getElementByIndex(this._clickElement.index);
                if(this._clickElement.isEquality(box)){
                    this._clickElement.moveto(this._clickElement.index);
                    this._clickElement.eliminate(box);
                }else{
                    this._clickElement.index += 7;
                    this._clickElement.moveto(this._clickElement.index);
                    DataManage.instance().map[this._clickElement.index] = true;
                    DataManage.instance().elements.push(this._clickElement);
                }
                return;
            }
        }
        this._clickElement.moveto(this._clickElement.index);
        DataManage.instance().map[this._clickElement.index] = true;
        DataManage.instance().elements.push(this._clickElement);
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