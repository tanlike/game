import Game from './Game';
import { Path } from './Path';
import { Utils } from './Utils';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    maxHp: number = 3;
    @property(cc.Vec2)
    bornPoint: cc.Vec2 = null;
    @property(cc.Vec2)
    destinationPoint: cc.Vec2 = null;
    @property
    duration: number = 1;
    @property
    score : number = 5;

    @property(cc.Node)
    hpBar: cc.Node = null;
    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    @property(cc.Prefab)
    bomb: cc.Node = null;

    private game: Game = null;
    private curHp: number = 0;

    onLoad(){
        this.game = cc.find("Canvas").getComponent("Game"); 
        this.curHp = this.maxHp;
        this.hpBar.active = false;
        this.node.setPosition(this.bornPoint);
    }

    start(){
        cc.moveTo(this.duration,Utils.get2dXYByIndex(this.game.startIndex));
        this.move();
    }

    public move(){
        let index = Utils.getIndexBy2dXY(this.node.x,this.node.y);
        let paths: Array<Path> = this.game.getPath(index);
        if(paths != null){
            this.moveToDestination(paths);
        }
    }

    public moveToDestination(paths: Array<Path>){
        let actions: Array<cc.FiniteTimeAction> = [];
        paths.forEach(value => {
            let point: cc.Vec2 = Utils.get2dXYByIndex(value.index);
            actions.push(cc.moveTo(this.duration,point));
        });
        actions.push(cc.moveTo(this.duration,this.destinationPoint));
        let finished: cc.ActionInstant = cc.callFunc(this.toTheFinish,this);
        actions.push(finished);
        this.node.runAction(cc.sequence(actions));
    }

    private toTheFinish(){
        this.game.addHp(-1);
        this.delete();
    }

    public hurt(dechp: number){
        this.playEffect();
        this.curHp -= dechp;
        if(this.curHp < this.maxHp){
            this.hpBar.active = true;
            let pre = this.curHp / this.maxHp > 0 ? this.curHp / this.maxHp : 0;
            this.sprite.fillRange =  pre;
        }
        if(this.curHp <= 0){
           // cc.log('杀死怪物');
            this.node.stopAllActions();
            this.game.addScore(this.score);
            this.delete();
        }
    }

    public delete(){
        let index = this.game.enemys.indexOf(this.node);
        this.game.enemys.splice(index,1);
        this.node.destroy();
    }

    private playEffect(){
        let effect: cc.Node  = cc.instantiate(this.bomb);
        this.node.addChild(effect);
        effect.setPosition(cc.p(0,0));
    }

   // update (dt) {}
}
