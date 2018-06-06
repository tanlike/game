
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

    private timer: egret.Timer;         //定时器  

    public init(){
        this.timer = new egret.Timer(10000,0);
        //this.timer.addEventListener(egret.TimerEvent.TIMER,this.creatOneRowBoxs,this);
        this.timer.start();
    }

    private creatOneRowBoxs(){
        DataManage.instance().maxToMinSort();
        DataManage.instance().elements.forEach((value,index) => {
          //  console.log('原位置=' + value.index + ',');
            if(DataManage.instance().map[value.index]){
                var point = Util.getPointByIndex(value.index)
            //    console.log('索引号='+value.index+','+point.y);
                if(point.y == 0){
                    DataManage.instance().isGameOver = true;
                    this.timer.stop();
            //        console.log('游戏结束');
                    return;
                }
                if(!DataManage.instance().isGameOver){
                    DataManage.instance().map[value.index] = false;
                    value.index += 7;
        //          console.log('上移 位置=' + value.index);
                    DataManage.instance().map[value.index] = true;
                    value.move(value.index);
                }
            }    
        });
        if(!DataManage.instance().isGameOver){
            for(var i:number=0;i < 7; i++){
                var num = Math.floor(Math.random() * (DataManage.instance().maxNum - 2));
                var _element = new element(num,i);
                DataManage.instance().elements.push(_element);
                this.addChild(_element);
    //         console.log('添加方块='+ num +"," + i);
                DataManage.instance().map[i] = true;
            }
        }
    }
}