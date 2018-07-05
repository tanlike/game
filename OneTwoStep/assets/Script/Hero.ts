import Game from "./Game";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    private game: Game;

    onLoad(){
        this.game = this.node.parent.getComponent("Game");
        cc.director.getCollisionManager().enabled = true;
    }

    onDestroy(){
        cc.director.getCollisionManager().enabled = false;
    }

    onCollisionEnter(other,self){
        this.node.stopAllActions();
        let otherAabb = other.world.aabb;
        let selfAabb = self.world.aabb; 
        if(cc.Intersection.rectRect(otherAabb,selfAabb)){
            if(selfAabb.yMax > otherAabb.yMax){
                this.node.y = otherAabb.yMax - this.node.parent.y;
                this.node.x = otherAabb.xMin - this.node.parent.x + otherAabb.width / 2;
                this.game.addScore();
                this.game.isClick = true;
            }
        }
    }
}
