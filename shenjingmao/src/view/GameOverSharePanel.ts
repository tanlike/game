class GameOverSharePanel extends egret.Sprite{
    public _shareBtn: egret.Sprite;

    public constructor(){
        super();

        this._shareBtn = new egret.Sprite();
        this._shareBtn.width = 93;
        this._shareBtn.height = 93;
        var bitmap: egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes('timg_jpg');
        this._shareBtn.addChild(bitmap);
        this._shareBtn.touchEnabled = true;
        this.addChild(this._shareBtn);
        this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,WxInvoke.instance().onShareGame,this);

        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2 - 120;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2 + 210;

    }

}