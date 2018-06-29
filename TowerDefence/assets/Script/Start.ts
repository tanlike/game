const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    onLoad(){
        cc.director.preloadScene("game",function(){
         
        })
    }

    private onClickStart(){
        cc.director.loadScene("game");
    }
}
