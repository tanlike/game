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
    private max: number = Infinity;
    private bornX: number = 10;

    onLoad () {
        this.node.on("createwall",this.createWall,this);
        for(let i = 0; i < this.maxCount; i++){
            this.walls[i] = cc.instantiate(this.wall);
            this.node.addChild(this.walls[i]);
            this.walls[i].setPosition(-1000,0);
            this.indexs[i] = this.max;
        }
        this.count = 0;
    }

    onDisable(){
        this.node.off("createwall",this.createWall,this);
    }

    private indexs: Array<number> = [];

    public canCreate(pos: number){
        this.indexs.forEach((value,index) => {
            if( value < pos - 2){
                this.indexs[index] = this.max;
            }
        });
        this.createWall();
    }

    private createWall(){
        for(let i = 0; i < this.indexs.length; i++){
            if(this.indexs[i] === this.max){
                let step: number = 1 + Math.round(cc.random0To1());
                let postion: cc.Vec2 = this.lastWall.position;
                this.walls[i].setPosition(postion.x + Global.addWidth * step, postion.y + Global.addHeight);
                this.lastWall = this.walls[i];
                this.bornX += step;
                this.indexs[i] = this.bornX;
                return;
            }
        }
    }
}
