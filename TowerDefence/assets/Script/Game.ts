
const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    cannonTurret: cc.Prefab = null;
    @property(cc.Prefab)
    freezeTurret: cc.Prefab = null;
    @property(cc.Prefab)
    machineGunTurrent: cc.Prefab = null;

    @property(cc.Prefab)
    enemy: cc.Prefab = null;
    @property(cc.Prefab)
    ground: cc.Prefab = null;
    @property(cc.Prefab)
    range: cc.Prefab = null;

    public map: Array<cc.Node> = [];
    public tower: Array<cc.Node> = [];

    onLoad(){
        let startX = -427;
        let startY = 196;
        for(let i=0; i<8; i++){
            for(let j=0; j<18; j++){
                let ground = cc.instantiate(this.ground);
                let index: number = i * 8 + j
                ground.getComponent("Ground").index = index;
                this.map[index] = ground;
                ground.setPosition(startX + j * 50,startY - i * 50);
                this.node.addChild(ground);

                this.tower[index] = null;
            }
        }
    }

    start () {
        this.node.on("createrange",this.createRange,this);
    }

    private curRange: cc.Node = null;
    private curIndex: number = 0;

    private createRange(evt: cc.Event.EventCustom){
        if(cc.isValid(this.curRange)){
            this.curRange.destroy();
            return;
        }
        let position: cc.Vec2 = evt.getUserData().node.position;
        this.curIndex = evt.getUserData().index;
        this.curRange = cc.instantiate(this.range);
        this.node.addChild(this.curRange);
        this.curRange.position = position;
        this.addTowerListen();
        cc.log('创建选塔界面');
    }

    private addTowerListen(){
        let cannonTurret: cc.Node = this.curRange.getChildByName("CannonTurret");
        cannonTurret.on(cc.Node.EventType.MOUSE_DOWN,this.createTower1,this);
        let freezeTurret: cc.Node = this.curRange.getChildByName("FreezeTurret");
        freezeTurret.on(cc.Node.EventType.MOUSE_DOWN,this.createTower2,this);
        let machineGunTurret: cc.Node = this.curRange.getChildByName("MachineGunTurret");
        machineGunTurret.on(cc.Node.EventType.MOUSE_DOWN,this.createTower3,this);
    }

    private createTower1(){
        cc.log('创建塔1');
        let tower: cc.Node = cc.instantiate(this.cannonTurret);
        this.tower[this.curIndex] = tower;
        this.node.addChild(tower);
        tower.position = this.curRange.position;
        this.curRange.destroy();
    }

    private createTower2(){
        cc.log('创建塔2');
    }

    private createTower3(){
        cc.log('创建塔3');
    }

    

    // update (dt) {}
}
