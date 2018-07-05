import { Global } from "./Global";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    hero: cc.Node = null;
    @property(cc.Node)
    map: cc.Node = null;
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property
    duration: number = 0.3;
    @property(cc.Node)
    gameoverPanel: cc.Node = null;

    private score: number;
    private getScore: number;
    private gameover: boolean;
    public isClick: boolean;
    private index: number = 0;

    onLoad(){
        this.score = 0;
        this.getScore = 0;
        this.addScore();
        this.gameover = false;
        this.isClick = true;
    }

    private move(target:cc.Event.EventCustom, customEventData: string){
        if(this.gameover || !this.isClick){
            return;
        }
        this.isClick = false;
        let step: number = parseInt(customEventData);
        this.getScore = step;
        let jump: cc.ActionInterval = cc.jumpTo(this.duration,cc.pAdd(this.hero.position,cc.p(Global.addWidth * step, 0)),Global.addHeight * (step+1),1);
        let finished = cc.callFunc(this.showGameOverPanel,this);
        this.hero.runAction(cc.sequence(jump,finished));
        this.index += step;
        for(let i = 0; i < step; i++){
            this.map.getComponent("Map").canCreate(this.index);
        }
    }

    private showGameOverPanel(){
        //this.gameover = true;
        //this.gameoverPanel.active = true;
    }

    private gameOver(){
        cc.director.loadScene("game");
    }

    public addScore(){
        this.score += this.getScore;
        this.scoreLabel.string = "score:" + this.score;
    }
}
