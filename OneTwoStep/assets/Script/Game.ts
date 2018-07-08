import { Global } from "./Global";
import Map from "./Map";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    hero: cc.Node = null;
    @property(cc.Node)
    map: cc.Node = null;
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property(cc.Node)
    gameoverPanel: cc.Node = null;
    @property(cc.AudioClip)
    jumpClip: cc.AudioClip = null;
    @property(cc.Label)
    lvLabel: cc.Label = null;

    private score: number;
    public gameover: boolean;
    public isClick: boolean;
    public index: number;
    private wall: Map;
    private initDruration:number = 2;
    private maxlv: number =  10;   

    onLoad(){
        this.index = 0;
        this.score = 0;
        this.addScore(0);
        this.gameover = false;
        this.isClick = true;
        this.wall = this.map.getComponent("Map");
        this.hero.position = cc.p(-this.node.width, 0);
    }

    private move(target:cc.Event.EventCustom, customEventData: string){
        if(this.gameover || !this.isClick){
            return;
        }
        this.isClick = false;
        let step: number = parseInt(customEventData);
        let jumpToY: number;
        let jumpAction: cc.ActionInterval;
        let finished: cc.ActionInstant;
        if(step == 1){
            jumpToY = Global.addHeight;
            if(this.wall.indexs.indexOf(this.index + 1) > 0){
                finished = cc.callFunc(this.seccess,this,step);
            }else{
                finished = cc.callFunc(this.faild,this);
            }
        }else if(step == 2){
            if(this.wall.indexs.indexOf(this.index + 1) > 0){
                jumpToY = Global.addHeight * 2;
            }else{
                jumpToY = Global.addHeight;
            }
            if(this.wall.indexs.indexOf(this.index + 2) > 0){
                finished = cc.callFunc(this.seccess,this,step);
            }else{
                finished = cc.callFunc(this.faild,this);
            }
        }
        jumpAction = cc.jumpTo(0.3,cc.pAdd(this.hero.position,cc.p(Global.addWidth * step,jumpToY)),jumpToY,1);
        this.hero.runAction(cc.sequence(jumpAction,finished)); 
        cc.audioEngine.play(this.jumpClip as any,false,1);
    }

    private resolve(index: number){
        let i = this.wall.indexs.indexOf(index);
        this.wall.indexs[i] = Infinity;
        if(this.index === index){
            this.wall.walls[i].destroy();
            this.faild();
        }
    }

    private seccess(target: cc.Node,step: number){
        let pos: number = this.index + step;
        this.isClick = true;
        this.addScore(step);
        for(let i = 0; i < step; i++){
            this.wall.createWall();
        }
        let sub = Math.floor(this.score / 50);
        sub = sub > this.maxlv ? this.maxlv : sub;
        this.showLevel(sub);
        let curDuration = this.initDruration - sub * 0.15;
        cc.log('curDuration=' + curDuration);
        this.scheduleOnce(() => this.resolve(pos),curDuration);
        this.index = pos;
    }

    public faild(){
        this.gameover = true;
        let drop: cc.ActionInterval = cc.moveTo(1,cc.pAdd(this.hero.position,cc.p(0,-500)));
        let finished: cc.ActionInstant = cc.callFunc(function(){
            this.gameoverPanel.active = true;
        },this);
        this.hero.runAction(cc.sequence(drop,finished));
    }

    private gameOver(){
        cc.director.loadScene("game");
    }

    public addScore(score: number){
        this.score += score;
        this.scoreLabel.string = "score:" + this.score;
    }

    private showLevel(lv : number){
        this.lvLabel.string  = "lv." + lv;
    }
}
