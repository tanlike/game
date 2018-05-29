class StartGamePanel extends egret.Sprite{

    public constructor(textures : egret.SpriteSheet){
        super();

        var startGameBitmap : egret.Bitmap = new egret.Bitmap();
        startGameBitmap.texture = textures.getTexture("btn_start");
        this.width = 400;
        this.height = 588;
        this.touchEnabled = true;

        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;

        this.addChild(startGameBitmap);
    }
}