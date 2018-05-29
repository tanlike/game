class Tile extends egret.Sprite{
    public index : number = 0;              //位置
    public _redSkin : egret.Bitmap ;        //红圈
    public _blackSkin : egret.Bitmap;       //灰圈
    private _isOpen : boolean = true;       //是否可走

    public constructor(textures : egret.SpriteSheet){
        super();

        this._redSkin = new egret.Bitmap();
        this._redSkin.texture = textures.getTexture("pot2");

        this._blackSkin = new egret.Bitmap();
        this._blackSkin.texture = textures.getTexture("pot1");

        this.anchorOffsetX = 50;
        this.anchorOffsetY = 50;

        this.width = 45;
        this.height = 45;
        this.touchEnabled = true;
        this.addChild(this._blackSkin);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }
    //获取可走状态
    public getStatus() : boolean{
        return this._isOpen;
    }
    //设置为可走
    public open(){
        if(!this._isOpen){
            this._isOpen = true;
            this.removeChild(this._redSkin);
            this.addChild(this._blackSkin);
        }
    }
    //设置为不可走
    public close(){
        if(this._isOpen){
            this._isOpen = false;
            this.removeChild(this._blackSkin);
            this.addChild(this._redSkin);
        }
    }
    //点击后切换为不可走
    public onClick(){
        if(this._isOpen){
            var evt : GameEvent = new GameEvent(GameEvent.OPEN_TILE);
            evt.open_tile_index  = this.index;
            this.dispatchEvent(evt);
        }
        this.close();
    }
}