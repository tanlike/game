
const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.AudioClip)
    jumpClip: cc.AudioClip = null;
    
    @property
    duration: number = 0.3;
    @property
    public jumpHeight: number = 200;
    @property
    maxMoveSpeed: number = 400;
    @property
    accelerate: number = 350;

    private leftMove = false;
    private rightMove = false;
    private speed: number = 0;

    onLoad () {
        let jumpUp: cc.ActionInterval = cc.moveBy(this.duration,0,this.jumpHeight).easing(cc.easeCubicActionOut());
        let jumpDown: cc.ActionInterval = cc.moveBy(this.duration,0,-this.jumpHeight).easing(cc.easeCubicActionIn());
        let finished = cc.callFunc(this.playJumpAudio,this);
        this.node.runAction(cc.repeatForever(cc.sequence(jumpUp,jumpDown,finished)));
    }

    private playJumpAudio(target){
        cc.audioEngine.play(this.jumpClip as any,false,1);
    }

    start(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
    }

    public gameOver(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
        this.leftMove = false;
        this.rightMove = false;
    }

    private keyDown(evt: cc.Event.EventCustom){
        switch(evt.keyCode){
            case cc.KEY.a:
                this.leftMove = true;
                break;
            case cc.KEY.d:
                this.rightMove = true;
                break;
        }
    }

    private keyUp(evt: cc.Event.EventCustom){
        switch(evt.keyCode){
            case cc.KEY.a:
                this.leftMove = false;
                break;
            case cc.KEY.d:
                this.rightMove = false;
                break;
        }
    }

    update(dt){
        if(this.leftMove){
            this.speed -= dt * this.accelerate;
        }
        if(this.rightMove){
            this.speed += dt * this.accelerate;
        }
        if(this.maxMoveSpeed < Math.abs(this.accelerate)){
            this.speed += this.accelerate / Math.abs(this.accelerate) * this.maxMoveSpeed;
        }
        this.node.x += this.speed * dt;
        if(Math.abs(this.node.x) > this.node.parent.width / 2){
            this.node.x = this.node.x / Math.abs(this.node.x) * this.node.parent.width / 2;
        }
    }
}
