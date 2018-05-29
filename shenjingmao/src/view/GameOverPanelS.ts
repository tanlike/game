class GameOverPanelS extends egret.Sprite{
    
    private step_textfield : egret.TextField;
    private rank_textfield : egret.TextField;
    private beat_textfield : egret.TextField;
    private title_textfield : egret.TextField;

    public constructor(textures : egret.SpriteSheet){
        super();

        var gameOverPanelS : egret.Bitmap = new egret.Bitmap();
        gameOverPanelS.texture = textures.getTexture("victory");
        this.addChild(gameOverPanelS);
        this.width = 448;
        this.height = 338;
        
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;

        this.addText();
    }

    public addText() : void{
        var step : number = DataManage.stepNum;
        this.step_textfield = new egret.TextField();
        this.step_textfield.textColor = 0xff0000;
        this.step_textfield.width = 400;
        this.step_textfield.size = 22;
        this.step_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.step_textfield.text = "您用" + step + "步抓住了神经猫";
        this.step_textfield.x = 20;
        this.step_textfield.y = 150;
        this.addChild(this.step_textfield);

        this.rank_textfield = new egret.TextField();
        this.rank_textfield.textColor = 0xffffff;
        this.rank_textfield.width = 400;
        this.rank_textfield.size = 22;
        this.rank_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.rank_textfield.strokeColor = 0x000000;
        this.rank_textfield.stroke = 2;
        var rank : number = (100 - step) * 10;
        this.rank_textfield.text = "神经全国排名" + rank + "位";
        this.rank_textfield.x = 20;
        this.rank_textfield.y = 190;
        this.addChild(this.rank_textfield);

        this.beat_textfield = new egret.TextField();
        this.beat_textfield.textColor = 0xff0000;
        this.beat_textfield.width = 400;
        this.beat_textfield.size = 22;
        this.beat_textfield.textAlign = egret.HorizontalAlign.CENTER;
        var beatNum : number = 100 - step
        this.beat_textfield.text = "击败了精神病院" + beatNum + "%的精神病患者";
        this.beat_textfield.x = 20;
        this.beat_textfield.y = 230;
        this.addChild(this.beat_textfield);

        this.title_textfield = new egret.TextField();
        this.title_textfield.textColor = 0xff0000;
        this.title_textfield.width = 400;
        this.title_textfield.size = 30;
        this.title_textfield.textAlign = egret.HorizontalAlign.CENTER;
        this.title_textfield.text = "获得称号：M78星人";
        this.title_textfield.x = 20;
        this.title_textfield.y = 270;
        this.addChild(this.title_textfield);
    }
}