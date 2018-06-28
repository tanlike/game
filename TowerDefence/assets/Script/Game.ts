import { Path } from "./Path";
import { Utils } from './Utils';

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
    @property(cc.Button)
    pauseBtn: cc.Button = null;
    @property(cc.SpriteFrame)
    pauseSprite: cc.SpriteFrame = null;
    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property
    needScore: number = 20;
    @property(cc.Label)
    hpLabel: cc.Label = null;
    @property
    hp: number = 3;
    @property(cc.Node)
    gameOverPanel: cc.Node = null;
    @property(cc.Node)
    pausePanel: cc.Node = null;

    public tower: Array<cc.Node> = [];      //塔数组
    public map: Array<cc.Node> = [];        //地图数组
    public mapHasTower: Array<boolean> = [];  //地图是否有塔数组
    public score : number = 40;                 //记录分数

    public addScore(addScore: number){
        this.score += addScore;
        this.scoreLabel.string = "score:" + this.score;
    }

    onLoad(){
        for(let i=0; i<8; i++){
            for(let j=0; j<18; j++){
                let ground = cc.instantiate(this.ground);
                let index: number = i * 18 + j
                this.map[index] = ground;
                ground.getComponent("Ground").index = index;
                ground.getComponent("Ground").addListen();
                ground.position = Utils.get2dXYByIndex(index);
                this.node.addChild(ground);
                this.mapHasTower[index] = false;
            }
        }
        this.pauseBtnSpriteFrame = this.pauseBtn.normalSprite;
        this.addScore(0);
        this.addHp(0);
    }

    start () {
        this.node.on("createrange",this.createRange,this);
        this.node.on("createtower",this.createTower,this);
        this.schedule(this.addEnemys,30,cc.macro.REPEAT_FOREVER,1);
    }

    private reset(){
        cc.director.loadScene("game");
    }

    private pauseBtnSpriteFrame: cc.SpriteFrame;
    private isPause: boolean = false;
    private isGameOver: boolean = false;

    private pauseGame(){
        if(this.isGameOver){
            return;
        }
        if(this.isPause){
            this.isPause = false;
            this.pauseBtn.normalSprite = this.pauseBtnSpriteFrame;
            cc.director.resume();
            this.pausePanel.active = false;
        }else{
            this.isPause = true;
            this.pauseBtn.normalSprite = this.pauseSprite;
            cc.director.pause();
            this.pausePanel.active = true;
            this.pausePanel.setLocalZOrder(999);
        }
    }

    public addHp(add: number){
        this.hp += add;
        this.hpLabel.string = 'hp:' + this.hp;
        if(this.hp <= 0){
            this.gameOverPanel.active = true;
            this.gameOverPanel.setLocalZOrder(1000);
            this.isGameOver = true;
            cc.director.pause();
        }
    }

    public enemys: Array<cc.Node> = [];
    private wave:number = 0;

    private addEnemys(){
         this.schedule(function(){
            let enemy: cc.Node = cc.instantiate(this.enemy);
            enemy.getComponent("Enemy").maxHp = enemy.getComponent("Enemy").maxHp + this.wave;
            this.enemys.push(enemy);
            this.node.addChild(enemy);
         },2,10);
         this.wave++;
    }

    private curRange: cc.Node = null;
    private curIndex: number = 0;
    public startIndex: number = 54;        //开始索引
    private endIndex: number = 71;          //结束索引

    private getDis(startIndex: number, endIndex: number): number{    //计算当前点与终点的距离
        let startPoint: cc.Vec2 = Utils.getXYByIndex(startIndex);
        let endPoint: cc.Vec2 = Utils.getXYByIndex(endIndex);
        let dis: number = 0;
        if(startPoint.y == endPoint.y){
            dis = Math.abs(endPoint.x - startPoint.x) * 10;
        }else{
            let ydis = Math.abs(endPoint.y - startPoint.y);
            dis = ydis * 14 + (Math.abs(startPoint.x - endPoint.x) - ydis) * 10;
        }
        return dis;
    }

    private getAroundIndexs(index: number): Array<number>{    //获得周围可通行的点
        let point: cc.Vec2 = Utils.getXYByIndex(index);
        let aroundIndexs: Array<number> = [];
        let up: number = point.y - 1;
        if(up >= 0){
            let index: number = Utils.getIndexByXY(new cc.Vec2(point.x,up));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        let down: number = point.y + 1;
        if(down <= 8){
            let index: number = Utils.getIndexByXY(new cc.Vec2(point.x,down));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        let left: number = point.x - 1;
        if(left >= 0){
            let index: number = Utils.getIndexByXY(new cc.Vec2(left,point.y));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        let right: number = point.x + 1;
        if(right <= 18){
            let index: number = Utils.getIndexByXY(new cc.Vec2(right,point.y));
            if(this.map[index] && !this.mapHasTower[index]){ 
                aroundIndexs.push(index);
            }
        }
        if(left >= 0 && up >= 0){
            let index: number = Utils.getIndexByXY(new cc.Vec2(left,up));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        if(left >= 0 && down <= 8){
            let index: number = Utils.getIndexByXY(new cc.Vec2(left,down));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        if(right <= 18 && up >= 0){
            let index: number = Utils.getIndexByXY(new cc.Vec2(right,up));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        if(right <= 18 && down <= 8){
            let index: number = Utils.getIndexByXY(new cc.Vec2(right,down));
            if(this.map[index] && !this.mapHasTower[index]){
                aroundIndexs.push(index);
            }
        }
        return aroundIndexs;
    }

    public getPath(startIndex: number): Array<Path>{
        let path: Path = this.findPath(startIndex);
        if(path == null){
            // cc.log('找不到通路');
            return null;
        }
        let rel: boolean = true;
        let way: Array<Path> = [];
        while(rel){
            if(path != null){
                way.push(path);
                path = path.prePath;
            }else{
                rel = false;
            }
        }
        way.reverse();
        //cc.log('----------------------------------------------');
        for(let value of way){
            this.map[value.index].opacity = 100;
        }
        return way;
    }

    private clearOpacity(){
        this.map.forEach(value =>{
            value.opacity = 255;
        })
    }

    private pathNode: Array<Path> = [];

    private findPath(startIndex: number): Path{
        this.pathNode = [];
        let openList: Array<Path> = [];
        let closeList: Array<Path> = [];
        let startPath: Path = new Path(startIndex,0,this.getDis(startIndex,this.endIndex),null);
        this.pathNode[startIndex] = startPath;
        openList.push(startPath);
        let rel:boolean = true;
        this.clearOpacity();
        while(rel){
            if(openList.length == 0){
                // cc.log('找不到通路');
                return null;
            }
            let curPath: Path = openList.sort((a,b) =>{
                if(a.mul() < b.mul()){return -1;}
                else if(a.mul() > b.mul()){return 1;}
                else{return 0;}
            }).shift();
            // this.map[curPath.index].opacity = 100;
            closeList.push(curPath);
            // cc.log('------------------------------------------------');
            // cc.log('初始=' + curPath.index);
            let aroundPaths: Array<number> = this.getAroundIndexs(curPath.index); 
            for(let index of aroundPaths){
                if(this.pathNode[index] == null){
                    this.pathNode[index] = new Path(index,this.getDis(curPath.index,index),this.getDis(index,this.endIndex),curPath);
                    this.pathNode[index].disPre += curPath.disPre;
                }
                let path: Path = this.pathNode[index];
                if(index == this.endIndex){
                    // cc.log('找到通路');
                    rel = false;
                    // this.map[index].opacity = 100;
                    return this.pathNode[index];
                }
                if(closeList.indexOf(path) == -1){
                   if(openList.indexOf(path) == -1){
                        openList.push(path);
                        //cc.log('不在openList中=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                   }else{
                        let dis: number = curPath.disPre + this.getDis(path.index,curPath.index);
                        if(dis < path.disPre){
                            path.prePath = curPath;
                            path.disPre = dis;
                        //     cc.log('在openList中，更换父节点=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                        // }else{
                        //     cc.log('在openList中，不换父节点=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                        }
                   }
               }
            }
        }
    }

    private movePath: Array<Path> = [];

    private createRange(evt: cc.Event.EventCustom){
        if(this.isGameOver || this.isPause){
            return;
        }
        let index: number = evt.getUserData().index;
        if(cc.isValid(this.curRange)){
            // cc.log('取消路径');
            this.clearOpacity();
            this.mapHasTower[this.curIndex] = false;
            this.curRange.destroy();
            return null;
        }
        if(index == this.startIndex || index == this.endIndex){
            // cc.log('起点和终点不能建塔');
            return null;
        }
        if(this.mapHasTower[index]){
            // cc.log('当前位置已经建塔');
            return null;
        }
        this.mapHasTower[index] = true;
        this.movePath = this.getPath(this.startIndex);
        if(this.movePath == null){
            this.mapHasTower[index] = false;
            return;
        }
        // cc.log(this.curIndex + '=' + this.mapHasTower[this.curIndex]);
        // cc.log(index + '=' + this.mapHasTower[index]);
        let position: cc.Vec2 = evt.getUserData().node.position;
        this.curRange = cc.instantiate(this.range);
        this.curIndex = index;
        this.node.addChild(this.curRange);
        this.curRange.position = position;
        //cc.log('创建选塔界面');
    }

    private createTower(evt: cc.Event.EventCustom){
        if(this.score < this.needScore){
            cc.log('分数不够建塔');
            return;
        }
        this.addScore(-this.needScore);
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
        this.mapHasTower[this.curIndex] = true;

        this.enemys.forEach(value => {
            value.stopAllActions();
            value.getComponent("Enemy").move();
            //cc.log('怪物重新规划路线');
        })
    }
    // update (dt) {}
}
