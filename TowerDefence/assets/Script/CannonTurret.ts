import Game from './Game';
const {ccclass, property} = cc._decorator;

@ccclass
export default class CannonTurret extends cc.Component {

    @property
    attack: number = 1;
    @property
    attckRange: number = 100;
    @property
    attckInterval: number = 0.3;
    @property(cc.Prefab)
    bullet: cc.Prefab = null;
    @property
    public levelUpScore: number = 20;
    @property
    public maxLevel: number = 5;
    @property(cc.Sprite)
    tower: cc.Sprite = null;    
    @property(cc.Label)
    lv: cc.Label = null;

    private game: Game;
    private target: cc.Node = null;
    private curtime: number = 0;
    private curLevel: number = 1;
    public index:number;

    public init(index: number){
        this.index = index;
    }

    public setLevel(level: number){
        this.lv.string = 'lv:' + this.curLevel;
    }

    onLoad () {
        this.game = cc.find("Canvas").getComponent("Game");
        this.tower.node.on(cc.Node.EventType.TOUCH_START,this.levelUpRange,this);
    }

    onDestroy(){
        //this.tower.node.off(cc.Node.EventType.TOUCH_START,this.levelUpRange,this);
    }

    private levelUpRange(evt: cc.Event.EventCustom){
        evt.stopPropagation();
        if(this.game.isGameOver || this.game.isPause){
            return;
        }
        let createEvent: cc.Event.EventCustom = new cc.Event.EventCustom('createtoweruprange',true)
        this.node.dispatchEvent(createEvent);
    }

    private findTarget(): cc.Node{
        for(let enemy of this.game.enemys){
            if(cc.pDistance(this.node.position,enemy.position) <= this.attckRange){
                return enemy;
                break;
            }
        }
        return null;
    }

    private getRotation(): number{
        let dir = cc.pNormalize(cc.pSub(this.target.position,this.node.position));
        let radian = cc.pAngleSigned(dir,cc.p(1,0));
        let angle = cc.radiansToDegrees(radian);
        return angle;
    }

    update (dt) {
        this.curtime += dt;
        if(this.target == null){
            this.target = this.findTarget();
            //cc.log('找到一个新目标=' + this.target);
        }
        if(this.target != null){
            if(cc.isValid(this.target)){
                //cc.log(this.target.uuid + ',旋转角度=' + this.getRotation());
                this.tower.node.rotation = this.getRotation();
                //cc.log(this.node.rotation);
                if(this.curtime > this.attckInterval){
                    this.target.getComponent("Enemy").hurt(this.attack);
                    this.curtime = 0;
                }else{
                    this.target = null;
                   // cc.log('距离太远清除目标')
                }
            }else{
                this.target = null;
               // cc.log('目标不存在，清除目标');
            }
        }
    }

}
