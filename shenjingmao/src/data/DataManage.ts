class DataManage{

    private static _isInit : boolean = false;       //只允许一次初始化
    public static stepNum : number = 0;                    //计录步数
    private catDefaultIndex : number = 40;           //神经猫的位置
    public _isS : boolean = false;                  //是否赢了
    public static catIsAction1mc : boolean = true;  //神经猫是否播放动作1
    private _catAI : CatAI;          
    public _isGameOver : boolean = false;          //游戏是否结束               

    public constructor(){
        if(!DataManage._isInit){
            throw ( new Error("error!"));
        }
        this._catAI = new CatAI();
        this.createData();
    }

    private static _dataManage : DataManage;        //单例模式，不允许外部创建对象
    
    public static instance() : DataManage{
        if(!DataManage._isInit){
            DataManage._isInit = true;
            this._dataManage = new DataManage();
        }
        return DataManage._dataManage;
    } 

    public static tileNum : number = 81;            //地图总tile
    private _tileDatas : Array<boolean> = [];       //tile是否可走
    //创建地图数据，初始可走
    private createData(){
        for(var i:number = 0; i < DataManage.tileNum;i++){
            this._tileDatas[i] = true;
        }
    }
    //游戏开始时，初始化游戏数据
    public init_tileDatas(){
        DataManage.catIsAction1mc = true;
        DataManage.stepNum = 0;
        this._isS = false;
        for(var i:number = 0;i < DataManage.tileNum;i++){
            this._tileDatas[i] = true;
        }
    }
    //初始化地图障碍
    public selectTile(){
        var num : number = 10 + Math.floor(Math.random() * 10);
        for(var i:number=0; i < num; i++){
            var index : number = Math.floor(Math.random() * DataManage.tileNum);
            this._tileDatas[index] = false;
        }
        this._tileDatas[this.catDefaultIndex] = true;
    }
    //将此位置设为不可走
    public closeTileByIndex(index : number){
        this._tileDatas[index] = false;
    }
    //获取位置的障碍信息
    public getStatusByIndex(index : number){
        return this._tileDatas[index];
    }

    private _catIndex : number = this.catDefaultIndex;
    //创建猫的位置
    public createCatPoint(){
        this._catIndex = this.catDefaultIndex;
    }
    //获取猫的位置
    public getCatIndex() : number{
        return this._catIndex;
    }
    //神经猫是否有位置可移动，如果可走，更新神经猫的位置
    public isHaveNextPointByCat() : boolean{
        if(this._catAI.isExit(this._catIndex)){
            this._isS = false;
            return false;
        }
        var nextPointIndex : number = this._catAI.findNextPoint(this._catIndex);
        if(nextPointIndex == null){
            DataManage.catIsAction1mc = false;
            this._catIndex = this._catAI.getNear(this._catIndex);
            if(this._catIndex){
                return true;
            }
            this._isS = true;
            return false;
        }
        if(nextPointIndex == -1){
            this._isS = true;
            return false;
        }
        this._catIndex = nextPointIndex;
        return true;
    }
}