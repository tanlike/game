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
        let tr = Math.atan2(this.target.y,this.target.x);
        let nr = Math.atan2(this.node.y,this.node.x);
        let d =  (tr - nr)*180 + 180;
        return d;
    }

    update (dt) {
        this.curtime += dt;
        if(this.curtime > this.attckInterval){
            if(this.target == null){
                this.target = this.findTarget();
            }else{
                if(cc.isValid(this.target)){
                    if( cc.pDistance(this.target.position,this.node.position) > this.attckRange){
                        this.target = this.findTarget();
                    }
                }else{
                    this.target = null;
                }
            }
            if(cc.isValid(this.target)){
                this.node.rotation = this.getRotation();
                this.target.getComponent("Enemy").hurt(this.attack);
                this.curtime = 0;
            }
        }
    }
}
