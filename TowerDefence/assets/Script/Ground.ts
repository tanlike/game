
const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    public index: number = 0;

    public addListen(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.createRange,this);
    }

    public offListen(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.createRange,this);
    }
 
    private createRange(evt: cc.Event.EventCustom){
        evt.stopPropagation();
        let createEvent: cc.Event.EventCustom = new cc.Event.EventCustom('createrange',true)
        createEvent.setUserData({index: this.index,node: this.node});
        this.node.dispatchEvent(createEvent);
    }
}
