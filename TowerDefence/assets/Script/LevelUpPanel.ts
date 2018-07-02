import Game from './Game';
import CannonTurret from './CannonTurret';
const {ccclass, property} = cc._decorator;

@ccclass
export class LevelUpPanel extends cc.Component {

    private tower: CannonTurret;
    private game: Game;

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
        this.game = cc.find("Canvas").getComponent("Game");
    }

    private onTouch(evt: cc.Event.EventCustom){
        evt.stopPropagation();
        this.node.destroy();
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouch,this);
    }

    private levelUpRangeHandle(evt, customEventData){
        if(customEventData == 1){
            this.levelUp(evt.target);
        }else if(customEventData == 2){
            this.cancelTower(evt.target);
        }
        this.node.destroy();
    }

    private levelUp(target){
        let towerScript = this.tower.getComponent("CannonTurret");
        if(towerScript.curLevel < towerScript.maxLevel){
            if(this.game.score >= towerScript.levelUpScore){
                towerScript.curLevel++;
                this.game.addScore(-towerScript.levelUpScore);
                towerScript.attack += 2;
            }
        }
    }

    private cancelTower(target){
        let towerScript = this.tower.getComponent("CannonTurret");
        let score = Math.floor((this.game.needScore + towerScript.levelUpScore * (towerScript.curLevel - 1)) / 2);
        this.game.addScore(score);
        this.game.mapHasTower[towerScript.index] = false;
        this.tower.destroy();
    }
}
