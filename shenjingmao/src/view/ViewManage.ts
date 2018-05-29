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

        this._GameOverPanelS = new GameOverPanelS(textures);
        this._GameOverPanelF = new GameOverPanelF(textures);

        this._GameOverButtonPanel = new GameOverButtonPanel(textures);
        this._GameOverButtonPanel._reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnReStartClick,this);

        this.showStartGameView();
    }

    private _cat : Cat;
    private createCat(){
        this._cat = new Cat();
    }

    private showStartGameView(){
        if(this._StartGamePanel){
            this._rootView.addChild(this._StartGamePanel);
        }
    }

    private OnStartGameClick(){
        this._rootView.removeChild(this._StartGamePanel);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.OnStartGameClick,this);
        this.createTiles();
        this.createCat();
        var evt : GameEvent = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
    }

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

    private createTiles(){
        for(var i:number = 0;i < DataManage.tileNum;i++){
            var tile : Tile = new Tile(this._textures);
            tile.index = i;
            this._tiles.push(tile);
            tile.addEventListener(GameEvent.OPEN_TILE,this.OnOpenTile,this);
        }
        this.showTiles();
    }

    private OnOpenTile(evt : GameEvent){
        this.dispatchEvent(evt);
    }

    private showTiles(){
        for(var i:number = 0;i < DataManage.tileNum;i++){
            var p : egret.Point = Util.getPointXYByIndex(this._tiles[i].index);
            this._tiles[i].x = p.x;
            this._tiles[i].y = p.y;
            this._rootView.addChild(this._tiles[i]);
        }
    }

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

    public update(){
        var index : number = DataManage.instance().getCatIndex();
        var p : egret.Point = Util.getPointXYByIndex(index);
        this._cat.x = p.x;
        this._cat.y = p.y;
        this._cat.isAction1 = DataManage.catIsAction1mc;
    }

    public showGameOverView(isS : boolean){
        if(isS){
            this._rootView.addChild(this._GameOverPanelS);
        }
        else{
            this._rootView.addChild(this._GameOverPanelF);
        }
        this._rootView.addChild(this._GameOverButtonPanel);
    }
}