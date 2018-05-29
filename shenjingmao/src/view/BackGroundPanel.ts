class BackGroundPanel extends egret.Bitmap{
    public constructor(root : egret.DisplayObjectContainer,textures : egret.SpriteSheet){
        super();

        this.texture = textures.getTexture("bg");
        root.addChild(this);
    }
}