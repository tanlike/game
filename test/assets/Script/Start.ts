const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Button)
    startBtn: cc.Button = null;

    private onClick(evt){
        cc.director.loadScene("game");
    }
}
