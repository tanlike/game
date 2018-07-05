import { Global } from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.Node)
    lastWall: cc.Node = null;
    @property(cc.Prefab)
    wall: cc.Prefab = null;
    @property
    twoPro: number = 0.4;

    private walls: Array<cc.Node> = [];
    private count: number;
    private maxCount: number = 20;

    onLoad () {
        this.node.on("createwall",this.createWall,this);
        for(let i = 0; i < this.maxCount; i++){
            this.walls[i] = cc.instantiate(this.wall);
            this.node.addChild(this.walls[i]);
            this.walls[i].setPosition(-1000,0);
        }
        this.count = 0;
    }

    onDisable(){
        this.node.off("createwall",this.createWall,this);
    }

    private index: number = 10;

    public canCreate(index: number){
        
    }

    private createWall(step: number){
        if(this.count >= this.maxCount){
            this.count = 0;
        }
        let postion: cc.Vec2 = this.lastWall.position;
        this.walls[this.count].setPosition(postion.x + Global.addWidth * step, postion.y + Global.addHeight);
        this.lastWall = this.walls[this.count];
        this.count++;
        cc.log('生成墙' + this.count + ',' + step);
    }
}
