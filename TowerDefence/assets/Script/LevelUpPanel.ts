import Game from './Game';
const {ccclass, property} = cc._decorator;

@ccclass
export class LevelUpPanel extends cc.Component {

    private index: number;
    private tower: cc.Node;
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

    private levelUpRangeHandle(evt: cc.Event.EventCustom){
        let type = evt.getUserData();
        if(type == 1){
            this.levelUp(evt.target);
        }else if(type == 2){
            this.cancelTower(evt.target);
        }
        evt.target.destroy();
    }

    private levelUp(target){
        let towerScript = this.tower.getComponent("CannoTurret");
        if(towerScript.curLevel < towerScript.maxLevel){
            if(this.game.score > towerScript.levelUpScore){
                towerScript.curLevel++;
                this.game.addScore(-towerScript.levelUpScore);
                towerScript.attack += 2;
                cc.log('塔升级');
            }
        }
    }

    private cancelTower(target){
        cc.log('销毁塔');
        let towerScript = this.tower.getComponent("CannoTurret");
        let score = Math.floor((this.game.needScore + towerScript.levelUpScore * (towerScript.curLevel - 1)) / 2);
        this.game.addScore(score);
        this.game.mapHasTower[this.index] = false;
        this.tower.destroy();
    }
}
