const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Sprite)
    leftPlayer: cc.Sprite = null;
    @property(cc.Sprite)
    rightPlayer: cc.Sprite = null;
    @property(cc.Prefab)
    enemy: cc.Prefab = null;
    @property(cc.Label)
    timeLabel: cc.Label = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
        this.node.on("gameover",this.gameOver,this);
        this.schedule(this.addEnemy,10,this.maxEnemyNum - this.enemyNum - 1);
    }

    private enemyNum: number = 5;
    private maxEnemyNum: number = 20;
    private time:number = 0;

    start(){
        for(let i = 0; i < this.enemyNum; i++){
            this.addEnemy();
        }
    }

    update(dt){
        this.time += dt;
        this.showTime(Math.round(this.time));
    }

    private showTime(t: number){
        this.timeLabel.string = 'time:' + t + 's';
    }

    private addEnemy(){
        let e: cc.Node = cc.instantiate(this.enemy);
        this.node.addChild(e);
        e.setPosition(cc.p(200 + 100 * cc.randomMinus1To1(),155));
    }

    private onTouch(evt: cc.Event.EventTouch){
        if(evt.getLocation().x <= this.node.width / 2){
            this.leftTouch();
        }else{
            this.touchId = evt.getID();
            this.rightTouch();
        }
    }

    private leftTouch(){
        this.leftPlayer.node.getComponent("LeftPlayer").jump();
    }

    private rightTouch(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onEnd,this);
    }

    private touchId: number;

    private onMove(evt: cc.Event.EventTouch){
        this.touchId = evt.getID();
        let p: cc.Vec2 = evt.getLocation();
        let preP: cc.Vec2 = evt.getPreviousLocation();
        if(cc.isValid(this.rightPlayer.node)){
            this.rightPlayer.node.setPosition(cc.pAdd(this.rightPlayer.node.position,cc.pSub(p,preP)));
        }
    }

    private onEnd(evt: cc.Event.EventTouch){
        cc.log('----------------------------------------');
        cc.log(evt.getID() + ',' + this.touchId);
        if(evt.getID() == this.touchId)
        {
            cc.log('取消touch移动');
            this.node.off(cc.Node.EventType.TOUCH_MOVE,this.onMove,this);
        }
    }

    private gameOver(){
        cc.director.loadScene("game");
    }
}
