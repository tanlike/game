import { Path } from "./Path";

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
    public map: Array<cc.Node> = [];
    public enemyPool: cc.NodePool;

    onLoad(){
        let startX = -427;
        let startY = 196;
        for(let i=0; i<8; i++){
            for(let j=0; j<18; j++){
                let ground = cc.instantiate(this.ground);
                let index: number = i * 18 + j
                this.map[index] = ground;
                ground.getComponent("Ground").index = index;
                ground.getComponent("Ground").init();
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
            //cc.log('刷怪');
            let enemy: cc.Node = this.enemyPool.get();
            this.node.addChild(enemy);
            enemy.getComponent("Enemy").init();
        },0.5,9);
    }

    private curRange: cc.Node = null;
    private curIndex: number = 0;
    private startIndex: number = 54;        //开始索引
    private endIndex: number = 71;          //结束索引

    public getXYByIndex(index: number): cc.Vec2{       //通过索引获取X,Y
        let x: number = index % 18;
        let y: number = Math.floor(index / 18);
        return new cc.Vec2(x,y);
    }  
    
    public getIndexByXY(point: cc.Vec2): number{
        return point.y * 18 + point.x;
    }

    public getDis(startIndex: number, endIndex: number): number{    //计算当前点与终点的距离
        let startPoint: cc.Vec2 = this.getXYByIndex(startIndex);
        let endPoint: cc.Vec2 = this.getXYByIndex(endIndex);
        let dis: number = 0;
        if(startPoint.y == endPoint.y){
            dis = Math.abs(endPoint.x - startPoint.x) * 10;
        }else{
            let ydis = Math.abs(endPoint.y - startPoint.y);
            dis = ydis * 14 + (Math.abs(startPoint.x - endPoint.x) - ydis) * 10;
        }
        return dis;
    }

    public getAroundIndexs(index: number): Array<number>{    //获得周围可通行的点
        let point: cc.Vec2 = this.getXYByIndex(index);
        let aroundIndexs: Array<number> = [];
        let up: number = point.y - 1;
        if(up >= 0){
            let index: number = this.getIndexByXY(new cc.Vec2(point.x,up));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        let down: number = point.y + 1;
        if(down <= 8){
            let index: number = this.getIndexByXY(new cc.Vec2(point.x,down));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        let left: number = point.x - 1;
        if(left >= 0){
            let index: number = this.getIndexByXY(new cc.Vec2(left,point.y));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        let right: number = point.x + 1;
        if(right <= 18){
            let index: number = this.getIndexByXY(new cc.Vec2(right,point.y));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        if(left >= 0 && up >= 0){
            let index: number = this.getIndexByXY(new cc.Vec2(left,up));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        if(left >= 0 && down <= 8){
            let index: number = this.getIndexByXY(new cc.Vec2(left,down));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        if(right <= 18 && up >= 0){
            let index: number = this.getIndexByXY(new cc.Vec2(right,up));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        if(right <= 18 && down <= 8){
            let index: number = this.getIndexByXY(new cc.Vec2(right,down));
            if(this.map[index] && this.tower[index] == null){
                aroundIndexs.push(index);
            }
        }
        return aroundIndexs;
    }

    public getPath(): Array<Path>{
        let rel: boolean = true;
        let path: Path = this.findPath();
        let way: Array<Path> = [];
        // way.push(path);
        // while(rel){
        //     let prePath: Path = path.prePath;
        //     if(prePath){
        //         way.push(prePath);
        //         prePath = prePath.prePath;
        //     }else{
        //         rel = false;
        //     }
        // }
        // way.reverse();
        // cc.log('----------------------------------------------');
        // for(let value of way){
        //     cc.log(value.index);
        // }
        return way;
    }

    private pathNode: Array<Path> = [];

    public findPath(): Path{
        this.pathNode = [];
        let openList: Array<Path> = [];
        let closeList: Array<Path> = [];
        let startPath: Path = new Path(this.startIndex,0,this.getDis(this.startIndex,this.endIndex),null);
        this.pathNode[this.startIndex] = startPath;
        openList.push(startPath);
        let rel:boolean = true;
        while(rel){
            let curPath: Path = openList.sort((a,b) =>{
                if(a.mul() < b.mul()){return -1;}
                else if(a.mul() > b.mul()){return 1;}
                else{return 0;}
            }).shift();
            this.map[curPath.index].opacity = 100;
            closeList.push(curPath);
            cc.log('------------------------------------------------');
            cc.log('初始=' + curPath.index);
            let aroundPaths: Array<number> = this.getAroundIndexs(curPath.index);
            for(let index of aroundPaths){
                if(this.pathNode[index] == null){
                    this.pathNode[index] = new Path(index,this.getDis(curPath.index,index),this.getDis(index,this.endIndex),curPath);
                    this.pathNode[index].disPre += curPath.disPre;
                }
                let path: Path = this.pathNode[index];
                if(index == this.endIndex){
                    cc.log('找到通路');
                    rel = false;
                    return this.pathNode[index];
                }
                if(closeList.indexOf(path) == -1){
                   if(openList.indexOf(path) == -1){
                        openList.push(path);
                        cc.log('不在openList中=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                   }else{
                        let dis: number = curPath.disPre + this.getDis(path.index,curPath.index);
                        if(dis < path.disPre){
                            path.prePath = curPath;
                            path.disPre = dis;
                            cc.log('在openList中，更换父节点=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                        }else{
                            cc.log('在openList中，不换父节点=' + path.index + ',距初始点距离' + path.disPre + ',距离目的地'+ path.disDes + ',父节点=' + curPath.index);
                        }
                   }
               }
            }
        }
    }

    private createRange(evt: cc.Event.EventCustom){
        let index: number = evt.getUserData().index;
        if(index == this.startIndex || index == this.endIndex){
            cc.log('起点和终点不能建塔');
            return null;
        }
        if(this.getPath().length == 0){
           // cc.log('找不到通路');
            return;
        }
        if(cc.isValid(this.curRange)){
            this.curRange.destroy();
            return;
        }
        let position: cc.Vec2 = evt.getUserData().node.position;
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
