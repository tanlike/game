var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super.call(this) || this;
        _this._isAction1mc = true;
        var data = RES.getRes("stay_mc_json");
        var texture = RES.getRes("stay_tex_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        _this._action1mc = new egret.MovieClip(mcFactory.generateMovieClipData("stay"));
        _this._action1mc.gotoAndPlay(1, -1);
        data = RES.getRes("weizhu_mc_json");
        texture = RES.getRes("weizhu_tex_png");
        mcFactory = new egret.MovieClipDataFactory(data, texture);
        _this._action2mc = new egret.MovieClip(mcFactory.generateMovieClipData("weizhu"));
        _this._action2mc.gotoAndPlay(1, -1);
        _this.anchorOffsetX = 30;
        _this.anchorOffsetY = 55;
        _this.playAction();
        return _this;
    }
    Cat.prototype.init = function () {
        this._isAction1mc = true;
        this.playAction();
    };
    Cat.prototype.playAction = function () {
        if (this.numChildren) {
            this.removeChildAt(0);
        }
        if (this._isAction1mc) {
            this.addChild(this._action1mc);
        }
        else {
            this.addChild(this._action2mc);
        }
    };
    Object.defineProperty(Cat.prototype, "isAction1", {
        get: function () {
            return this._isAction1mc;
        },
        set: function (val) {
            if (this._isAction1mc != val) {
                this._isAction1mc = val;
                this.playAction();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Cat;
}(egret.Sprite));
__reflect(Cat.prototype, "Cat");
//# sourceMappingURL=Cat.js.map