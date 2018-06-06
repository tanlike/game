class ViewManage extends egret.EventDispatcher{
    private rootView: egret.DisplayObjectContainer;

    private _backGroundPanel: BackGroundPanel;
    private _startGamePanel: StartGamePanel;

    public constructor(root: egret.DisplayObjectContainer){
        super();
        this.rootView = root;
        this._backGroundPanel = new BackGroundPanel(root);
        this._startGamePanel = new StartGamePanel();

        this.showStartGameView();
    }

    private showStartGameView(){
        if(this._startGamePanel){
            this.rootView.addChild(this._startGamePanel);
        }
    }
}