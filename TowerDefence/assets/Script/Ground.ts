import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    public index: number = 0;

    onLoad(){
        this.init();
    }

    private init(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.createRange,this);
    }
 
    private createRange(){
        //cc.log('点击地面');
        let createEvent: cc.Event.EventCustom = new cc.Event.EventCustom('createrange',true)
        createEvent.setUserData({index: this.index,node: this.node});
        this.node.dispatchEvent(createEvent);
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_DOWN,this.createRange,this);
    }
}
