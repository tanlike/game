
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

    public tower: Array<cc.Node> = [];
    public enemyPool: cc.NodePool;

    onLoad(){
        let startX = -427;
        let startY = 196;
        for(let i=0; i<8; i++){
            for(let j=0; j<18; j++){
                let ground = cc.instantiate(this.ground);
                let index: number = i * 8 + j
                ground.getComponent("Ground").index = index;
                ground.setPosition(startX + j * 50,startY - i * 50);
                this.node.addChild(ground);
                this.tower[index] = null;
            }
        }
        this.enemyPool = new cc.NodePool();
        for(let i=0; i<30; i++){
            let enemy: cc.Node = cc.instantiate(this.enemy);
            this.enemyPool.put(enemy);
        }
    }

    start () {
        this.node.on("createrange",this.createRange,this);
        this.node.on("createtower",this.createTower,this);
        this.schedule(this.addEnemys,30,9,5);
    }

    private addEnemys(){
        //cc.log('------------------------------------------------');
        this.schedule(()=>{
            cc.log('刷怪');
            let enemy: cc.Node = this.enemyPool.get();
            this.node.addChild(enemy);
            enemy.getComponent("Enemy").init();
        },0.5,9);
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
        //cc.log('创建选塔界面');
    }

    private createTower(evt: cc.Event.EventCustom){
        let type: number = evt.getUserData();
        //cc.log('建塔类型=' + type);
        let target: cc.Prefab = null;
        if(type == 1){
            target = this.cannonTurret;
        }else if(type == 2){
            target = this.freezeTurret;
        }else if(type == 3){
            target = this.machineGunTurrent;
        }
        let tower: cc.Node = cc.instantiate(target);
        this.tower[this.curIndex] = tower;
        this.node.addChild(tower);
        tower.position = this.curRange.position;
        this.curRange.destroy();
    }

    

    // update (dt) {}
}
