import Game from './Game';
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
    duration: number = 10;

    private game: Game = null;

    onLoad(){
        this.game = cc.find("Canvas").getComponent("Game");
    }

    public init(){
        this.node.setPosition(this.bornPoint);
        let move: cc.ActionInterval = cc.moveTo(this.duration,this.destinationPoint);
        let finished: cc.ActionInstant = cc.callFunc(this.toTheFinish,this);
        this.node.runAction(cc.sequence(move,finished));
    }

    private toTheFinish(){
        this.node.stopAllActions();
        this.node.destroy();
    }

    public hurt(){
        this.hp--;
        if(this.hp <= 0){
            this.node.destroy();
        }
    }

    update (dt) {}
}
