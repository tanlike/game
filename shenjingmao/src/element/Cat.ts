class Cat extends egret.Sprite{

    private _action1mc : egret.MovieClip;
    private _action2mc : egret.MovieClip;
    private _isAction1mc : boolean = true;

    public constructor(){
        super();

        var data = RES.getRes("stay_mc_json");
        var texture = RES.getRes("stay_tex_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, texture );
        this._action1mc = new egret.MovieClip(mcFactory.generateMovieClipData("stay"));
        this._action1mc.gotoAndPlay(1,-1);

        data = RES.getRes("weizhu_mc_json");
        texture = RES.getRes("weizhu_tex_png");
        mcFactory = new egret.MovieClipDataFactory(data,texture);
        this._action2mc = new egret.MovieClip(mcFactory.generateMovieClipData("weizhu"));
        this._action2mc.gotoAndPlay(1,-1);

        this.anchorOffsetX = 30;
        this.anchorOffsetY = 55;
        this.playAction();
    }

    public init() : void{
        this._isAction1mc = true;
        this.playAction();
    }

    public playAction() : void {
        if(this.numChildren){
            this.removeChildAt(0);
        }
        if(this._isAction1mc) {
            this.addChild(this._action1mc);
        }
        else{
            this.addChild(this._action2mc);
        }
    }

    public get isAction1() : boolean{
        return this._isAction1mc;
    }

    public set isAction1(val : boolean){
        if(this._isAction1mc != val){
            this._isAction1mc = val;
            this.playAction();
        }
    }
}