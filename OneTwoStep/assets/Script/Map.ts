import { Global } from "./Global";
import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(cc.Prefab)
    wall: cc.Prefab = null;
    @property
    twoPro: number = 0.4;

    public walls: Array<cc.Node> = [];
    private maxCount: number = 50;
    private bornX: number = 10;
    private lastWall: cc.Node = null;

    onLoad () {
        this.node.on("createwall",this.createWall,this);
        for(let i = 0; i < this.maxCount; i++){
            this.walls[i] = cc.instantiate(this.wall);
            this.node.addChild(this.walls[i]);
            this.walls[i].setPosition(-1000,0);
            this.indexs[i] = Infinity; 
        }
    }

    start(){
        let pos: cc.Vec2 = cc.p(-cc.find("Canvas").width, -240);
        this.walls[0].setPosition(pos.x, pos.y);
        this.walls[1].setPosition(pos.x + Global.addWidth * 1, pos.y + Global.addHeight * 1);
        this.walls[2].setPosition(pos.x + Global.addWidth * 2, pos.y + Global.addHeight * 2);
        this.walls[3].setPosition(pos.x + Global.addWidth * 3, pos.y + Global.addHeight * 3);
        this.walls[4].setPosition(pos.x + Global.addWidth * 5, pos.y + Global.addHeight * 4);
        this.walls[5].setPosition(pos.x + Global.addWidth * 7, pos.y + Global.addHeight * 5);
        this.walls[6].setPosition(pos.x + Global.addWidth * 8, pos.y + Global.addHeight * 6);
        this.walls[7].setPosition(pos.x + Global.addWidth * 9, pos.y + Global.addHeight * 7);
        this.walls[8].setPosition(pos.x + Global.addWidth * 10, pos.y + Global.addHeight * 8);
        this.lastWall = this.walls[8];

        this.indexs[0] = 0;
        this.indexs[1] = 1;
        this.indexs[2] = 2;
        this.indexs[3] = 3;
        this.indexs[4] = 5;
        this.indexs[5] = 7;
        this.indexs[6] = 8;
        this.indexs[7] = 9;
        this.indexs[8] = 10;

    }

    onDisable(){
        this.node.off("createwall",this.createWall,this);
    }

    public indexs: Array<number> = [];

    public createWall(){
        for(let i = 0; i < this.indexs.length; i++){
            if(this.indexs[i] === Infinity){
                let step: number = 1;
                if(cc.random0To1() < this.twoPro){
                    step = 2;
                }
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
