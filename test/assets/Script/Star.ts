import { Game } from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export class Star extends cc.Component {

    private curDuration: number = 0;
    private game: Game = null;
    private maxDuration: number = 0;

    start(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.game = this.node.parent.getComponent("Game");
        this.maxDuration = this.game.duration;
        this.curDuration = this.maxDuration;
    }

    update (dt) {
        if(this.curDuration > 0){
            this.curDuration -= dt;
            let per: number = (255 - 50) * this.curDuration / this.maxDuration;
            this.node.opacity = 50 + per;
        }
    }

    onCollisionEnter(other,self){
        this.node.dispatchEvent(new cc.Event.EventCustom('hit',true));
    }
}
