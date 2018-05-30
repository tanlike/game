
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
        //运行游戏
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }
    //加载资源
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();        //loading界面
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");     //加载配置
            await RES.loadGroup("preload", 0, loadingView);                     //加载资源组
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    //创建视图管理，监听游戏开始
    private _viewManage : ViewManage;
    private createGameScene() {
        this._viewManage = new ViewManage(this,RES.getRes("gameres_json"));
        this._viewManage.addEventListener(GameEvent.START_GAME,this.startGame,this);
        this._viewManage.addEventListener(GameEvent.OPEN_TILE,this.openTile,this);
    }

    //游戏开始，初始化地图数据，更新界面
    private startGame(){
        DataManage.instance().init_tileDatas();
        DataManage.instance().selectTile();
        DataManage.instance().createCatPoint();
        this._viewManage.updateAll();
    }
    //点击tile后关闭tile，如果神经猫无处可走，即游戏结束
    private openTile(evt : GameEvent){
        DataManage.stepNum++;
        DataManage.instance().closeTileByIndex(evt.open_tile_index);
        var rel : boolean = DataManage.instance().isHaveNextPointByCat();
        if(rel){
            this._viewManage.update();
        }
        else{
            this._viewManage.showGameOverView(DataManage.instance()._isS);
        }
    }
}