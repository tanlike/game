import Game from './Game';
import { Path } from './Path';
import { Utils } from './Utils';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    hp: number = 3;
    @property
    speed: number = 10;
    @property(cc.Vec2)
    bornPoint: cc.Vec2 = null;
    @property(cc.Vec2)
    destinationPoint: cc.Vec2 = null;
    @property
    duration: number = 1;

    private game: Game = null;

    onLoad(){
        this.game = cc.find("Canvas").getComponent("Game"); 
    }

    start(){
        this.node.setPosition(this.bornPoint);
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
        this.game.enemyPool.put(this.node);
    }

    public hurt(dechp: number){
        this.hp -= dechp;
        if(this.hp <= 0){
            cc.log('杀死怪物');
            this.game.enemyPool.put(this.node);
        }
    }

    unuse(){
        cc.log('放入敌人对象池');
        this.node.stopAllActions();
        let index = this.game.enemys.indexOf(this.node);
        this.game.enemys.splice(index,1);
    }

   // update (dt) {}
}
