class GameOverPanelF extends egret.Sprite{

    private tap_textfield : egret.TextField;
    private rank_textfield : egret.TextField;

    public constructor(textures : egret.SpriteSheet){
        super();

        var gameOverPanelS : egret.Bitmap = new egret.Bitmap();
        gameOverPanelS.texture = textures.getTexture("failed");
        this.addChild(gameOverPanelS);
        this.width = 448;
        this.height = 361;
        
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;

        this.addText();
    }

    public addText() : void {
        this.tap_textfield = new egret.TextField();
        this.tap_textfield.width = 400;
        this.tap_textfield.textColor = 0xff0000;
        this.tap_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.tap_textfield.text = "你没有抓住神！经！猫！";
        this.tap_textfield.size = 22;
        this.tap_textfield.x = 20;
        this.tap_textfield.y = 190;
        this.addChild(this.tap_textfield);

        this.rank_textfield = new egret.TextField();
        this.rank_textfield.width = 400;
        this.rank_textfield.textColor = 0xffffff;
        this.rank_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.rank_textfield.text = "精神病院长又发神经病了！";
        this.rank_textfield.size = 22;
        this.rank_textfield.strokeColor = 0x000000;
        this.rank_textfield.stroke = 2;
        this.rank_textfield.x = 20;
        this.rank_textfield.y = 230;
        this.addChild(this.rank_textfield);
    }
}