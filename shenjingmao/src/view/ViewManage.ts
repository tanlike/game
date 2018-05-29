class ViewManage extends egret.EventDispatcher{

    private _rootView : egret.DisplayObjectContainer;
    private _textures : egret.SpriteSheet;

    private _backGroundPanel : BackGroundPanel;
    private _StartGamePanel : StartGamePanel;
    private _GameOverPanelS : GameOverPanelS;
    private _GameOverPanelF : GameOverPanelF;
    private _GameOverButtonPanel : GameOverButtonPanel;

    public constructor(root : egret.DisplayObjectContainer,textures : egret.SpriteSheet){
        super();
        this._rootView = root;
        this._textures = textures;

        this._backGroundPanel = new BackGroundPanel(root,textures);

        this._StartGamePanel = new StartGamePanel(textures);
        this._StartGamePanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnStartGameClick,this);

        this._GameOverPanelF = new GameOverPanelF(textures);

        this._GameOverButtonPanel = new GameOverButtonPanel(textures);
        this._GameOverButtonPanel._reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnReStartClick,this);

        this.showStartGameView();
    }

    private _cat : Cat;
    private createCat(){
        this._cat = new Cat();
    }
    //显示开始界面
    private showStartGameView(){
        if(this._StartGamePanel){
            this._rootView.addChild(this._StartGamePanel);
        }
    }
    //开始游戏按钮点击
    private OnStartGameClick(){
        this._rootView.removeChild(this._StartGamePanel);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.OnStartGameClick,this);
        this.createTiles();
        this.createCat();
        var evt : GameEvent = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
    }
    //重新开始游戏点击
    private OnReStartClick(){
        if(this._GameOverPanelS.parent){
            this._rootView.removeChild(this._GameOverPanelS);
        }
        else{
            this._rootView.removeChild(this._GameOverPanelF);
        }
        this._rootView.removeChild(this._GameOverButtonPanel);
        var evt : GameEvent = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
    }

    private _tiles : Array<any> = [];
    //创建地图圆点
    private createTiles(){
        for(var i:number = 0;i < DataManage.tileNum;i++){
            var tile : Tile = new Tile(this._textures);
            tile.index = i;
            this._tiles.push(tile);
            tile.addEventListener(GameEvent.OPEN_TILE,this.OnOpenTile,this);
        }
        this.showTiles();
    }
    //VIEWmanage面板侦听事件的发送
    private OnOpenTile(evt : GameEvent){
        this.dispatchEvent(evt);
    }
    //显示地图圆点
    private showTiles(){
        for(var i:number = 0;i < DataManage.tileNum;i++){
            var p : egret.Point = Util.getPointXYByIndex(this._tiles[i].index);
            this._tiles[i].x = p.x;
            this._tiles[i].y = p.y;
            this._rootView.addChild(this._tiles[i]);
        }
    }
    //更新地图
    public updateAll(){
        var len = DataManage.tileNum;
        for(var i:number = 0; i < len; i++){
            if(DataManage.instance().getStatusByIndex(i)){
                this._tiles[i].open();
            }
            else{
                this._tiles[i].close();
            }
        }
        if(this._cat.parent == null){
            this._rootView.addChild(this._cat);
        }
        this._cat.init();
        this.update();
    }
    //更新猫的显示
    public update(){
        var index : number = DataManage.instance().getCatIndex();
        var p : egret.Point = Util.getPointXYByIndex(index);
        this._cat.x = p.x;
        this._cat.y = p.y;
        this._cat.isAction1 = DataManage.catIsAction1mc;
    }
    //游戏结束
    public showGameOverView(isS : boolean){
        if(isS){
            this._GameOverPanelS = new GameOverPanelS(RES.getRes("gameres_json"));
            this._rootView.addChild(this._GameOverPanelS);
        }
        else{
            this._rootView.addChild(this._GameOverPanelF);
        }
        this._rootView.addChild(this._GameOverButtonPanel);
    }
}