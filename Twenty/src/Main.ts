
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
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

    private createGameScene() {
        var bg = new egret.TextField;
        bg.width = 320;
        bg.height = 365;
        bg.x = (this.stage.stageWidth - bg.width)  / 2;
        bg.y = (this.stage.stageHeight - bg.height)  / 2;
        bg.background = true;
        bg.backgroundColor = 0xc2c7cb;
        bg.border = true;
        bg.borderColor = 0xc2c7cb;
        this.addChild(bg);
        console.log('游戏开始');
        this.init();
        this.creatOneRowBoxs();
    }

    private map: Array<boolean> = [];        //格子中是否有元素
    private elements: Array<element> = [];   //56个格子中存放的box
    private maxNum: number = 5;         //最大数字
    private timer: egret.Timer;         //定时器
    private isGameOver:boolean = false; //游戏是否结束         

    public init(){
        for(var i:number=0; i < 56; i++){
            this.map.push(false);
        }
        this.timer = new egret.Timer(1000,1);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.creatOneRowBoxs,this);
        this.timer.start();
    }

    private creatOneRowBoxs(){
        console.log('执行回调');
        if(this.isGameOver){
            this.timer.stop();
            return;
        }
        for(var i:number=0;i < 7; i++){
            for(var j:number=55; j >= 0; j--){
                if(this.map[j]){
                    var point = Util.getPointXYByIndex(this.elements[j].index)
                    if(point.y == 0){
                        this.isGameOver = true;
                        console.log('游戏结束')
                        return;
                    }
                    var from = this.elements[j].index;
                    this.elements[j].index = this.elements[j].index + 7;
                    this.map[from] = false;
                    this.map[this.elements[j].index] = true;
                    this.elements[j].move(from,this.elements[j].index);
                    console.log('第'+j+"位的数字上移");
                }
            }
            var num = 1 + Math.floor(Math.random() * (this.maxNum - 2));
            this.elements[i] = new element(num,i);
            this.addChild(this.elements[i]);
            console.log('添加方块='+i+","+num);
            this.map[i] = true;
        }
    }
    
}