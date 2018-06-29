import Game from './Game';
const {ccclass, property} = cc._decorator;

@ccclass
export default class CannonTurret extends cc.Component {

    @property
    attack: number = 1;
    @property
    attckRange: number = 100;
    @property
    attckInterval: number = 0.3;
    @property(cc.Prefab)
    bullet: cc.Prefab = null;
    @property(cc.Prefab)
    levelUpRangePanel: cc.Prefab = null;
    @property
    public levelUpScore: number = 20;
    @property
    public maxLevel: number = 5;

    private game: Game;
    private target: cc.Node = null;
    private curtime: number = 0;
    private curLevel: number = 1;
    public index:number;

    onLoad () {
        this.game = cc.find("Canvas").getComponent("Game");
        //this.node.on(cc.Node.EventType.TOUCH_START,this.levelUpRange,this);
    }

    onDestroy(){
        //this.node.on(cc.Node.EventType.TOUCH_START,this.levelUpRange,this);
    }

    private levelUpPanel: cc.Node;

    private levelUpRange(){
        if(this.game.isGameOver || this.game.isPause){
            return;
        }
        if(cc.isValid(this.levelUpPanel)){
            this.levelUpPanel.destroy();
            return;
        }
        this.levelUpPanel = cc.instantiate(this.levelUpRangePanel);
        this.levelUpPanel.getComponent("LevelUpPanle").index = 
        this.node.parent.addChild(this.levelUpPanel);
        this.levelUpPanel.setPosition(this.node.position);
    }

    private levelUpRangeHandle(evt: cc.Event.EventCustom){
        cc.log(evt.target);
        let type = evt.getUserData();
        if(type == 1){
            this.levelUp(evt.target);
        }else if(type == 2){
            this.cancelTower(evt.target);
        }
        evt.target.destroy();
    }

    private levelUp(target){
        if(this.curLevel < this.maxLevel){
            if(this.game.score > this.levelUpScore){
                this.curLevel++;
                this.game.addScore(-this.levelUpScore);
                this.attack += 2;
                cc.log('塔升级');
            }
        }
    }

    private cancelTower(target){
        cc.log('销毁塔');
        let score = Math.floor((this.game.needScore + this.levelUpScore * (this.curLevel - 1)) / 2);
        this.game.addScore(score);
        let index = this.game.tower.indexOf(target);
        this.game.tower.splice(index,1);
        this.game.mapHasTower[index] = false;
        this.game.tower[index].destroy();
    }


    private findTarget(): cc.Node{
        for(let enemy of this.game.enemys){
            if(cc.pDistance(this.node.position,enemy.position) <= this.attckRange){
                return enemy;
                break;
            }
        }
        return null;
    }

    private getRotation(): number{
        let dir = cc.pNormalize(cc.pSub(this.target.position,this.node.position));
        let radian = cc.pAngleSigned(dir,cc.p(1,0));
        let angle = cc.radiansToDegrees(radian);
        return angle;
    }

    update (dt) {
        this.curtime += dt;
        if(this.target == null){
            this.target = this.findTarget();
            //cc.log('找到一个新目标=' + this.target);
        }
        if(this.target != null){
            if(cc.isValid(this.target)){
                //cc.log(this.target.uuid + ',旋转角度=' + this.getRotation());
                this.node.rotation = this.getRotation();
                //cc.log(this.node.rotation);
                if(this.curtime > this.attckInterval){
                    this.target.getComponent("Enemy").hurt(this.attack);
                    this.curtime = 0;
                }else{
                    this.target = null;
                   // cc.log('距离太远清除目标')
                }
            }else{
                this.target = null;
               // cc.log('目标不存在，清除目标');
            }
        }
    }

}
