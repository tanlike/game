class BackGroundPanel extends egret.Sprite{
    public constructor(root: egret.DisplayObjectContainer){
        super();
        var bg = new egret.TextField();
        bg.width = 700;
        bg.height = 800;
        bg.background = true;
        bg.backgroundColor = 0x666666;
        bg.border = true;
        bg.borderColor = 0x666666;
        root.addChild(bg);
    }
}