

const {ccclass, property} = cc._decorator;

@ccclass
export  class LeftPlayer extends cc.Component {

    @property(cc.Vec2)
    gravity: cc.Vec2 = cc.p(0,-300);
    @property(cc.Vec2)
    public jumpSpeed: cc.Vec2 = cc.p(0,300);

    onLoad(){
        cc.director.getCollisionManager().enabled = true;
    }

    onCollisionEnter(other,self){
        let evt: cc.Event.EventCustom = new cc.Event.EventCustom("gameover",true);
        this.node.dispatchEvent(evt);
        this.node.destroy();
    }

    private speed: cc.Vec2 = cc.p(0,0);

    public jump(){
        this.speed = this.jumpSpeed;
    }

    update(dt){
        this.speed = cc.pAdd(this.speed,cc.pMult(this.gravity,dt));
        this.node.y += this.speed.y * dt;
    }
}
