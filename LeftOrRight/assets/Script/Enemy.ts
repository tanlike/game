
const {ccclass, property} = cc._decorator;

@ccclass
export class Enemy extends cc.Component {

    @property
    speed: number = 1;

    private direction: cc.Vec2;

    onLoad(){
        cc.director.getCollisionManager().enabled = true;
        this.direction = new cc.Vec2(cc.randomMinus1To1(),cc.randomMinus1To1());
        this.direction.normalizeSelf();
    }

    onCollisionEnter(other: cc.BoxCollider,self: cc.BoxCollider){
        if(other.tag == 2){
            this.direction.x = -this.direction.x;
        }else if(other.tag == 3){
            this.direction.y = -this.direction.y;
        }
    }

    update (dt) {
        let moveSpeed: cc.Vec2 = cc.pMult(this.direction,this.speed);
        this.node.setPosition(cc.pAdd(this.node.position,cc.pMult(moveSpeed,dt)));
    }
}
