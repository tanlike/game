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
}