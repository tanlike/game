
const {ccclass, property} = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    star: cc.Prefab = null;

    @property(cc.Label)
    scoreLable: cc.Label = null;

    @property(cc.AudioClip)
    scoreClip: cc.AudioClip = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property
    distance: number = 50;

    @property(cc.Sprite)
    gameOverPanel: cc.Sprite = null;

    private score: number = 0;
    private curStar: cc.Node = null;
    private timer: number = 0;

    start () {
        this.scoreLable.string = '0';
        this.addStar();
    }

    public addStar(){
        this.curStar = cc.instantiate(this.star);
        let randX: number = cc.randomMinus1To1() * this.node.width / 2;
        let randY: number = cc.random0To1() * this.player.getComponent("Player").jumpHeight - this.node.getChildByName("ground").height / 2 + 50;
        this.curStar .setPosition(randX,randY);
        this.node.addChild(this.curStar);
        //cc.log('add star');
    }

    public addScore(){
        this.score++;
        this.scoreLable.string = this.score + "";
        cc.audioEngine.play(this.scoreClip as any,false,1);
    }

    update(dt){
        cc.log(cc.pDistance(this.curStar.position,this.player.getPosition()));
        if(cc.pDistance(this.curStar.position,this.player.getPosition()) < this.distance){
            this.curStar.destroy();
            this.addScore();
            this.addStar();
            this.timer = 0;
        }
        this.timer += dt;
        if(this.timer > this.curStar.getComponent("Star").maxDuration){
            this.gameOver();
        }
    }

    public gameOver(){
        this.player.stopAllActions();
        this.gameOverPanel.node.active = true;
        this.player.getComponent("Player").gameOver();
    }

    public resetGame(){
        cc.director.loadScene("game");
    }
}
