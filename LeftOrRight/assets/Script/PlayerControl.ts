
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    private direction: number = 0;
    private jump: boolean;
    private jumpSpeed: number = 800;
    private acc: number = 800;
    private gravity: number = -1500;
    private maxSpeed: cc.Vec2 = cc.p(800,800);
    private speed: cc.Vec2 = cc.p(0,0);
    private onCollisionX: number;
    private onCollisionY: number;

    onLoad(){
        cc.director.getCollisionManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);

        this.jump = false;
        this.onCollisionX = 0;
        this.onCollisionY = 0;
    }

    onDestroy(){
        cc.director.getCollisionManager().enabled = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
    }

    private keyDown(evt: cc.Event.EventCustom){
        switch(evt.keyCode){
            case cc.KEY.a:
                this.direction = -1;
                break;
            case cc.KEY.d:
                this.direction = 1;
                break;
            case cc.KEY.w:
                if(!this.jump){
                    this.jump = true;
                    this.speed.y = this.jumpSpeed;
                }
                break;
        }
    }

    private keyUp(evt: cc.Event.EventCustom){
        switch(evt.keyCode){
            case cc.KEY.a:
            case cc.KEY.d:
            case cc.KEY.w:
                this.direction = 0;
                break;
        }
    }

    onCollisionEnter(other,self){
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        otherPreAabb.x = otherAabb.x;
        selfPreAabb.x = selfAabb.x;
        if(cc.Intersection.rectRect(otherPreAabb,selfPreAabb)){
            if(this.speed.x < 0 && selfPreAabb.xMax > otherPreAabb.xMax){
                this.onCollisionX = -1;
                this.node.x = otherPreAabb.xMax - this.node.parent.x// - selfPreAabb.width;
            }else if(this.speed.x > 0 && selfPreAabb.xMin < otherPreAabb.xMin){
                this.onCollisionX = 1;
                this.node.x = otherPreAabb.xMin - this.node.parent.x - selfPreAabb.width;
            }
            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        otherPreAabb.y = otherPreAabb.y;
        selfPreAabb.y = selfAabb.y;
        if(cc.Intersection.rectRect(otherPreAabb,selfPreAabb)){
            if(this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax){
                this.onCollisionY = -1;
                this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.jump = false;
            }else if(this.speed.y > 0 && selfPreAabb.yMin < otherPreAabb.yMin){
                this.onCollisionY = 1;
                this.node.y = otherPreAabb.yMin - this.node.parent.y - selfPreAabb.height;
            }
            this.speed.y = 0;
            other.touchingY = true;
        }
    }

    onCollisionExit(other,self){
        if(other.touchingX){
            this.onCollisionX = 0;
            other.touchingX = false;
        }else if(other.touchingY){
            this.onCollisionY = 0;
            other.touchingY = false;
            this.jump = true;
        }
    }

    update (dt) {
        if(this.onCollisionY === 0){
            this.speed.y += this.gravity * dt;
            if(Math.abs(this.speed.y) > this.maxSpeed.y){
                this.speed.y = this.speed.y / Math.abs(this.speed.y) * this.maxSpeed.y;
            }
        }
        if(this.direction === 0){
            if(this.speed.x < 0){
                this.speed.x += this.acc * dt;
                this.speed.x = this.speed.x > 0 ? 0 : this.speed.x;
            }else if(this.speed.x > 0){
                this.speed.x -= this.acc * dt;
                this.speed.x = this.speed.x < 0 ? 0 : this.speed.x;
            }
        }else{
            this.speed.x += this.acc * dt * this.direction;
            if(Math.abs(this.speed.x) > this.maxSpeed.x){
                this.speed.x = this.speed.x / Math.abs(this.speed.x) * this.maxSpeed.x;
            }
        }
        if(this.speed.x * this.onCollisionX > 0){
            this.speed.x = 0;
        }
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    }
}
