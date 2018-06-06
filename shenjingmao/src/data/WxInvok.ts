class WxInvoke{
    public keyList: Array<any> = ['SCORE'];      //key列表
    private static isExist: boolean = false;        //外部不允许创建对象
    private msgType:Array<string> = ['uploadscore','showfriendrankinglist','showgrouprankinglist'];
    private static openDataContext: any;

    public constructor(){
        if(!WxInvoke.isExist){
            throw ( new Error("error!"));
        }
    }

    private static _wxInvoke : WxInvoke;        //单例模式，不允许外部创建对象

    public static instance() : WxInvoke{
        if(!WxInvoke.isExist){
            WxInvoke.isExist = true;
            this._wxInvoke = new WxInvoke();
            this.openDataContext = wx.getOpenDataContext();
        }
        return WxInvoke._wxInvoke;
    } 
    //上传分数
    public uploadScore(value){
        console.log('上传分数');
        WxInvoke.openDataContext.postMessage({
            type: this.msgType[0],
            key: this.keyList[0],
            value: value
        })
    }
    //显示好友排行榜
    public showFriendRankingList(){
         WxInvoke.openDataContext.postMessage({
            type: this.msgType[1],
            key: this.keyList[0]
         })
    }
    //显示群排行榜
    public showGroupRankingList(){
         WxInvoke.openDataContext.postMessage({
            type: this.msgType[2],
            key: this.keyList[0]
         })
    }

    //分享转发按钮显示
    public shareGame(){
        wx.showShareMenu({
            withShareTicket: true,
            success: (res) => {
                console.log('显示转发按钮成功');
            },
            fail: (res) => {
                console.log('显示转发按钮失败');
            },
            complete: (res) => {}
        })
        wx.onShareAppMessage(this.onShareGame);
    }
    //分享好友
    public onShareGame(): void{
        wx.shareAppMessage({
            title: '转发标题',
            imageUrl: 'openDataContext/assets/rankingtitle.png',
            query: '',
            success: (res) => {
                console.log('分享成功',res);
            },
            fail: (err) => {
                console.log('分享失败',err);
            },
            complete: (res) => {}
        })
    }
}