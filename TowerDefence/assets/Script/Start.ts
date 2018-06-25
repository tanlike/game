const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    onLoad(){
        cc.director.preloadScene("game",function(error:Error){
            cc.error("加载失败" + error);
        })
    }

    private onClickStart(){
        cc.director.loadScene("game");
    }
}
