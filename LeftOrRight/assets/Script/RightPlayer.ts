
const {ccclass, property} = cc._decorator;

@ccclass
export class RightPlayer extends cc.Component {

    public touchMove: cc.Vec2;
    @property
    speed: number = 0;

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.touchMove = cc.p(0,0);
    }

    onCollisionEnter(other: cc.BoxCollider,self: cc.BoxCollider){
        if(other.tag == 1)
        {
            let evt: cc.Event.EventCustom = new cc.Event.EventCustom("gameover",true);
            this.node.dispatchEvent(evt);
            this.node.destroy();
        }
    }

    update (dt) {
        let p: cc.Vec2 = cc.pAdd(cc.pMult(this.touchMove,this.speed),this.node.position);
        let leftX = -399 + 5;
        let rightX = -37 - 5;
        let topY = 201 - 5;
        let bottomY = -158 + 5;
        if(p.x < leftX){
            p.x = leftX;
        }
        if(p.x > rightX){
            p.x = rightX;
        }
        if(p.y > topY){
            p.y = topY;
        }
        if(p.y < bottomY){
            p.y = bottomY;
        }
        this.node.setPosition(p);
        this.touchMove = cc.p(0,0);
    }
}
