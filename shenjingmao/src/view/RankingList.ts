class RankingList extends egret.Sprite{
    public _rankBtn: egret.Sprite;
    private _isShow: boolean = false;
    private bitmap_rank: egret.Bitmap;
    private rankingListMask: egret.Shape;

    public constructor(){
        super();

        this._rankBtn = new egret.Sprite();
        this._rankBtn.width = 93;
        this._rankBtn.height = 93;
        var bitmap: egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes('rank_jpg');
        this._rankBtn.addChild(bitmap);
        this._rankBtn.touchEnabled = true;
        this.addChild(this._rankBtn);
        this._rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showRankingList,this);

        this.x = 50;
        this.y = 50;
    }

    private showRankingList(){
        if(this._isShow){
            this.bitmap_rank.parent && this.bitmap_rank.parent.removeChild(this.bitmap_rank);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this._isShow = false;
        }else{
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000,1);
            this.rankingListMask.graphics.drawRect(0,0,this.stage.width,this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = false;
            this.addChild(this.rankingListMask);

            this.addChild(this._rankBtn);

            const bitmapData = new egret.BitmapData(window["sharedCanvas"]);
            bitmapData.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapData);
            this.bitmap_rank = new egret.Bitmap(texture);
            this.bitmap_rank.width = this.stage.stageWidth;
            this.bitmap_rank.height = this.stage.stageHeight;
            this.addChild(this.bitmap_rank);

            egret.startTick((timeStartmp: number) => {
                egret.WebGLUtils.deleteWebGLTexture(bitmapData.webGLTexture);
                bitmapData.webGLTexture = null;
                return false;
            },this);

            this._isShow = true;

            WxInvoke.instance().showFriendRankingList();

        }
    }

}