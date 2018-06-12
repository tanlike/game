
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
    //创建游戏背景
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
        this.stage.frameRate = Number(60);
    }

    private timer: egret.Timer;         //定时器  
    //鼠标事件监听
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
    //鼠标点击得到box，监听移动事件，移除box在map中的数据
    private mouseDown(evt:egret.TouchEvent)
    {
       // console.log("Mouse Down.");
        this._clickElement = this.getElement(evt.stageX,evt.stageY);        
        if(this._clickElement){
            DataManage.instance().delete(this._clickElement);
            this._touchStatus = true;
            this._isEliminate = false;
            this.off_XY.x = evt.stageX - this._clickElement.x;
            this.off_XY.y = evt.stageY - this._clickElement.y;
            DataManage.instance().map[this._clickElement.index] = false;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
    }

    private mouseMove(evt:egret.TouchEvent)     //box确认可移动的位置，如果可消除，则消除，消除后当前位置box及以上box下落
    {
        if( this._touchStatus ){
           // console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            var x: number = evt.stageX - this.off_XY.x;
            var y: number = evt.stageY - this.off_XY.y;
            var point:egret.Point = this.isInBorder(x,y);           //边界处理
            x = point.x;
            y = point.y;

            var hitList = DataManage.instance().getHitList(this._clickElement);
            if(hitList.length > 0){                     //没有碰撞对象则不作处理
                if(hitList.length == 1){                //只有一个碰撞对象
                    if(this._clickElement.isEquality(hitList[0])){          //比对数字是否相等
                        if(this._clickElement.isEliminate(hitList[0])){     //位置重合可消除
                            this._isEliminate = true;
                            this._clickElement.eliminate(hitList[0],true);
                            var boxs = this._clickElement.getUpAllBox();
                            boxs.forEach(value => {
                                //console.log('移动中消除后上方方块触发下落事件=' + value.index);
                                value.drop();
                            })
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                            return;
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
                        point = this._clickElement.doubleHitHandle(x,y,hitList[0],hitList[1]);
                    }
                }else if(hitList.length == 3){
                  //  console.log('与三个障碍相撞');
                    point = new egret.Point(this._clickElement.x,this._clickElement.y);
                }
            }
            this._clickElement.x = point.x;                         //没有碰撞的处理，直接赋值
            this._clickElement.y = point.y;
            var _index: number = Util.getIndexByXy(point.x,point.y);
            var off_X: number = _index - this._clickElement.index
            if(Math.abs(off_X) == 1){                               //左右偏离1格后,上方方块下落
                var e: GameEvent = new GameEvent(GameEvent.BOXDROP);
                var upBoxList: Array<element> = this._clickElement.getUpAllBox();
                if(upBoxList.length > 0){
                    for(var i:number = 0; i< upBoxList.length; i++){
                        upBoxList[i].drop();
                    }
                }
            }
            this._clickElement.index = _index;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
      //  console.log("Mouse Up.");
        if(this._touchStatus &&　!this._isEliminate){            //如果没有合成，松开鼠标后，方块下落
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
    //松开之后的下落，有障碍则停止，字相同则合成
    private drop(){
        var _index: number = this._clickElement.index;
        var point:egret.Point = Util.getPointByIndex(this._clickElement.index);
        for(var i:number = 0; i < 8 - point.y ; i++)
        {
            this._clickElement.index = _index - 7 * i;
            if(DataManage.instance().map[this._clickElement.index]){
                var box: element = Util.getElementByIndex(this._clickElement.index);
                if(this._clickElement.isEquality(box)){
                    this._clickElement.eliminate(box,false);
                    this._clickElement.moveto(this._clickElement.index,true);
                }else{
                    this._clickElement.index += 7;
                    this._clickElement.moveto(this._clickElement.index,false);
                    DataManage.instance().map[this._clickElement.index] = true;
                    DataManage.instance().elements.push(this._clickElement);
                }
                return;
            }
        }
        this._clickElement.moveto(this._clickElement.index,false);
        DataManage.instance().map[this._clickElement.index] = true;
        DataManage.instance().elements.push(this._clickElement);
    }

    //生成砖块
    private creatOneRowBoxs(){
        DataManage.instance().maxToMinSort();
        //地图中所有方块上移，如果触顶则游戏结束
        for(var value of DataManage.instance().elements){ 
            if(DataManage.instance().map[value.index]){
                var point = Util.getPointByIndex(value.index)
                if(point.y == 0){
                    DataManage.instance().isGameOver = true;
                    this.timer.stop();
                    return;
                }
                DataManage.instance().map[value.index] = false;
                value.index += 7;
                DataManage.instance().map[value.index] = true;
                value.moveto(value.index,false);
            }    
        }
        //最下面一排生成新的方块，字数不能与上方的相等
        if(!DataManage.instance().isGameOver){
            for(var i:number=0;i < 7; i++){
                var num = Math.floor(Math.random() * (DataManage.instance().maxNum - 2));
                var box = Util.getElementByIndex(i + 7);
                if(box && box.num == num){
                    num = (num + 1) % DataManage.instance().maxNum;
                }
                var _element = new element(num,i);
                DataManage.instance().elements.push(_element);
                this.addChild(_element);
                DataManage.instance().map[i] = true;
                _element.moveto(_element.index,false);
            }
        }
    }
}