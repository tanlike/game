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

    private game: Game;
    private target: cc.Node = null;
    private curtime: number = 0;

    onLoad () {
        this.game = cc.find("Canvas").getComponent("Game");
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
        let sp = this.target.convertToWorldSpaceAR(this.target.getPosition());
        let pos = this.node.convertToWorldSpaceAR(this.node.getPosition());
        let truePos = cc.p(sp.x - pos.x, sp.y - pos.y);
        let radian = cc.pAngleSigned(truePos,cc.p(1,0));
        let angle = cc.radiansToDegrees(radian) + 360;
        //cc.log('angle=' + angle);
        return angle;
    }

    update (dt) {
        this.curtime += dt;
        if(this.target == null){
            this.target = this.findTarget();
           // cc.log('找到一个新目标=' + this.target);
        }
        if(this.target != null){
            if(cc.isValid(this.target)){
                this.node.runAction(cc.rotateTo(dt,this.getRotation()));
                if(this.curtime > this.attckInterval){
                   // cc.log('对目标发起攻击');
                    this.shoot();
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

    private shoot(){
        // let bullet = cc.instantiate(this.bullet);
        // let bulletPosition: cc.Node = this.node.getChildByName("bulletPosition");
        // bullet.setPosition(bulletPosition.position);
        // bullet.rotation = this.node.rotation;
        // if(this.node.parent){
        //     this.node.addChild(bullet);
        // }
        // bullet.runAction(cc.sequence(cc.moveTo(1,this.node.convertToNodeSpace(this.target.position)),cc.callFunc(function(){
        //     bullet.destroy();
        // })));
    }
}
