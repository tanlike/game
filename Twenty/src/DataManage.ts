class DataManage{
    private static _isInit: boolean = false;
    private static _instance: DataManage;

    public map: Array<boolean> = [];        //格子中是否有元素
    public elements: Array<element> = [];   //56个格子中存放的box
    public maxNum: number = 5;         //最大数字
    public isGameOver:boolean = false; //游戏是否结束 

    public constructor(){
        if(DataManage._isInit){
            throw(new Error('error!'));
        }
        this.init();
    }

    public static instance(): DataManage{
        if(!DataManage._isInit){
            this._instance = new DataManage();
            this._isInit = true;
        }
        return this._instance;
    }

    private init(){
        for(var i:number=0; i < 56; i++){
            this.map.push(false);
        }
        this.elements = [];
        this.maxNum = 5;
        this.isGameOver = false;
    }

    public minToMaxSort(){
        DataManage.instance().elements.sort((a,b) => {
            if(a.index < b.index){
                return -1;
            }else if(a.index > b.index){
                return 1;
            }else{
                return 0;
            }
        })
    }

    public maxToMinSort(){
        DataManage.instance().elements.sort((a,b) => {
            if(a.index < b.index){
                return 1;
            }else if(a.index > b.index){
                return -1;
            }else{
                return 0;
            }
        })
    }

    //从数组中删除
    public delete(box: element){
        var index: number = DataManage.instance().elements.indexOf(box);
        DataManage.instance().elements.splice(index,1);
        box = null;
    }

    //获取碰撞数组
    public getHitList(box: element): Array<element>{
        var arr: Array<element> = [];
        DataManage.instance().elements.forEach(value => {
           // console.log('box.index='+box.index+',value.index='+value.index+','+Util.hitTestP(box,value));
            if(Util.hitTestP(box,value)){
                arr.push(value);
            }
        })
        return arr;
    }
}