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
    @property(cc.Node)
    gameOverPanel: cc.Node = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
        this.node.on("gameover",this.showGameOverPanel,this);
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
        let p: cc.Vec2 = this.rightPlayer.node.parent.convertToWorldSpaceAR(this.rightPlayer.node.position);
        p = this.node.convertToNodeSpaceAR(p);
        e.setPosition(cc.p(p.x + 150 * cc.randomMinus1To1(),p.y + 150));
    }

    private onTouch(evt: cc.Event.EventTouch){
        let touchs = evt.getTouches();
        if(evt.getLocation().x <= this.node.width / 2){
            this.leftTouch();
        }else{
            this.touchId = touchs[0].getID();
            this.rightTouch();
            console.log('touch start=' + touchs[0].getID());
        }
    }

    private leftTouch(){
        if(cc.isValid(this.leftPlayer)){
            this.leftPlayer.node.getComponent("LeftPlayer").jump();
        }
    }

    private rightTouch(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onEnd,this);
    }

    private touchId: number;

    private onMove(evt: cc.Event.EventTouch){
        if(evt.getLocation().x >= this.node.width / 2)
        {
            let p: cc.Vec2 = evt.getLocation();
            let preP: cc.Vec2 = evt.getPreviousLocation();
            if(cc.isValid(this.rightPlayer.node)){
                this.rightPlayer.node.getComponent("RightPlayer").touchMove = cc.pSub(p,preP);
            }
        }
    }

    private onEnd(evt: cc.Event.EventTouch){
        let touchs = evt.getTouches();
        //console.log('touch end=' + touchs[0].getID());
        if(touchs[0].getID() == this.touchId)
        {
            //cc.log('取消touch移动');
            this.node.off(cc.Node.EventType.TOUCH_MOVE,this.onMove,this);
        }
    }

    private showGameOverPanel(){
        cc.director.pause();
        this.gameOverPanel.active = true;
    }

    private gameOver(){
        cc.director.resume();
        cc.director.loadScene("game");
    }
}
